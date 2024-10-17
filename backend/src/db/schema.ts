import {
  boolean,
  mysqlTable,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

import { v4 as uuid } from 'uuid';

export const user = mysqlTable('user', {
  id: varchar('id', { length: 36 })
    .$defaultFn(() => uuid())
    .primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  app_role_id: varchar('app_role_id', { length: 36 }),
  name: varchar('name', { length: 255 }).notNull(),
  phone_number: varchar('phone_number', { length: 13 }),
  create_date: timestamp('create_date').notNull(),
  create_user_id: varchar('create_user_id', { length: 36 }).notNull(),
  last_update_user_id: varchar('last_update_user_id', { length: 36 }).notNull(),
  last_update_date: timestamp('last_update_date').notNull(),
  is_active: boolean('is_active').default(true).notNull(),
});

export const project = mysqlTable('project', {
  id: varchar('id', { length: 36 })
    .$defaultFn(() => uuid())
    .primaryKey(),
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
