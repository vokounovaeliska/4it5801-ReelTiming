import { MySql2Database } from 'drizzle-orm/mysql2';

import { user } from '../src/db/schema';

async function seedUsers(
  db: MySql2Database<typeof import('../src/db/schema')>,
) {
  console.log('Seeding users...');

  if ((await db.select().from(user)).length === 0) {
    console.log('No users found, inserting sample users');

    await db.insert(user).values([
      {
        id: '75a41493-c0b3-45ba-86bd-970459ee9b99',
        email: 'produkce@film.com',
        password:
          '$argon2id$v=19$m=65536,t=3,p=4$nSIgPAxBmLrotulM5MWKUw$2Qwrkw1xIcIlmjlPQj1zYsjwdoRM0cT1h1VzYKNMiGY',
        name: 'Jan',
        surname: 'Doleček',
        create_date: new Date('2024-11-04 18:32:01'),
        create_user_id: 'user-id',
        last_update_user_id: 'user-id',
        last_update_date: new Date('2024-11-05 14:06:04'),
        is_active: true,
        password_reset_token: null,
        password_reset_expiration_time: null,
        phone_number: '725037223',
      },
      {
        id: '4b95fa2a-b110-431e-a141-929c94870c1f',
        email: 'marie.vdolek@film.cz',
        password:
          '$argon2id$v=19$m=65536,t=3,p=4$+o96ya57gk2FWR2rgKEbCg$/bW9JkDQZFwH91TBHr2V6yusJZLZ8WeEKYAAdM3a4RA',
        name: 'Marie',
        surname: 'Vdolková',
        create_date: new Date('2024-11-04 19:01:20'),
        create_user_id: 'user-id',
        last_update_user_id: 'user-id',
        last_update_date: new Date('2024-11-04 21:15:48'),
        is_active: true,
        password_reset_token: null,
        password_reset_expiration_time: null,
        phone_number: '+420790395887',
      },
    ]);

    console.log('Sample users inserted');
  } else {
    console.log('Users already exist, skipping user seed');
  }
}

export default seedUsers;
