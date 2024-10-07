import 'dotenv/config';

import { migrate } from 'drizzle-orm/mysql2/migrator';

import { getConnection } from '../src/db/db';

async function runMigrations() {
  const connection = await getConnection();
  try {
    // This will run migrations on the database, skipping the ones already applied
    await migrate(connection.db, { migrationsFolder: './drizzle' });
  } finally {
    // Don't forget to close the connection, otherwise the script will hang
    await connection.connection.end();
  }
}

runMigrations().catch(console.error);
