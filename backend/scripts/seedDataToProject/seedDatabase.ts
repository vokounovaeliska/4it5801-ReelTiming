import { MySql2Database } from 'drizzle-orm/mysql2';
import { getDepartmentsForProject } from './getDepartmentsForProject';
import { seedRates } from './seedRates';
import { seedUsers } from './seedUser';

export async function seedDatabase(
  db: MySql2Database<typeof import('../../src/db/schema')>,
  projectId: string,
  howManyProjectUsers: number,
) {
  console.log('Starting seedDatabase function...');

  try {
    // 1. Seed Users
    console.log('Seeding users...');
    const users = await seedUsers(db, howManyProjectUsers);
    console.log(`Seeded ${users.length} users.`);

    // 2. Seed Rates
    console.log('Seeding rates...');
    const rateIds = await seedRates(db, howManyProjectUsers);
    console.log(`Seeded ${rateIds.length} rates.`);

    // 3. Fetch Departments for the Project
    console.log('Fetching departments for project...');
    const departments = await getDepartmentsForProject(db, projectId);
    console.log(
      `Fetched ${departments.length} departments for project ${projectId}.`,
    );

    console.log('seedDatabase function completed successfully.');
    return { users, rateIds, departments };
  } catch (error) {
    console.error('Error in seedDatabase:', error);
    throw error;
  }
}
