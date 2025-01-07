import { eq } from 'drizzle-orm';

import { shift_overview } from '@backend/db/schema';
import { type Db } from '@backend/types/types';
import { Crew } from './shiftOverviewType';

export function getShiftOveviewRepository(db: Db) {
  return {
    async getAllShiftOveviewByProjectId(projectId: string) {
      return db
        .select()
        .from(shift_overview)
        .where(eq(shift_overview.project_id, projectId))
        .orderBy(shift_overview.date);
    },
    async getShiftOveviewById(id: string) {
      const record = await db
        .select()
        .from(shift_overview)
        .where(eq(shift_overview.id, id));
      return record.length > 0 ? record[0] : null;
    },
    async createShiftOveview(data: {
      date: Date;
      projectId: string;
      crewWorking: Crew[];
    }) {
      const result = await db
        .insert(shift_overview)
        .values({
          date: data.date,
          project_id: data.projectId,
          crew_working: data.crewWorking,
        })
        .$returningId();
      return result[0].id;
    },
    async updateShiftOveview(
      id: string,
      data: Partial<{
        date: Date;
        projectId: string;
        crewWorking: Crew[];
      }>,
    ) {
      return db
        .update(shift_overview)
        .set(data)
        .where(eq(shift_overview.id, id));
    },
    async deleteShiftOverview(id: string) {
      return db.delete(shift_overview).where(eq(shift_overview.id, id));
    },
  };
}
