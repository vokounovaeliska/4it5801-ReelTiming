import * as argon2 from 'argon2';
import { MySql2Database } from 'drizzle-orm/mysql2';

import { user } from '../src/db/schema';

async function seedUsers(
  db: MySql2Database<typeof import('../src/db/schema')>,
) {
  console.log('Seeding users...');

  if ((await db.select().from(user)).length === 0) {
    console.log('No users found, inserting sample users');

    const password1 = await argon2.hash('notHashedPassword1');
    const password2 = await argon2.hash('notHashedPassword2');

    await db.insert(user).values([
      {
        name: 'Jan',
        surname: 'Novák',
        email: 'jan.novak@example.cz',
        password: password1,
        create_date: new Date('2024-10-18 19:00:10'),
        create_user_id: 'user-id-1',
        last_update_user_id: 'user-id-1',
        last_update_date: new Date('2024-10-18 19:00:10'),
        is_active: true,
        password_reset_token: null,
        password_reset_expiration_time: null,
      },
      {
        name: 'Petra',
        surname: 'Svobodová',
        email: 'petra.svobodova@example.cz',
        password: password2,
        create_date: new Date('2024-10-18 19:00:10'),
        create_user_id: 'user-id-2',
        last_update_user_id: 'user-id-2',
        last_update_date: new Date('2024-10-18 19:00:10'),
        is_active: true,
        password_reset_token: null,
        password_reset_expiration_time: null,
      },
    ]);

    console.log('Sample users inserted');
  } else {
    console.log('Users already exist, skipping user seed');
  }
}
export default seedUsers;
