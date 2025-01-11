import { getConnection } from '../../src/db/db';
import { seedDatabase } from './seedDatabase';
import { seedProjectUsers } from './seedProjectUsers';
import { seedShootingDays } from './seedShootingDays';
import { seedStatements } from './seedStatements';
import { seedShiftOverview } from './seedShiftOverview';
import { seedDailyReports } from './seedDailyReport';
import { getShootingdaysForProject } from './getShootingDays';
import { seedCars } from './seedCar';

async function main() {
  console.log('Starting seed function...');
  const connection = await getConnection();
  const db = connection.db;

  //Set PROJECT ID and if you want to set project info
  const projectId = 'PROJECT ID';
  const generateDaysReportsOverview = true;
  const howManyProjectUsers = 3;

  try {
    // Start the transaction
    await db.transaction(async (trx) => {
      console.log('Transaction started');

      // Seed basic entities first
      const { users, rateIds, departments } = await seedDatabase(
        trx,
        projectId,
        howManyProjectUsers,
      );

      // Seed project users first, as statements depend on project_user
      const projectUsers = await seedProjectUsers(
        trx,
        projectId,
        users,
        rateIds,
        departments,
        howManyProjectUsers,
      );

      console.log('Seeding cars...');
      const cars = await seedCars(
        db,
        Math.round(howManyProjectUsers * 0.25),
        projectUsers,
      );
      console.log(`Seeded ${cars.length} cars.`);

      const projectUsersList = projectUsers.map((user) => {
        const assignedCar = cars.find((car) => car.project_user_id === user.id);
        return {
          id: user.id,
          car_id: assignedCar ? assignedCar.id : null,
        };
      });
      console.log('projectUsersList', projectUsersList);

      if (!generateDaysReportsOverview) {
        const shootingDays = await getShootingdaysForProject(db, projectId);
        await seedStatements(trx, projectUsersList, shootingDays);
      }

      if (generateDaysReportsOverview) {
        const shootingDays = await seedShootingDays(
          trx,
          projectId,
          30,
          new Date(),
        );
        await seedStatements(trx, projectUsersList, shootingDays);
        await seedShiftOverview(trx, projectId, shootingDays, projectUsersList);
        await seedDailyReports(trx, projectId, shootingDays);
      }

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
