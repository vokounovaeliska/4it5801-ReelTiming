import { shift_overview } from '../../src/db/schema';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { v4 as uuidv4 } from 'uuid';
import { InferInsertModel } from 'drizzle-orm';

// Typ pro vkládání záznamů do tabulky `shift_overview`
type ShiftOverviewInsert = InferInsertModel<typeof shift_overview>;

export async function seedShiftOverview(
  db: MySql2Database<typeof import('../../src/db/schema')>,
  projectId: string,
  shootingDays: { id: string; date: Date }[],
  projectUsers: { id: string; car_id: string | null }[],
) {
  console.log(`Seeding shift_overview for project ${projectId}...`);

  const overviews: ShiftOverviewInsert[] = [];

  // 1. Shift overview pro 20 prvních shooting days
  shootingDays.slice(0, 20).forEach((day) => {
    const selectedUsers = projectUsers
      .sort(() => Math.random() - 0.5) // Zamícháme uživatele
      .slice(0, Math.floor(projectUsers.length * 0.8)); // Většina uživatelů (80 %)

    overviews.push({
      id: uuidv4(),
      project_id: projectId,
      date: day.date,
      crew_working: selectedUsers.map((user) => ({ id: user.id })), // Directly passing an array of objects
    });
  });

  // 2. Shift overview pro náhodné dny mimo shooting_days
  const randomDays = Array.from({ length: 10 }, () => {
    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30)); // Náhodné datum v minulosti

    const selectedUsers = projectUsers
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(projectUsers.length * 0.6)); // 60 % uživatelů

    return {
      id: uuidv4(),
      project_id: projectId,
      date: randomDate,
      crew_working: selectedUsers.map((user) => ({ id: user.id })), // Directly passing an array of objects
    };
  });

  // Sloučíme všechna data
  overviews.push(...randomDays);

  // Vložení do databáze
  await db.insert(shift_overview).values(overviews);

  console.log(
    `${overviews.length} shift_overview records inserted for project ${projectId}.`,
  );
}
