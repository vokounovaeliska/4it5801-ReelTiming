import {
  boolean,
  int,
  mysqlTable,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { v4 as uuidv4 } from 'uuid';

export const user = mysqlTable('user', {
  id: varchar('id', { length: 36 })
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  app_role_id: varchar('app_role_id', { length: 36 }),
  name: varchar('name', { length: 255 }).notNull(),
  surname: varchar('surname', { length: 255 }).notNull(),
  phone_number: varchar('phone_number', { length: 13 }),
  create_date: timestamp('create_date').notNull(),
  create_user_id: varchar('create_user_id', { length: 36 }).notNull(),
  last_update_user_id: varchar('last_update_user_id', { length: 36 }).notNull(),
  last_update_date: timestamp('last_update_date').notNull(),
  is_active: boolean('is_active').default(true).notNull(),
  password_reset_token: varchar('password_reset_token', { length: 255 }),
  password_reset_expiration_time: timestamp('password_reset_expiration_time'),
});

export const project = mysqlTable('project', {
  id: varchar('id', { length: 36 })
    .$defaultFn(() => uuidv4())
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
  description: varchar('description', { length: 255 }),
});

export const project_user = mysqlTable('project_user', {
  id: varchar('id', { length: 36 })
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  project_id: varchar('project_id', { length: 36 })
    .notNull()
    .references(() => project.id, {
      onDelete: 'cascade',
    }),
  user_id: varchar('user_id', { length: 36 })
    .notNull()
    .references(() => user.id, {
      onDelete: 'cascade',
    }),
  group_id: varchar('group_id', { length: 36 }),
  position: varchar('position', { length: 255 }),
  rate_id: varchar('rate_id', { length: 36 }),
  number_of_people: int('number_of_people'),
  car_numberplate: varchar('car_numberplate', { length: 255 }),
  is_team_leader: boolean('is_team_leader').notNull().default(false),
  create_date: timestamp('create_date').notNull(),
  create_user_id: varchar('create_user_id', { length: 36 }).notNull(),
  last_update_user_id: varchar('last_update_user_id', { length: 36 }).notNull(),
  last_update_date: timestamp('last_update_date').notNull(),
  is_active: boolean('is_active').notNull().default(true),
});
