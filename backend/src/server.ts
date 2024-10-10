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
import { MySql2Database } from 'drizzle-orm/mysql2';
import express from 'express';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import * as http from 'http';
import { buildSchema } from 'type-graphql';

import { MOCKS, PORT } from '@backend/config';
import { getConnection } from '@backend/db/db';
import { EmptyResolver } from '@backend/graphql/modules/empty/emptyResolver';
// import { ProjectResolver } from '@backend/graphql/modules/project/projectResolver';
import { UserResolver } from '@backend/graphql/modules/user/userResolver';
import { parseAndVerifyJWT } from '@backend/libs/jwt';
import { mockResolvers } from '@backend/mocks/mocks';
import { CustomContext } from '@backend/types/types';

const init = async () => {
  const app = express();

  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [EmptyResolver, UserResolver],
    // resolvers: [EmptyResolver, UserResolver, ProjectResolver],
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
    const drizzle = MOCKS ? null : await getConnection();
    const authToken = req.headers.authorization ?? '';
    const authUser = parseAndVerifyJWT(authToken);

    res.on('close', () => {
      drizzle?.connection.end();
    });

    return {
      db: drizzle?.db as unknown as MySql2Database,
      authUser,
    };
  };

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
