import {
  boolean,
  int,
  mysqlTable,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
  id: int('id').primaryKey().autoincrement(),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const project = mysqlTable('project', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  production_company: varchar('production_company', { length: 255 }).notNull(),
  start_date: timestamp('start_date'),
  end_date: timestamp('end_date'),
  create_date: timestamp('create_date').notNull(),
  create_user_id: varchar('create_user_id', { length: 36 }).notNull(),
  last_update_user_id: varchar('last_update_user_id', { length: 36 }).notNull(),
  last_update_date: timestamp('last_update_date').notNull(),
  is_active: boolean('is_active').default(true),
});
