import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '../config';

import * as schema from './schema';

export const getConnection = async (): Promise<{
  db: MySql2Database<typeof schema>;
  connection: mysql.Connection;
}> => {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    multipleStatements: true,
  });
  const db = drizzle(connection, { schema, mode: 'default' });

  return { db, connection };
};
