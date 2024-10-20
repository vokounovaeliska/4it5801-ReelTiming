import * as argon2 from 'argon2';

import { getConnection } from '../src/db/db';
import { user } from '../src/db/schema';

async function seed() {
  console.log('Starting seed function');
  const connection = await getConnection();
  const db = connection.db;
  console.log('Database connection established');

  try {
    if ((await db.select().from(user)).length === 0) {
      console.log('No users found, inserting sample users');

      // Hash the sample passwords before inserting
      const password1 = await argon2.hash('notHashedPassword1');
      const password2 = await argon2.hash('notHashedPassword2');
      const password3 = await argon2.hash('notHashedPassword3');

      await db.insert(user).values([
        {
          name: 'Young',
          surname: 'Gatchell',
          email: 'yg123@quacker.cz',
          password: password1, // Hashed password
          phone_number: '777777777',
          create_date: new Date('2024-10-18 19:00:10'), // Date object for timestamp
          create_user_id: 'user-id',
          last_update_user_id: 'user-id',
          last_update_date: new Date('2024-10-18 19:00:10'), // Date object for timestamp
          is_active: true,
          password_reset_token: null,
          password_reset_expiration_time: null,
        },
        {
          name: 'Gatchell',
          surname: 'Young',
          email: 'gyoung@quacker.cz',
          password: password2, // Hashed password
          phone_number: '777777777',
          create_date: new Date('2024-10-18 19:00:10'), // Date object for timestamp
          create_user_id: 'user-id',
          last_update_user_id: 'user-id',
          last_update_date: new Date('2024-10-18 19:00:10'), // Date object for timestamp
          is_active: true,
          password_reset_token: null,
          password_reset_expiration_time: null,
        },
        {
          name: 'Mitchel',
          surname: 'Old',
          email: 'oldmit@quacker.cz',
          password: password3, // Hashed password
          phone_number: '777777777',
          create_date: new Date('2024-10-18 19:00:10'), // Date object for timestamp
          create_user_id: 'user-id',
          last_update_user_id: 'user-id',
          last_update_date: new Date('2024-10-18 19:00:10'), // Date object for timestamp
          is_active: true,
          password_reset_token: null,
          password_reset_expiration_time: null,
        },
      ]);
      console.log('Sample users inserted');
    } else {
      console.log('Users already exist, skipping seed');
    }
    console.log('Seed function completed');
  } finally {
    await connection.connection.end();
  }
}

seed().catch((err) => {
  console.error('Error in seed function:', err);
  process.exit(1);
});
