import { shooting_day } from '../../src/db/schema';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { MySql2Database } from 'drizzle-orm/mysql2';

export async function seedShootingDays(
  db: MySql2Database<typeof import('../../src/db/schema')>,
  projectId: string,
  count: number,
  projectStartDate: Date, // New parameter for the project's start date
): Promise<{ id: string; date: Date }[]> {
  console.log('Seeding shooting days...');

  const shootingDays: {
    id: string;
    project_id: string;
    shooting_day_number: number;
    date: Date;
    event_type: 'Shooting' | 'Rehearsal' | 'Post-production';
  }[] = [];

  let lastDate = new Date(projectStartDate);

  for (let index = 0; index < count; index++) {
    const randomDayIncrement = Math.floor(Math.random() * 3) + 1;
    const newDate = new Date(lastDate);
    newDate.setDate(newDate.getDate() + randomDayIncrement);

    if (newDate <= lastDate) {
      newDate.setDate(lastDate.getDate() + randomDayIncrement);
    }

    const shootingDayNumber = index + 1;

    shootingDays.push({
      id: uuidv4(),
      project_id: projectId,
      shooting_day_number: shootingDayNumber,
      date: newDate,
      event_type: faker.helpers.arrayElement([
        'Shooting',
        'Rehearsal',
        'Post-production',
      ]),
    });

    lastDate = newDate;
  }
  await db.insert(shooting_day).values(shootingDays);
  console.log(`${shootingDays.length} shooting days inserted`);

  return shootingDays.map(({ id, date }) => ({ id, date }));
}
