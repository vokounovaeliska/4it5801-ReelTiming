import { MySql2Database } from 'drizzle-orm/mysql2';
import { department } from '../../src/db/schema';
import { eq } from 'drizzle-orm/sql';

export async function getDepartmentsForProject(
  db: MySql2Database<typeof import('../../src/db/schema')>,
  projectId: string,
) {
  console.log(`Fetching departments for projectId: ${projectId}...`);

  const departments = await db
    .select({
      id: department.id,
      name: department.name,
    })
    .from(department)
    .where(eq(department.project_id, projectId));

  if (departments.length === 0) {
    throw new Error(`No departments found for projectId ${projectId}`);
  }

  console.log(
    `${departments.length} departments found for projectId: ${projectId}`,
  );
  return departments;
}
