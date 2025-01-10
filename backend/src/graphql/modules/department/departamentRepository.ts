import { desc, eq, and, asc } from 'drizzle-orm';

import { department } from '@backend/db/schema';
import { type Db } from '@backend/types/types';

export function getDepartmentRepository(db: Db) {
  return {
    async getAllDepartmentsByProject(project_id: string) {
      return db
        .select()
        .from(department)
        .where(eq(department.project_id, project_id))
        .orderBy(asc(department.order_index), desc(department.name));
    },
    async getDepartmentById(id: string) {
      return db.select().from(department).where(eq(department.id, id));
    },
    async geDepartmentByNameAndProject(name: string, project_id: string) {
      return db
        .select()
        .from(department)
        .where(
          and(eq(department.name, name), eq(department.project_id, project_id)),
        );
    },
    async createDepartment(data: {
      name: string;
      project_id: string;
      order_index?: number;
      is_visible?: boolean;
    }) {
      const [maxOrderIndex] = await db
        .select()
        .from(department)
        .where(eq(department.project_id, data.project_id))
        .orderBy(desc(department.order_index))
        .limit(1);

      const newOrderIndex = maxOrderIndex
        ? (maxOrderIndex.order_index ?? 0) + 1
        : 1;

      const result = await db
        .insert(department)
        .values({
          name: data.name,
          project_id: data.project_id,
          order_index: newOrderIndex,
          is_visible: data.is_visible,
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
        project_id?: string | null;
        order_index?: number;
        is_visible?: boolean;
      }>,
    ) {
      console.log('...');
      console.log(data);
      return db.update(department).set(data).where(eq(department.id, id));
    },
  };
}
