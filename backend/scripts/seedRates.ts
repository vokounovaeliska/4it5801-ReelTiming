import { MySql2Database } from 'drizzle-orm/mysql2';
import { rate } from '../src/db/schema';

async function seedRates(
  db: MySql2Database<typeof import('../src/db/schema')>,
) {
  console.log('Seeding rates...');

  const existingRates = await db.select().from(rate);
  if (existingRates.length === 0) {
    console.log('No rates found, inserting sample rates');

    // Insert rates
    await db.insert(rate).values([
      {
        id: '041f571f-c0da-41be-8246-69ce5183153a',
        standard_rate: 500,
        overtime_hour1: 500,
        overtime_hour2: 500,
        overtime_hour3: 500,
        overtime_hour4: 500,
        compensation_rate: 500,
        create_date: new Date('2024-11-04T18:52:34Z'),
        create_user_id: '', // Replace with actual user ID if needed
        last_update_user_id: '', // Replace with actual user ID if needed
        last_update_date: new Date('2024-11-04T18:52:34Z'),
      },
      {
        id: '5ec942bb-4a24-44e6-bcba-56bc5cbb5bce',
        standard_rate: 0,
        overtime_hour1: 0,
        overtime_hour2: 0,
        overtime_hour3: 0,
        overtime_hour4: 0,
        compensation_rate: 0,
        create_date: new Date('2024-11-05T14:21:59Z'),
        create_user_id: '',
        last_update_user_id: '',
        last_update_date: new Date('2024-11-05T14:21:59Z'),
      },
      {
        id: '6edb3f21-bc29-476b-abed-b9f0d1e97191',
        standard_rate: 1500,
        overtime_hour1: 2000,
        overtime_hour2: 2000,
        overtime_hour3: 2000,
        overtime_hour4: 2000,
        compensation_rate: 1800,
        create_date: new Date('2024-11-04T18:48:55Z'),
        create_user_id: '',
        last_update_user_id: '',
        last_update_date: new Date('2024-11-04T18:48:55Z'),
      },
      {
        id: '7bc4a1cf-c1a6-4ef1-87c7-47079bbf3e77',
        standard_rate: 1800,
        overtime_hour1: 2200,
        overtime_hour2: 2300,
        overtime_hour3: 2400,
        overtime_hour4: 2400,
        compensation_rate: 2200,
        create_date: new Date('2024-11-04T18:39:51Z'),
        create_user_id: '',
        last_update_user_id: '',
        last_update_date: new Date('2024-11-04T18:39:51Z'),
      },
      {
        id: '77e960f2-8f64-4c0e-94e7-84e7e013fe16',
        standard_rate: 2000,
        overtime_hour1: 2200,
        overtime_hour2: 2300,
        overtime_hour3: 2400,
        overtime_hour4: 2500,
        compensation_rate: 2200,
        create_date: new Date('2024-11-04T18:38:53Z'),
        create_user_id: '',
        last_update_user_id: '',
        last_update_date: new Date('2024-11-04T18:38:53Z'),
      },
      {
        id: '707bf50e-a0f3-4c6d-8df1-af51b9a8e84d',
        standard_rate: 5000,
        overtime_hour1: 5600,
        overtime_hour2: 5700,
        overtime_hour3: 5800,
        overtime_hour4: 5900,
        compensation_rate: 5500,
        create_date: new Date('2024-11-04T18:58:13Z'),
        create_user_id: '',
        last_update_user_id: '',
        last_update_date: new Date('2024-11-04T18:58:13Z'),
      },
      {
        id: 'b21c7c71-bc82-43dc-bd53-f0a1bdfd0e15',
        standard_rate: 400,
        overtime_hour1: 460,
        overtime_hour2: 470,
        overtime_hour3: 480,
        overtime_hour4: 500,
        compensation_rate: 450,
        create_date: new Date('2024-11-04T18:59:59Z'),
        create_user_id: '',
        last_update_user_id: '',
        last_update_date: new Date('2024-11-04T18:59:59Z'),
      },
      {
        id: '85cf4dfa-7768-49ec-b56e-38ab3ae7b252',
        standard_rate: 600,
        overtime_hour1: 700,
        overtime_hour2: 800,
        overtime_hour3: 850,
        overtime_hour4: 880,
        compensation_rate: 700,
        create_date: new Date('2024-11-04T18:56:08Z'),
        create_user_id: '',
        last_update_user_id: '',
        last_update_date: new Date('2024-11-04T18:56:08Z'),
      },
      {
        id: '9bb93221-e8fe-42ca-bafd-1e12dfb98520',
        standard_rate: 1600,
        overtime_hour1: 1800,
        overtime_hour2: 1850,
        overtime_hour3: 1900,
        overtime_hour4: 2000,
        compensation_rate: 1800,
        create_date: new Date('2024-11-04T18:51:26Z'),
        create_user_id: '',
        last_update_user_id: '',
        last_update_date: new Date('2024-11-04T18:51:26Z'),
      },
    ]);

    console.log('Sample rates inserted');
  } else {
    console.log('Rates already exist, skipping rate seed');
  }
}

export default seedRates;
