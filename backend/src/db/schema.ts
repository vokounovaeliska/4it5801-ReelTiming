import {
  boolean,
  date,
  datetime,
  double,
  int,
  json,
  mysqlTable,
  timestamp,
  uniqueIndex,
  varchar,
  text,
} from 'drizzle-orm/mysql-core';
import { v4 as uuidv4 } from 'uuid';

export const user = mysqlTable('user', {
  id: varchar('id', { length: 36 })
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  surname: varchar('surname', { length: 255 }).notNull(),
  phone_number: varchar('phone_number', { length: 13 }),
  create_date: timestamp('create_date').notNull().defaultNow(),
  create_user_id: varchar('create_user_id', { length: 36 }).notNull(),
  last_update_user_id: varchar('last_update_user_id', { length: 36 }).notNull(),
  last_update_date: timestamp('last_update_date')
    .notNull()
    .defaultNow()
    .onUpdateNow(),
  is_active: boolean('is_active').default(true).notNull(),
  password_reset_token: varchar('password_reset_token', { length: 255 }),
  password_reset_expiration_time: timestamp('password_reset_expiration_time'),
  can_create_project: boolean('can_create_project').default(false),
});

export const project = mysqlTable('project', {
  id: varchar('id', { length: 36 })
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  production_company: varchar('production_company', { length: 255 }).notNull(),
  start_date: timestamp('start_date'),
  end_date: timestamp('end_date'),
  create_date: timestamp('create_date').notNull().defaultNow(),
  create_user_id: varchar('create_user_id', { length: 36 }).notNull(),
  last_update_user_id: varchar('last_update_user_id', { length: 36 }).notNull(),
  last_update_date: timestamp('last_update_date')
    .notNull()
    .defaultNow()
    .onUpdateNow(),
  is_active: boolean('is_active').default(true),
  description: varchar('description', { length: 500 }),
  currency: varchar('currency', { length: 3 }).default('CZK').notNull(),
  logo: text('logo'),
});

export const project_user = mysqlTable(
  'project_user',
  {
    id: varchar('id', { length: 36 })
      .$defaultFn(() => uuidv4())
      .primaryKey(),
    project_id: varchar('project_id', { length: 36 })
      .notNull()
      .references(() => project.id, {
        onDelete: 'cascade',
      }),
    user_id: varchar('user_id', { length: 36 }).references(() => user.id, {
      onDelete: 'cascade',
    }),
    department_id: varchar('department_id', { length: 36 }).references(
      () => department.id,
      {
        onDelete: 'cascade',
      },
    ),
    rate_id: varchar('rate_id', { length: 36 }).references(() => rate.id, {
      onDelete: 'cascade',
    }),
    position: varchar('position', { length: 255 }),
    number_of_people: int('number_of_people'),
    is_team_leader: boolean('is_team_leader').notNull().default(false),
    name: varchar('name', { length: 255 }).notNull(),
    surname: varchar('surname', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    create_date: timestamp('create_date').notNull().defaultNow(),
    create_user_id: varchar('create_user_id', { length: 36 }).notNull(),
    last_update_user_id: varchar('last_update_user_id', {
      length: 36,
    }).notNull(),
    last_update_date: timestamp('last_update_date')
      .notNull()
      .defaultNow()
      .onUpdateNow(),
    is_active: boolean('is_active').notNull().default(false),
    role: varchar('role', { length: 10 }).default('CREW'),
    invitation: varchar('invitation', { length: 255 }),
    phone_number: varchar('phone_number', { length: 13 }),
  },
  (table) => ({
    projectUserUnique: uniqueIndex('project_user_unique').on(
      table.project_id,
      table.user_id,
    ),
  }),
);

export const department = mysqlTable('department', {
  id: varchar('id', { length: 36 })
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  project_id: varchar('project_id', { length: 36 }).references(
    () => project.id,
    {
      onDelete: 'cascade',
    },
  ),
  order_index: int('order_index'),
  is_visible: boolean('is_visible').default(true),
});

export const rate = mysqlTable('rate', {
  id: varchar('id', { length: 36 })
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  standard_rate: int('standard_rate').default(0),
  overtime_hour1: int('overtime_hour1').default(0),
  overtime_hour2: int('overtime_hour2').default(0),
  overtime_hour3: int('overtime_hour3').default(0),
  overtime_hour4: int('overtime_hour4').default(0),
  compensation_rate: int('compensation_rate').default(0),
  create_date: timestamp('create_date').notNull().defaultNow(),
  create_user_id: varchar('create_user_id', { length: 36 }).notNull(),
  last_update_user_id: varchar('last_update_user_id', { length: 36 }).notNull(),
  last_update_date: timestamp('last_update_date')
    .notNull()
    .defaultNow()
    .onUpdateNow(),
});

export const statement = mysqlTable('statement', {
  id: varchar('id', { length: 36 })
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  project_user_id: varchar('project_user_id', { length: 36 })
    .notNull()
    .references(() => project_user.id, {
      onDelete: 'cascade',
    }),
  start_date: date('start_date').notNull(),
  from: datetime('from').notNull(),
  to: datetime('to').notNull(),
  shift_lenght: int('shift_lenght').notNull(),
  calculated_overtime: int('calculated_overtime'),
  claimed_overtime: int('claimed_overtime'),
  create_date: timestamp('create_date').notNull().defaultNow(),
  create_user_id: varchar('create_user_id', { length: 36 }).notNull(),
  last_update_user_id: varchar('last_update_user_id', { length: 36 }).notNull(),
  last_update_date: timestamp('last_update_date')
    .notNull()
    .defaultNow()
    .onUpdateNow(),
  car_id: varchar('car_id', { length: 36 }).references(() => car.id, {
    onDelete: 'set null',
  }),
  kilometers: int('kilometers'),
});

export const car = mysqlTable('car', {
  id: varchar('id', { length: 36 })
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  kilometer_allow: int('kilometer_allow').default(0).notNull(),
  kilometer_rate: double('kilometer_rate', {
    precision: 10,
    scale: 2,
  }).notNull(),
  project_user_id: varchar('project_user_id', { length: 36 }).references(
    () => project_user.id,
    {
      onDelete: 'cascade',
    },
  ),
  create_date: timestamp('create_date').notNull().defaultNow(),
  create_user_id: varchar('create_user_id', { length: 36 }).notNull(),
  last_update_user_id: varchar('last_update_user_id', { length: 36 }).notNull(),
  last_update_date: timestamp('last_update_date')
    .notNull()
    .defaultNow()
    .onUpdateNow(),
});

export const shooting_day = mysqlTable(
  'shooting_day',
  {
    id: varchar('id', { length: 36 })
      .$defaultFn(() => uuidv4())
      .primaryKey(),
    shooting_day_number: int('shooting_day_number').notNull(),
    date: date('date').notNull(),
    project_id: varchar('project_id', { length: 36 }).references(
      () => project.id,
      {
        onDelete: 'cascade',
      },
    ),
    event_type: varchar('event_type', { length: 50 }),
  },
  (table) => ({
    shootingDayNumberProjectUnique: uniqueIndex(
      'shooting_day_number_project_unique',
    ).on(table.shooting_day_number, table.project_id),
    shootingDateProjectUnique: uniqueIndex('shooting_date_project_unique').on(
      table.date,
      table.project_id,
    ),
  }),
);

export const daily_report = mysqlTable(
  'daily_report',
  {
    id: varchar('id', { length: 36 })
      .$defaultFn(() => uuidv4())
      .primaryKey(),
    project_id: varchar('project_id', { length: 36 }).references(
      () => project.id,
      {
        onDelete: 'cascade',
      },
    ),
    shooting_day_id: varchar('shooting_day_id', { length: 36 }).references(
      () => shooting_day.id,
      {
        onDelete: 'restrict',
      },
    ),
    intro: json('intro'),
    shooting_progress: json('shooting_progress'),
    footer: json('footer'),
    create_date: timestamp('create_date').notNull().defaultNow(),
    last_update_date: timestamp('last_update_date')
      .notNull()
      .defaultNow()
      .onUpdateNow(),
  },
  (table) => ({
    shootingDayProjectUnique: uniqueIndex('shooting_day_project_unique').on(
      table.shooting_day_id,
      table.project_id,
    ),
    shootingDayUnique: uniqueIndex('shooting_day_unique').on(
      table.shooting_day_id,
    ),
  }),
);

export const shift_overview = mysqlTable('shift_overview', {
  id: varchar('id', { length: 36 })
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  project_id: varchar('project_id', { length: 36 }).references(
    () => project.id,
    {
      onDelete: 'cascade',
    },
  ),
  date: date('date'),
  crew_working: json('crew_working'),
});
