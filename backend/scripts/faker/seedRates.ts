import { rate } from '../../src/db/schema';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { MySql2Database } from 'drizzle-orm/mysql2';

export async function seedRates(
  db: MySql2Database<typeof import('../../src/db/schema')>,
  count: number,
) {
  console.log('Seeding rates...');

  const rates = Array.from({ length: count }, () => ({
    id: uuidv4(),
    standard_rate: faker.number.int({ min: 1000, max: 20000 }), // Nahrazeno faker.number.int
    overtime_hour1: faker.number.int({ min: 100, max: 1000 }), // Nahrazeno faker.number.int
    overtime_hour2: faker.number.int({ min: 100, max: 300 }), // Nahrazeno faker.number.int
    overtime_hour3: faker.number.int({ min: 200, max: 300 }), // Nahrazeno faker.number.int
    overtime_hour4: faker.number.int({ min: 200, max: 300 }), // Nahrazeno faker.number.int
    compensation_rate: faker.number.int({ min: 100, max: 500 }), // Nahrazeno faker.number.int
    create_date: new Date(),
    create_user_id: 'system-user',
    last_update_user_id: 'system-user',
    last_update_date: new Date(),
  }));

  await db.insert(rate).values(rates);

  console.log(`${count} rates inserted`);

  return (await db.select({ id: rate.id }).from(rate)).map((r) => r.id);
}
