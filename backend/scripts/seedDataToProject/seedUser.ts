import { user } from '../../src/db/schema';
import { v4 as uuidv4 } from 'uuid';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { emailDomains } from './customFakeData/emailDomains';
import {
  czechFirstNamesFemale,
  czechFirstNamesMale,
  czechLastNamesFemale,
  czechLastNamesMale,
} from './customFakeData/czechNames';

export async function seedUsers(
  db: MySql2Database<typeof import('../../src/db/schema')>,
  count: number,
) {
  console.log('Seeding users...');

  const users = Array.from({ length: count }, () => {
    const isFemale = Math.random() < 0.5;
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

    const normalizeString = (str: string) => {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Remove diacritical marks
    };

    const normalizedFirstName = normalizeString(firstName);
    const normalizedLastName = normalizeString(lastName);

    const email = `${normalizedFirstName.toLowerCase()}.${normalizedLastName.toLowerCase()}${emailDomains[Math.floor(Math.random() * emailDomains.length)]}`;
    return {
      id: uuidv4(),
      email: email,
      password: '$argon2id$v=19$m=65536,t=3,p=4$randompasswordhash',
      name: firstName,
      surname: lastName,
      create_date: new Date(),
      create_user_id: 'system-user',
      last_update_user_id: 'system-user',
      last_update_date: new Date(),
      is_active: true,
      phone_number: `+420${Math.floor(Math.random() * 1000000000)}`,
      password_reset_token: null,
      password_reset_expiration_time: null,
    };
  });

  await db.insert(user).values(users);
  console.log(`${count} users inserted`);

  return users.map((u) => ({
    id: u.id,
    name: u.name,
    surname: u.surname,
    email: u.email,
    phone_number: u.phone_number,
  }));
}
