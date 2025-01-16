import { MySql2Database } from 'drizzle-orm/mysql2';

import { getProjectRepository } from '@backend/graphql/modules/project/projectRepository';
import { type getProjectUserRepository } from '@backend/graphql/modules/projectUser/projectUserRepository';
import { type getUserRepository } from '@backend/graphql/modules/user/userRepository';

import * as schema from '../db/schema';
import { getCarRepository } from '@backend/graphql/modules/car/carRepository';
import { getDailyReportRepository } from '@backend/graphql/modules/dailyReport/dailyReportRepository';
import { getDepartmentRepository } from '@backend/graphql/modules/department/departamentRepository';
import { getRateRepository } from '@backend/graphql/modules/rate/rateRepository';
import { getShootingDayRepository } from '@backend/graphql/modules/shootingDay/shootingDayRepository';
import { getStatementRepository } from '@backend/graphql/modules/statement/statementRepository';
import { getShiftOveviewRepository } from '@backend/graphql/modules/shiftOverview/shiftOverviewRepository';

export type Db = MySql2Database<typeof schema>;

export type CustomContext = {
  db: Db;
  authUser: JWTPayload | null;

  userRepository: ReturnType<typeof getUserRepository>;
  projectRepository: ReturnType<typeof getProjectRepository>;
  projectUserRepository: ReturnType<typeof getProjectUserRepository>;
  carRepository: ReturnType<typeof getCarRepository>;
  dailyReportRepository: ReturnType<typeof getDailyReportRepository>;
  departmentRepository: ReturnType<typeof getDepartmentRepository>;
  rateRepository: ReturnType<typeof getRateRepository>;
  shiftOverviewRepository: ReturnType<typeof getShiftOveviewRepository>;
  shootingDayRepository: ReturnType<typeof getShootingDayRepository>;
  statementRepository: ReturnType<typeof getStatementRepository>;
};

export type JWTPayload = {
  id: number;
  iat: number;
};
