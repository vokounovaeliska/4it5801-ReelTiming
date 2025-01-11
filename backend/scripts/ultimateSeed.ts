import { db } from './db'; // Připojení k databázi
import { project_user, rate } from './schema';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { getDepartmentsForProject } from './getDepartmentsForProject';

async function seedRates(count: number) {
  const rates = Array.from({ length: count }, () => ({
    id: uuidv4(),
    standard_rate: faker.datatype.number({ min: 500, max: 2000 }),
    overtime_hour1: faker.datatype.number({ min: 50, max: 300 }),
    overtime_hour2: faker.datatype.number({ min: 50, max: 300 }),
    overtime_hour3: faker.datatype.number({ min: 50, max: 300 }),
    overtime_hour4: faker.datatype.number({ min: 50, max: 300 }),
    compensation_rate: faker.datatype.number({ min: 100, max: 500 }),
    create_date: new Date(),
    create_user_id: 'system-user', // Fixní ID uživatele
    last_update_user_id: 'system-user',
    last_update_date: new Date(),
  }));

  await db.insert(rate).values(rates);
  console.log(`Seeded ${count} rates`);
  return rates.map((r) => r.id); // Vrací ID vytvořených sazeb
}

async function seedProjectUsers(
  projectId: string,
  rateIds: string[],
  departments: { id: string; name: string }[],
  count: number,
) {
  const projectUsers = Array.from({ length: count }, () => {
    const randomDepartment = faker.helpers.arrayElement(departments);
    const randomRate = faker.helpers.arrayElement(rateIds);

    return {
      id: uuidv4(),
      project_id: projectId,
      user_id: uuidv4(),
      department_id: randomDepartment.id,
      rate_id: randomRate,
      position: faker.name.jobTitle(),
      number_of_people: faker.datatype.number({ min: 1, max: 5 }),
      is_team_leader: faker.datatype.boolean(),
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      email: faker.internet.email(),
      create_date: new Date(),
      create_user_id: 'system-user',
      last_update_user_id: 'system-user',
      last_update_date: new Date(),
      is_active: faker.datatype.boolean(),
      role: faker.helpers.arrayElement(['CREW', 'MANAGER', 'STAFF']),
      invitation: faker.datatype.boolean() ? uuidv4() : null,
      phone_number: faker.phone.number('+420 ### ### ###'),
    };
  });

  await db.insert(project_user).values(projectUsers);
  console.log(`Seeded ${count} project users for projectId ${projectId}`);
}

// Spuštění seeding skriptu
const PROJECT_ID = '0537a873-d7bf-4537-bad7-6b7cad8fe139';

async function main() {
  const rateCount = 100;
  const userCount = 100;

  // 1. Vytvoření sazeb
  const rateIds = await seedRates(rateCount);

  // 2. Načtení oddělení pro projekt
  const departments = await getDepartmentsForProject(PROJECT_ID);

  // 3. Vytvoření project_user záznamů
  await seedProjectUsers(PROJECT_ID, rateIds, departments, userCount);
}

main()
  .then(() => console.log('Seeding completed!'))
  .catch(console.error);
