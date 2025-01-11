import { rate } from '../../src/db/schema';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { MySql2Database } from 'drizzle-orm/mysql2';

export async function seedRates(
  db: MySql2Database<typeof import('../../src/db/schema')>,
  count: number,
) {
  console.log('Seeding rates...');

  function generateNumber(min, max) {
    let number;
    do {
      number = faker.number.int({ min, max });
    } while (number % 10 === 0 || number % 10 === 9);
    return number;
  }

  const rates = Array.from({ length: count }, () => ({
    id: uuidv4(),
    standard_rate: generateNumber(1500, 20000),
    overtime_hour1: generateNumber(200, 1000),
    overtime_hour2: generateNumber(200, 300),
    overtime_hour3: generateNumber(300, 300),
    overtime_hour4: generateNumber(300, 300),
    compensation_rate: generateNumber(300, 2000),
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
