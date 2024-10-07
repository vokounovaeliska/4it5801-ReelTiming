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
      await db.insert(user).values([
        {
          id: 1,
          name: 'Young Gatchell',
          email: 'yg123@quacker.cz',
          password: 'notHashedPassword1',
        },
        {
          id: 2,
          name: 'Gatchell Young',
          email: 'gyoung@quacker.cz',
          password: 'notHashedPassword2',
        },
        {
          id: 3,
          name: 'Mitchel Old',
          email: 'oldmit@quacker.cz',
          password: 'notHashedPassword3',
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
