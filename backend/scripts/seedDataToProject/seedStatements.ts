import { statement } from '../../src/db/schema';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { v4 as uuidv4 } from 'uuid';
import { InferModel } from 'drizzle-orm';

type StatementInsert = InferModel<typeof statement, 'insert'>;

export async function seedStatements(
  trx: MySql2Database<typeof import('../../src/db/schema')>,
  projectUserIds: { id: string; car_id: string | null }[],
  shootingDays: { id: string; date: Date }[],
) {
  console.log('Seeding statements for project users...');
  const statements: StatementInsert[] = [];

  // Iterate over each project user
  projectUserIds.forEach(({ id: projectUserId, car_id: carId }) => {
    const hasAllStatements = Math.random() < 0.6; // 60% chance to have all shooting days

    // Determine the shooting days to use
    const daysToFill = hasAllStatements
      ? shootingDays // Use all shooting days
      : shootingDays.slice(0, 10).sort(() => Math.random() - 0.5); // Use a random subset of the first 10 days

    // For each shooting day, generate a statement
    daysToFill.forEach((day) => {
      const statementData = generateStatement(projectUserId, carId, day.date);
      statements.push(statementData);
    });

    // Add a few random days outside the shooting days range (up to 3 random days)
    const randomDays = Array.from(
      { length: Math.floor(Math.random() * 3 + 1) },
      () => {
        const randomDate = new Date();
        randomDate.setDate(
          randomDate.getDate() - Math.floor(Math.random() * 30),
        ); // Random date in the past
        return generateStatement(projectUserId, carId, randomDate);
      },
    );

    statements.push(...randomDays);
  });

  // Batch insert: Insert in larger batches
  const batchSize = 1000; // Batch size (number of records per batch)
  for (let i = 0; i < statements.length; i += batchSize) {
    const batch = statements.slice(i, i + batchSize);
    await trx.insert(statement).values(batch);
  }

  console.log(`${statements.length} statements inserted for project users.`);
}

// Function to generate a single statement
function generateStatement(
  projectUserId: string,
  carId: string | null,
  date: Date,
): StatementInsert {
  // Fixed shift length (10 or 12 hours)
  const shiftLength = Math.random() < 0.5 ? 12 : 10;

  // Random start time (hours and minutes)
  const startHour = Math.floor(Math.random() * 24);
  const startMinute = Math.floor(Math.random() * 60);

  // Randomly calculate shift length
  const actualShiftLength =
    Math.random() < 0.8 ? shiftLength : shiftLength + Math.random() * 4;

  // Start time
  const startTime = new Date(date);
  startTime.setHours(startHour, startMinute, 0, 0);

  // End time, with the shift length added
  const endTime = new Date(startTime);
  endTime.setHours(startTime.getHours() + Math.floor(actualShiftLength));
  endTime.setMinutes(startTime.getMinutes() + Math.floor(Math.random() * 60)); // Randomize minutes

  // Calculate overtime (rounded up)
  const overtime = Math.max(0, Math.ceil(actualShiftLength - shiftLength));

  return {
    id: uuidv4(),
    project_user_id: projectUserId,
    start_date: date,
    from: startTime,
    to: endTime,
    shift_lenght: shiftLength,
    calculated_overtime: overtime,
    claimed_overtime: Math.random() < 0.5 ? overtime : overtime + 1,
    create_date: new Date(),
    create_user_id: 'system-user',
    last_update_user_id: 'system-user',
    last_update_date: new Date(),
    car_id: carId,
    kilometers: carId ? Math.floor(Math.random() * 100 + 10) : null,
  };
}
