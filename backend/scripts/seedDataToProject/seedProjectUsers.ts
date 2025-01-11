import { project_user } from '../../src/db/schema';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { departmentPositions } from './customFakeData/departmentPostions';

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
}

export async function seedProjectUsers(
  db: MySql2Database<typeof import('../../src/db/schema')>,
  projectId: string,
  users: {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone_number: string | null;
  }[],
  rateIds: {
    id: string;
  }[],
  departments: { id: string; name: string }[],
  // carIds: { id: string }[], // This will be a list of car ids
  count: number,
): Promise<ProjectUser[]> {
  console.log('Seeding project users...');

  const projectUsers: ProjectUser[] = [];

  // Loop over userIds and rateIds sequentially
  for (let i = 0; i < count; i++) {
    const userId = users[i].id;
    const rateId = rateIds[i].id;
    const department = departments[i]; // Get department

    const departmentPosition = departmentPositions[department.name];
    const position = faker.helpers.arrayElement(departmentPosition);

    projectUsers.push({
      id: uuidv4(),
      project_id: projectId,
      user_id: userId,
      department_id: department.id,
      rate_id: rateId,
      position: position,
      number_of_people: faker.number.int({ min: 1, max: 5 }),
      is_team_leader: faker.datatype.boolean(),
      name: users[i].name,
      surname: users[i].surname,
      email: users[i].email,
      create_date: new Date(),
      create_user_id: 'system-user',
      last_update_user_id: 'system-user',
      last_update_date: new Date(),
      is_active: faker.datatype.boolean(),
      role: 'CREW',
      invitation: faker.datatype.boolean() ? uuidv4() : null,
      phone_number: `+420${faker.string.numeric(3)}${faker.string.numeric(3)}${faker.string.numeric(3)}`,
    });
  }

  await db.insert(project_user).values(projectUsers);
  console.log(`${projectUsers.length} project users inserted`);
  return projectUsers;
}
