import { daily_report } from '../../src/db/schema';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { v4 as uuidv4 } from 'uuid';
import {
  czechFirstNamesFemale,
  czechFirstNamesMale,
  czechLastNamesFemale,
  czechLastNamesMale,
} from './customFakeData/czechNames';
import { getRandomTime } from './customFakeData/fakeDataUtils';

export async function seedDailyReports(
  db: MySql2Database<typeof import('../../src/db/schema')>,
  projectId: string,
  shootingDays: { id: string; date: Date }[],
  howManyReports: number,
) {
  console.log(`Seeding daily reports for project ${projectId}...`);

  const selectedShootingDays = shootingDays.slice(0, howManyReports);

  const dailyReports = selectedShootingDays.map((day) => {
    const getRandomName = (isFemale: boolean) => {
      const firstName = isFemale
        ? czechFirstNamesFemale[
            Math.floor(Math.random() * czechFirstNamesFemale.length)
          ]
        : czechFirstNamesMale[
            Math.floor(Math.random() * czechFirstNamesMale.length)
          ];

      const lastName = isFemale
        ? czechLastNamesFemale[
            Math.floor(Math.random() * czechLastNamesFemale.length)
          ]
        : czechLastNamesMale[
            Math.floor(Math.random() * czechLastNamesMale.length)
          ];

      return `${firstName} ${lastName}`;
    };

    const lineProducerName = getRandomName(true);
    const directorName = getRandomName(false);
    const productionManagerName = getRandomName(false);
    const dopName = getRandomName(true);

    return {
      id: uuidv4(),
      project_id: projectId,
      shooting_day_id: day.id,
      intro: [
        { title: 'Line Producer', value: lineProducerName },
        { title: 'Ready to Shoot', value: getRandomTime() },
        { title: 'Production Manager', value: productionManagerName },
        { title: 'Crewcall', value: getRandomTime() },
        { title: 'Lunch Break', value: getRandomTime() },
        { title: 'Director', value: directorName },
        { title: 'Breakfast', value: getRandomTime() },
        { title: 'Wrap', value: getRandomTime() },
        { title: 'DOP', value: dopName },
        { title: 'Early call', value: getRandomTime() },
      ],
      shooting_progress: [
        {
          title: 'Scheduled scenes',
          value: `Scenes ${Math.floor(Math.random() * 5 + 1)}`,
        },
        {
          title: 'Completed scenes',
          value: `Scenes ${Math.floor(Math.random() * 4 + 1)}`,
        },
        { title: 'DATA', value: `${Math.floor(Math.random() * 151 + 50)} GB` },
        {
          title: 'Camera A + B',
          value: `${Math.floor(Math.random() * 16 + 5)} shots`,
        },
        {
          title: 'Note',
          value: `Obraz natočen v rámci sekvence ${Math.round(Math.random() * 100)}`,
        },
      ],
      footer: [
        { title: 'Production Manager', value: productionManagerName },
        { title: 'Line Producer', value: lineProducerName },
      ],
      create_date: new Date(),
      last_update_date: new Date(),
    };
  });

  await db.insert(daily_report).values(dailyReports);

  console.log(
    `${dailyReports.length} daily reports inserted for project ${projectId}.`,
  );
}
