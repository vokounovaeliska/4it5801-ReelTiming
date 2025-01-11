import { project_user } from '../../src/db/schema';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { MySql2Database } from 'drizzle-orm/mysql2';

// Type for project users
export interface ProjectUser {
  id: string;
  project_id: string;
  user_id: string;
  department_id: string;
  rate_id: string;
  position: string;
  number_of_people: number;
  is_team_leader: boolean;
  name: string;
  surname: string;
  email: string;
  create_date: Date;
  create_user_id: string;
  last_update_user_id: string;
  last_update_date: Date;
  is_active: boolean;
  role: string;
  invitation: string | null;
  phone_number: string;
  car_id: string | null;
}

export async function seedProjectUsers(
  db: MySql2Database<typeof import('../../src/db/schema')>,
  projectId: string,
  userIds: string[],
  rateIds: string[],
  departments: { id: string; name: string }[],
  carIds: string[],
  count: number,
): Promise<ProjectUser[]> {
  console.log('Seeding project users...');

  const projectUsers: ProjectUser[] = [];

  // Loop over userIds and rateIds sequentially
  for (let i = 0; i < count; i++) {
    const userId = userIds[i];
    const rateId = rateIds[i];
    const department = faker.helpers.arrayElement(departments);

    // Assign a car to approximately 25% of users
    const carId = carIds[i % carIds.length] || null; // Ensuring the car assignment is safe

    projectUsers.push({
      id: uuidv4(),
      project_id: projectId,
      user_id: userId,
      department_id: department.id,
      rate_id: rateId,
      position: faker.person.jobTitle(),
      number_of_people: faker.number.int({ min: 1, max: 5 }),
      is_team_leader: faker.datatype.boolean(),
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      email: faker.internet.email(),
      create_date: new Date(),
      create_user_id: 'system-user',
      last_update_user_id: 'system-user',
      last_update_date: new Date(),
      is_active: faker.datatype.boolean(),
      role: 'CREW',
      invitation: faker.datatype.boolean() ? uuidv4() : null,
      phone_number: `+420${faker.string.numeric(3)}${faker.string.numeric(3)}${faker.string.numeric(3)}`,
      car_id: carId,
    });
  }

  // Insert into the database and return the project users
  if (projectUsers.length > 0) {
    await db.insert(project_user).values(projectUsers);
    console.log(`${projectUsers.length} project users inserted`);
    return projectUsers; // Return the list of project users
  } else {
    console.log('No new project users to insert');
    return []; // Return an empty array if no users are created
  }
}
