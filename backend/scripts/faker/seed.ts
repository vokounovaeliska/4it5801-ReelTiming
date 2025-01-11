import { getConnection } from '../../src/db/db';
import { seedDatabase } from './seedDatabase';
import { seedProjectUsers } from './seedProjectUsers';
import { seedShootingDays } from './seedShootingDays';
import { seedStatements } from './seedStatements';
import { seedShiftOverview } from './seedShiftOverview';
import { seedDailyReports } from './seedDailyReport';

async function main() {
  console.log('Starting seed function...');
  const connection = await getConnection();
  const db = connection.db;

  const projectId = 'bcb1fb35-3a4f-465f-a4b7-d4b95c64a187';

  try {
    // Start the transaction
    await db.transaction(async (trx) => {
      console.log('Transaction started');

      // Seed basic entities first
      const { userIds, rateIds, departments, carIds } = await seedDatabase(
        trx,
        projectId,
      );

      // Seed project users first, as statements depend on project_user
      const projectUsers = await seedProjectUsers(
        trx,
        projectId,
        userIds,
        rateIds,
        departments,
        carIds,
        100, // Adjust as needed
      );
      // Seed shooting days for the project (which are referenced by statements)
      const shootingDays = await seedShootingDays(
        trx, // the database connection (trx)
        projectId, // the project ID
        30, // the number of shooting days you want to generate
        new Date(), // the starting date (today's date)
      );

      const projectUsersList = projectUsers.map((user) => ({
        id: user.id,
        car_id: user.car_id,
      }));

      // Seed statements for project users
      await seedStatements(trx, projectUsersList, shootingDays);

      // Seed other data like shift overview and daily reports
      await seedShiftOverview(trx, projectId, shootingDays, projectUsersList);
      await seedDailyReports(trx, projectId, shootingDays);

      console.log('Transaction completed successfully');
    });
  } catch (error) {
    console.error('Error during seeding:', error);
    console.log('Rolling back transaction');
  } finally {
    console.log('Closing database connection');
    await connection.connection.end();
  }
}

main().catch((err) => {
  console.error('Error in seed script:', err);
  process.exit(1);
});
