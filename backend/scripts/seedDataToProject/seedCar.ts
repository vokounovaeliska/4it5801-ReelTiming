import { car } from '../../src/db/schema';
import { v4 as uuidv4 } from 'uuid';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { carTypes } from './customFakeData/carTypes';

export async function seedCars(
  db: MySql2Database<typeof import('../../src/db/schema')>,
  count: number,
  projectUsers: { id: string }[],
) {
  console.log('Seeding cars...');

  const usersWithCars = projectUsers.slice(0, count);
  const cars = usersWithCars.map((user) => ({
    id: uuidv4(),
    name: carTypes[Math.floor(Math.random() * carTypes.length)],
    kilometer_allow: Math.floor(Math.random() * 30) + 1,
    kilometer_rate: Math.random() * 25 + 5,
    project_user_id: user.id,
    create_date: new Date(),
    create_user_id: 'system-user',
    last_update_user_id: 'system-user',
    last_update_date: new Date(),
  }));

  await db.insert(car).values(cars);

  console.log(`${cars.length} cars inserted`);

  return cars;
}
