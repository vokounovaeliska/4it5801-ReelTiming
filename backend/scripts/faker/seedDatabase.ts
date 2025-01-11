import { MySql2Database } from 'drizzle-orm/mysql2';
import { getDepartmentsForProject } from '../getDepartmentsForProject';
import { seedCars } from './seedCar';
import { seedRates } from './seedRates';
import { seedUsers } from './seedUser';

export async function seedDatabase(
  db: MySql2Database<typeof import('../../src/db/schema')>,
  projectId: string,
) {
  console.log('Starting seedDatabase function...');

  try {
    // 1. Seed Users
    console.log('Seeding users...');
    const userIds = await seedUsers(db, 100);
    console.log(`Seeded ${userIds.length} users.`);

    // 2. Seed Rates
    console.log('Seeding rates...');
    const rateIds = await seedRates(db, 100);
    console.log(`Seeded ${rateIds.length} rates.`);

    // 3. Fetch Departments for the Project
    console.log('Fetching departments for project...');
    const departments = await getDepartmentsForProject(db, projectId);
    console.log(
      `Fetched ${departments.length} departments for project ${projectId}.`,
    );

    // 4. Seed Cars
    console.log('Seeding cars...');
    const carIds = await seedCars(db, 25);
    console.log(`Seeded ${carIds.length} cars.`);

    console.log('seedDatabase function completed successfully.');
    return { userIds, rateIds, departments, carIds };
  } catch (error) {
    console.error('Error in seedDatabase:', error);
    throw error;
  }
}
