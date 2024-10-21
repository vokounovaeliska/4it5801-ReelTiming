import * as argon2 from 'argon2';

import { getConnection } from '../src/db/db';
import { project, user } from '../src/db/schema'; // Assuming you have a project schema defined

async function seed() {
  console.log('Starting seed function');
  const connection = await getConnection();
  const db = connection.db;
  console.log('Database connection established');

  try {
    // Seed users
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
          phone_number: '777123456',
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
          phone_number: '777654321',
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

    if ((await db.select().from(project)).length === 0) {
      console.log('No projects found, inserting sample projects');

      await db.insert(project).values([
        {
          name: 'Kreativní Reklama',
          description: 'An innovative advertising campaign for a local brand.',
          production_company: 'Reklamní Studio CZ',
          start_date: new Date('2024-11-01'),
          end_date: new Date('2025-01-31'),
          create_date: new Date('2024-10-18 19:00:10'),
          create_user_id: 'user-id-1',
          last_update_user_id: 'user-id-1',
          last_update_date: new Date('2024-10-18 19:00:10'),
          is_active: true,
        },
        {
          name: 'Filmový Projekt: Cesta',
          description:
            'A short film about personal journeys and self-discovery.',
          production_company: 'Filmová Produkce Praha',
          start_date: new Date('2024-12-01'),
          end_date: new Date('2025-03-31'),
          create_date: new Date('2024-10-18 19:00:10'),
          create_user_id: 'user-id-2',
          last_update_user_id: 'user-id-2',
          last_update_date: new Date('2024-10-18 19:00:10'),
          is_active: true,
        },
      ]);
      console.log('Sample projects inserted');
    } else {
      console.log('Projects already exist, skipping project seed');
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
