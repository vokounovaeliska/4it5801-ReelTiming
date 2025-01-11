import { shift_overview } from '../../src/db/schema';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { v4 as uuidv4 } from 'uuid';
import { InferInsertModel } from 'drizzle-orm';

type ShiftOverviewInsert = InferInsertModel<typeof shift_overview>;

export async function seedShiftOverview(
  db: MySql2Database<typeof import('../../src/db/schema')>,
  projectId: string,
  shootingDays: { id: string; date: Date }[],
  projectUsers: { id: string; car_id: string | null }[],
) {
  console.log(`Seeding shift_overview for project ${projectId}...`);

  const overviews: ShiftOverviewInsert[] = [];

  // 1. Generate shift overview for the first 20 shooting days
  shootingDays.slice(0, 20).forEach((day) => {
    // Randomly select 80% of the project users for each shooting day
    const selectedUsers = projectUsers
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(projectUsers.length * 0.8));

    overviews.push({
      id: uuidv4(),
      project_id: projectId,
      date: day.date,
      crew_working: selectedUsers.map((user) => ({ id: user.id })),
    });
  });

  // 2. Generate shift overview for random days outside of shooting days
  const randomDays = Array.from({ length: 10 }, () => {
    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));

    // Randomly select 60% of the project users for the random days
    const selectedUsers = projectUsers
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(projectUsers.length * 0.6));

    return {
      id: uuidv4(),
      project_id: projectId,
      date: randomDate,
      crew_working: selectedUsers.map((user) => ({ id: user.id })),
    };
  });

  overviews.push(...randomDays);
  await db.insert(shift_overview).values(overviews);

  console.log(
    `${overviews.length} shift_overview records inserted for project ${projectId}.`,
  );
}
