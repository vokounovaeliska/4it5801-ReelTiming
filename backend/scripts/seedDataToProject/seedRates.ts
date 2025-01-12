import { rate } from '../../src/db/schema';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { MySql2Database } from 'drizzle-orm/mysql2';

export async function seedRates(
  db: MySql2Database<typeof import('../../src/db/schema')>,
  count: number,
) {
  console.log('Seeding rates...');

  function generateNumber(min: number, max: number) {
    return faker.number.int({ min, max });
  }

  const rates = Array.from({ length: count }, () => ({
    id: uuidv4(),
    standard_rate: generateNumber(1500, 20000),
    overtime_hour1: generateNumber(300, 1000),
    overtime_hour2: generateNumber(300, 1200),
    overtime_hour3: generateNumber(400, 1500),
    overtime_hour4: generateNumber(400, 2000),
    compensation_rate: generateNumber(400, 2000),
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
