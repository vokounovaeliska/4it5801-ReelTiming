import { MySql2Database } from 'drizzle-orm/mysql2';

import { department } from '../src/db/schema';

async function seedDepartment(
  db: MySql2Database<typeof import('../src/db/schema')>,
) {
  console.log('Seeding departments...');

  if ((await db.select().from(department)).length === 0) {
    console.log('No departments found, inserting sample departments');

    await db
      .insert(department)
      .values([
        { name: 'Production' },
        { name: 'Assistant Director' },
        { name: 'Camera' },
        { name: 'Lights' },
        { name: 'Grip' },
        { name: 'Sound' },
        { name: 'Wardrobe' },
        { name: 'Make-up' },
        { name: 'Art Department' },
        { name: 'SFX' },
        { name: 'Stunts' },
        { name: 'Transport' },
        { name: 'Basecamp' },
        { name: 'Catering' },
        { name: 'Locations' },
        { name: 'Security' },
        { name: 'Talents' },
        { name: 'Extras' },
        { name: 'Others' },
      ]);

    console.log('Sample departments inserted');
  } else {
    console.log('Departments already exist, skipping department seed');
  }
}
export default seedDepartment;
