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

import { DepartmentResolver } from './graphql/modules/department/departamentResolver';
import { getProjectUserRepository } from './graphql/modules/projectUser/projectUserRepository';
import { RateResolver } from './graphql/modules/rate/rateResolver';
import { PasswordResolver } from './graphql/modules/user/PasswordResolver';

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

  httpServer.listen({ port: PORT }, () => {
    console.log('Server listening on port: ' + PORT);
  });
};

init();
