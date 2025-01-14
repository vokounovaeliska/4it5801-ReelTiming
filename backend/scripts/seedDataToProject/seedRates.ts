import { rate } from '../../src/db/schema';
import { v4 as uuidv4 } from 'uuid';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { generateRate } from './customFakeData/fakeDataUtils';

export async function seedRates(
  db: MySql2Database<typeof import('../../src/db/schema')>,
  count: number,
) {
  console.log('Seeding rates...');

  const rates = Array.from({ length: count }, () => ({
    id: uuidv4(),
    standard_rate: generateRate(1500, 20000, 100),
    overtime_hour1: generateRate(300, 1000, 50),
    overtime_hour2: generateRate(300, 1200, 50),
    overtime_hour3: generateRate(400, 1500, 10),
    overtime_hour4: generateRate(400, 2000, 10),
    compensation_rate: generateRate(400, 2000, 100),
    create_date: new Date(),
    create_user_id: 'system-user',
    last_update_user_id: 'system-user',
    last_update_date: new Date(),
  }));

  await db.insert(rate).values(rates);

  console.log(`${count} rates inserted`);
  return rates.map((r) => ({
    id: r.id,
  }));
}
