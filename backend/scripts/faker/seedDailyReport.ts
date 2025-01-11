import { daily_report } from '../../src/db/schema';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

export async function seedDailyReports(
  db: MySql2Database<typeof import('../../src/db/schema')>,
  projectId: string,
  shootingDays: { id: string; date: Date }[],
) {
  console.log(`Seeding daily reports for project ${projectId}...`);

  // Vybereme náhodných 20 dní z natáčecích dní
  const selectedShootingDays = shootingDays
    .sort(() => Math.random() - 0.5)
    .slice(0, 20);

  const dailyReports = selectedShootingDays.map((day) => ({
    id: uuidv4(),
    project_id: projectId,
    shooting_day_id: day.id,
    intro: [
      { title: 'Výkonná producentka', value: faker.person.fullName() },
      { title: 'První klapka', value: formatTime(faker.date.recent()) },
      { title: 'Vedoucí produkce', value: faker.person.fullName() },
      { title: 'Crewcall', value: formatTime(faker.date.recent()) },
      { title: 'Oběd', value: formatTime(faker.date.recent()) },
      { title: 'Režisérka', value: faker.person.fullName() },
      { title: 'Snídaně', value: formatTime(faker.date.recent()) },
      { title: 'Wrap', value: formatTime(faker.date.recent()) },
      { title: 'Kameraman', value: faker.person.fullName() },
      { title: 'Early call', value: formatTime(faker.date.recent()) },
    ],
    shooting_progress: [
      {
        title: 'Scheduled scenes',
        value: `Scenes ${faker.number.int({ min: 1, max: 5 })}`,
      },
      {
        title: 'Completed scenes',
        value: `Scenes ${faker.number.int({ min: 1, max: 4 })}`,
      },
      { title: 'DATA', value: `${faker.number.int({ min: 50, max: 200 })} GB` },
      {
        title: 'Camera A + B',
        value: `${faker.number.int({ min: 5, max: 20 })} shots`,
      },
      { title: 'Note', value: faker.lorem.sentence() },
    ],
    footer: [
      { title: 'production manager', value: faker.person.fullName() },
      { title: 'line producer', value: faker.person.fullName() },
    ],
    create_date: new Date(),
    last_update_date: new Date(),
  }));

  await db.insert(daily_report).values(dailyReports);

  console.log(
    `${dailyReports.length} daily reports inserted for project ${projectId}.`,
  );
}

// Helper function to format time into a simpler time format (e.g., "8:00")
function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}
