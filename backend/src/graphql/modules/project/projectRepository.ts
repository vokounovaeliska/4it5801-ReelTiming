import { eq } from 'drizzle-orm';

import { project } from '@backend/db/schema';
import { type Db } from '@backend/types/types';

export function getProjectRepository(db: Db) {
  return {
    async getAllProjects() {
      return db.select().from(project).orderBy(project.create_date);
    },
    async getProjectById(id: string) {
      const projectRecord = await db
        .select()
        .from(project)
        .where(eq(project.id, id));
      return projectRecord.length > 0 ? projectRecord[0] : null;
    },
    async createProject(data: {
      name: string;
      production_company: string;
      description?: string;
      start_date?: Date;
      end_date?: Date;
      create_date: Date;
      last_update_date: Date;
      is_active: boolean;
      create_user_id: string;
      last_update_user_id: string;
      currency: string;
    }) {
      const result = await db
        .insert(project)
        .values({
          name: data.name,
          production_company: data.production_company,
          description: data.description,
          start_date: data.start_date,
          end_date: data.end_date,
          create_date: data.create_date,
          last_update_date: data.last_update_date,
          is_active: data.is_active,
          create_user_id: data.create_user_id,
          last_update_user_id: data.last_update_user_id,
          currency: data.currency,
        })
        .$returningId();
      return result[0].id;
    },
    async updateProject(
      id: string,
      data: Partial<{
        name?: string;
        production_company?: string;
        description?: string;
        start_date?: Date;
        end_date?: Date;
        last_update_date?: Date;
        is_active?: boolean;
        currency?: string;
        last_update_user_id?: string;
      }>,
    ) {
      return db.update(project).set(data).where(eq(project.id, id));
    },
    async deleteProject(id: string) {
      return db.delete(project).where(eq(project.id, id));
    },
  };
}
