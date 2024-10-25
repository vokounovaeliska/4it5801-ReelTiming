import { eq } from 'drizzle-orm';

import { department } from '@backend/db/schema';
import { type Db } from '@backend/types/types';

export function getDepartmentRepository(db: Db) {
  return {
    async getAllDepartments() {
      return db.select().from(department).orderBy(department.name);
    },
    async getDepartmentById(id: string) {
      return db.select().from(department).where(eq(department.id, id));
    },
    async geDepartmentByName(name: string) {
      return db.select().from(department).where(eq(department.name, name));
    },
    async createDepartment(data: { name: string }) {
      const result = await db
        .insert(department)
        .values({
          name: data.name,
        })
        .$returningId();
      return result[0].id;
    },
    async deleteDepartment(id: string) {
      return db.delete(department).where(eq(department.id, id));
    },
    async updateDepartment(
      id: string,
      data: Partial<{
        name?: string;
      }>,
    ) {
      return db.update(department).set(data).where(eq(department.id, id));
    },
  };
}
