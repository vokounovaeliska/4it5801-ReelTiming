import { MySql2Database } from 'drizzle-orm/mysql2';
import { shooting_day } from '../../src/db/schema';
import { eq } from 'drizzle-orm/sql';

export async function getShootingdaysForProject(
  db: MySql2Database<typeof import('../../src/db/schema')>,
  projectId: string,
) {
  console.log(`Fetching shooting days for projectId: ${projectId}...`);

  const days = await db
    .select({
      id: shooting_day.id,
      shooting_day_number: shooting_day.shooting_day_number,
      date: shooting_day.date,
    })
    .from(shooting_day)
    .where(eq(shooting_day.project_id, projectId));

  if (days.length === 0) {
    throw new Error(`No shooting days found for projectId ${projectId}`);
  }

  console.log(`${days.length} shooting days found for projectId: ${projectId}`);
  return days;
}
