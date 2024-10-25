import { getConnection } from '../src/db/db';

import seedDepartment from './seedDepartment';
import seedProjects from './seedProjects';
import seedUsers from './seedUsers';

async function seed() {
  console.log('Starting seed function');
  const connection = await getConnection();
  const db = connection.db;
  console.log('Database connection established');

  try {
    await seedUsers(db);
    await seedProjects(db);
    await seedDepartment(db);
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    console.log('Seed function completed');
    await connection.connection.end();
  }
}

seed().catch((err) => {
  console.error('Error in seed function:', err);
  process.exit(1);
});
