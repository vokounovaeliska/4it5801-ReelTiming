import { car } from '../../src/db/schema';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { MySql2Database } from 'drizzle-orm/mysql2';

export async function seedCars(
  db: MySql2Database<typeof import('../../src/db/schema')>,
  count: number,
) {
  console.log('Seeding cars...');

  const cars = Array.from({ length: count }, () => ({
    id: uuidv4(),
    name: faker.vehicle.vehicle(),
    kilometer_allow: faker.number.int({ min: 0, max: 100 }), // Používáme faker.number.int
    kilometer_rate: faker.number.float({ min: 5, max: 30 }), // Používáme faker.number.float
    project_user_id: null, // Připojeno k project_user později
    create_date: new Date(),
    create_user_id: 'system-user',
    last_update_user_id: 'system-user',
    last_update_date: new Date(),
  }));

  await db.insert(car).values(cars);

  console.log(`${count} cars inserted`);

  return (await db.select({ id: car.id }).from(car)).map((c) => c.id);
}
