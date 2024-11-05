import { MySql2Database } from 'drizzle-orm/mysql2';

import { department } from '../src/db/schema';

async function seedDepartment(
  db: MySql2Database<typeof import('../src/db/schema')>,
) {
  console.log('Seeding departments...');

  if ((await db.select().from(department)).length === 0) {
    console.log('No departments found, inserting sample departments');
    await db.insert(department).values([
      { name: 'Production', id: '8dbf52d6-75e3-4e91-a1f4-24a79cf74cdd' },
      {
        name: 'Assistant Director',
        id: '53964a96-17f1-4c96-a69d-cec10f2b01b6',
      },
      { name: 'Camera', id: '6e1d6dc7-8daa-49bd-a58d-520a5fc3e1da' },
      { name: 'Lights', id: '5008d9f1-ca78-4b9b-a513-29516c49ede6' },
      { name: 'Grip', id: 'a7bc5b6e-dc71-48cd-9f5f-0d7f5381ee60' },
      { name: 'Sound', id: 'e0e95a54-9f32-4063-b182-0a6684d6009d' },
      { name: 'Wardrobe', id: '8d8cca48-7f4d-422b-892d-692902a733a5' },
      { name: 'Make-up', id: 'e6cedb38-e4bb-4b3e-a168-a86851936682' },
      { name: 'Art Department', id: '85daa56c-17eb-487f-a77c-725e4ee22634' },
      { name: 'SFX', id: '8d36a7eb-5005-4583-91b6-bd90e468b9c0' },
      { name: 'Stunts', id: 'd665db1f-f23c-4ee0-af7b-c833258b414b' },
      { name: 'Transport', id: '268b1a7a-1f98-4ec2-8f02-fab9b99a6055' },
      { name: 'Basecamp', id: '04eb72c4-bf68-4f74-8718-42a4cc516b2f' },
      { name: 'Catering', id: 'f9931b15-6d2a-4d91-b328-79509d0da246' },
      { name: 'Locations', id: 'd81febd0-1317-4690-9be0-696703cc6305' },
      { name: 'Security', id: '890818b3-e1e7-4759-b107-fdbc2532334d' },
      { name: 'Talents', id: 'a0fc642a-0b51-4f1e-b503-5985bf0fef73' },
      { name: 'Extras', id: '28553605-12a6-47e4-b35f-aa6921e5e988' },
      { name: 'Others', id: 'd19da945-fd0f-4c42-9d09-27f78fd2da26' },
    ]);

    console.log('Sample departments inserted');
  } else {
    console.log('Departments already exist, skipping department seed');
  }
}
export default seedDepartment;
