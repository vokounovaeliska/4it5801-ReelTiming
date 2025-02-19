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
import { timesheetPdfGeneratorService } from '@backend/pdf/timesheetReport/timesheetPdfGeneratorService';
import { z } from 'zod';
import { CarResolver } from '@backend/graphql/modules/car/carResolver';
import { ShootingDayResolver } from '@backend//graphql/modules/shootingDay/shootingDayResolver';
import { DailyReportResolver } from '@backend//graphql/modules/dailyReport/dailyReportResolver';
import { ShiftOverviewResolver } from '@backend//graphql/modules/shiftOverview/shiftOverviewResolver';
import { getCarRepository } from './graphql/modules/car/carRepository';
import { getDailyReportRepository } from './graphql/modules/dailyReport/dailyReportRepository';
import { getDepartmentRepository } from './graphql/modules/department/departamentRepository';
import { getRateRepository } from './graphql/modules/rate/rateRepository';
import { getShootingDayRepository } from './graphql/modules/shootingDay/shootingDayRepository';
import { getStatementRepository } from './graphql/modules/statement/statementRepository';
import { getShiftOveviewRepository } from './graphql/modules/shiftOverview/shiftOverviewRepository';

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
      CarResolver,
      ShootingDayResolver,
      DailyReportResolver,
      ShiftOverviewResolver,
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

    res.on('finish', () => {
      drizzle?.connection.end();
    });

    return {
      db: drizzle.db,
      authUser,
      userRepository: getUserRepository(drizzle.db),
      projectRepository: getProjectRepository(drizzle.db),
      projectUserRepository: getProjectUserRepository(drizzle.db),
      carRepository: getCarRepository(drizzle.db),
      dailyReportRepository: getDailyReportRepository(drizzle.db),
      departmentRepository: getDepartmentRepository(drizzle.db),
      rateRepository: getRateRepository(drizzle.db),
      shiftOverviewRepository: getShiftOveviewRepository(drizzle.db),
      shootingDayRepository: getShootingDayRepository(drizzle.db),
      statementRepository: getStatementRepository(drizzle.db),
    };
  };

  app.use(express.json());

  const pdfRequestSchema = z.object({
    projectUserId: z.string().uuid(), // Ensure it's a valid UUID
    startDate: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
      message: 'Invalid startDate. Must be a valid date string.',
    }),
    endDate: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
      message: 'Invalid endDate. Must be a valid date string.',
    }),
  });

  app.use('/generate-timesheet-pdf', cors<cors.CorsRequest>());

  app.get('/generate-timesheet-pdf', async (req, res) => {
    const { projectUserId, startDate, endDate } = pdfRequestSchema.parse(
      req.query,
    );

    if (!projectUserId || !startDate || !endDate) {
      res.status(400).send('Missing parameters');
    }
    let drizzle;
    try {
      drizzle = await getConnection();

      const pdfGeneratorService = new timesheetPdfGeneratorService(drizzle.db);
      const pdfStream = await pdfGeneratorService.generatePdfReport(
        projectUserId,
        new Date(startDate),
        new Date(endDate),
      );

      const filename = `report_${new Date().toISOString()}.pdf`;

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${filename}"`,
      );

      pdfStream.pipe(res);
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send('Error generating PDF');
    } finally {
      if (drizzle && drizzle.connection) {
        drizzle.connection.end();
      }
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
