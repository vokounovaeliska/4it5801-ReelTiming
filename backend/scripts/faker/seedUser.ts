import { user } from '../../src/db/schema';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { MySql2Database } from 'drizzle-orm/mysql2';

export async function seedUsers(
  db: MySql2Database<typeof import('../../src/db/schema')>,
  count: number,
) {
  console.log('Seeding users...');

  const users = Array.from({ length: count }, () => ({
    id: uuidv4(),
    email: faker.internet.email(),
    password: '$argon2id$v=19$m=65536,t=3,p=4$randompasswordhash',
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    create_date: new Date(),
    create_user_id: 'system-user',
    last_update_user_id: 'system-user',
    last_update_date: new Date(),
    is_active: true,
    phone_number: `+420${faker.string.numeric(3)}${faker.string.numeric(3)}${faker.string.numeric(3)}`, // Generuje číslo ve formátu +420 ### ### ###
    password_reset_token: null,
    password_reset_expiration_time: null,
  }));

  await db.insert(user).values(users);

  console.log(`${count} users inserted`);

  return (await db.select({ id: user.id }).from(user)).map((u) => u.id);
}
