import 'ts-node/register/transpile-only';
import 'tsconfig-paths/register';
import 'reflect-metadata';

import { ApolloServer } from '@apollo/server';
import {
  ExpressContextFunctionArgument,
  expressMiddleware,
} from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { addMocksToSchema } from '@graphql-tools/mock';
import cors from 'cors';
import express from 'express';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import * as http from 'http';
import { buildSchema } from 'type-graphql';

import { MOCKS, PORT } from '@backend/config';
import { getConnection } from '@backend/db/db';
import { EmptyResolver } from '@backend/graphql/modules/empty/emptyResolver';
import { getProjectRepository } from '@backend/graphql/modules/project/projectRepository';
import { ProjectResolver } from '@backend/graphql/modules/project/projectResolver';
import { ProjectUserResolver } from '@backend/graphql/modules/projectUser/projectUserResolver';
import { getUserRepository } from '@backend/graphql/modules/user/userRepository';
import { UserResolver } from '@backend/graphql/modules/user/userResolver';
import { parseAndVerifyJWT } from '@backend/libs/jwt';
import { sendMail } from '@backend/mailer/mailer';
import { mockResolvers } from '@backend/mocks/mocks';
import { CustomContext } from '@backend/types/types';

import { DepartmentResolver } from '@backend/graphql/modules/department/departamentResolver';
import { getProjectUserRepository } from '@backend/graphql/modules/projectUser/projectUserRepository';
import { RateResolver } from '@backend/graphql/modules/rate/rateResolver';
import { PasswordResolver } from '@backend/graphql/modules/user/PasswordResolver';
import { StatementResolver } from '@backend/graphql/modules/statement/statementResolver';
import { ReportResolver } from '@backend/graphql/modules/report/reportResolver';
import { PdfGeneratorService } from './pdf/pdfGeneratorService';
import fs from 'fs';
import path from 'path';

const init = async () => {
  const app = express();

  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [
      EmptyResolver,
      UserResolver,
      ProjectResolver,
      ProjectUserResolver,
      PasswordResolver,
      RateResolver,
      DepartmentResolver,
      StatementResolver,
      ReportResolver,
    ],
    emitSchemaFile: true,
  });

  const server = new ApolloServer({
    schema: MOCKS
      ? addMocksToSchema({
          schema,
          resolvers: mockResolvers,
        })
      : schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  const customContext = async ({
    req,
    res,
  }: ExpressContextFunctionArgument): Promise<CustomContext> => {
    const drizzle = await getConnection();
    const authToken = req.headers.authorization ?? '';
    const authUser = parseAndVerifyJWT(authToken);

    res.on('close', () => {
      drizzle?.connection.end();
    });

    return {
      db: drizzle.db,
      authUser,
      userRepository: getUserRepository(drizzle.db),
      projectRepository: getProjectRepository(drizzle.db),
      projectUserRepository: getProjectUserRepository(drizzle.db),
    };
  };

  app.use(express.json());

  app.use('/generate-pdf', cors<cors.CorsRequest>());

  app.get('/generate-pdf', async (req, res) => {
    const { projectUserId, startDate, endDate, userId } = req.query;

    if (!projectUserId || !startDate || !endDate || !userId) {
      res.status(400).send('Missing parameters');
    }

    const filename = `report_${new Date().toISOString()}.pdf`;
    res.contentType('application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    try {
      const drizzle = await getConnection();
      const pdfGeneratorService = new PdfGeneratorService(drizzle.db);

      const filePathtemp = await pdfGeneratorService.generatePdfReport(
        projectUserId as string,
        new Date(startDate as string),
        new Date(endDate as string),
        userId as string,
      );

      const filePath = path.resolve(filePathtemp);

      // Wait until the file is generated, check every 500ms for a maximum of 5 seconds (adjust as needed)
      let retries = 0;
      const maxRetries = 10; // max retries (5 seconds)
      while (retries < maxRetries) {
        if (fs.existsSync(filePath)) {
          console.log(`PDF found at: ${filePath}`);
          break;
        }
        retries++;
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      if (!fs.existsSync(filePath)) {
        console.log(filePath);
        console.error('Error finding the file:', filePath);
        res.status(404).send('PDF file not found');
      }

      new Promise((resolve, reject) => {
        // Stream the PDF file as a download
        res.download(filePath, filename, (err) => {
          if (err) {
            console.error('Error sending the file:', err);
            res.status(500).send('Error streaming PDF');
            reject(err);
          } else {
            console.log(`PDF successfully sent: ${filePath}`);
            resolve(res);
          }
        });
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send('Error generating PDF: ' + error);
    }
  });

  app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    try {
      const info = await sendMail(to, subject, text);
      res.status(200).json({ message: 'Email sent successfully', info });
    } catch (error) {
      res.status(500).json({ message: 'Error sending email', error });
    }
  });

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(), // accepts all origins ('*'), not support cookies
    express.json(),
    graphqlUploadExpress(),
    expressMiddleware(server, {
      context: customContext,
    }),
  );

  app.get('/', (_req, res) => {
    res.redirect('/graphql');
  });

  const timeout = 20000;
  httpServer.setTimeout(timeout);

  httpServer.listen({ port: PORT }, () => {
    console.log('Timeout set to: ' + timeout + 'ms');
    console.log('Server listening on port: ' + PORT);
  });
};

init();
