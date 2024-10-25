import { MySql2Database } from 'drizzle-orm/mysql2';

import { getProjectRepository } from '@backend/graphql/modules/project/projectRepository';
import { type getProjectUserRepository } from '@backend/graphql/modules/projectUser/projectUserRepository';
import { type getUserRepository } from '@backend/graphql/modules/user/userRepository';

import * as schema from '../db/schema';

export type Db = MySql2Database<typeof schema>;

export type CustomContext = {
  db: Db;
  authUser: JWTPayload | null;

  userRepository: ReturnType<typeof getUserRepository>;
  projectRepository: ReturnType<typeof getProjectRepository>;
  projectUserRepository: ReturnType<typeof getProjectUserRepository>;
};

export type JWTPayload = {
  id: number;
  iat: number;
};
