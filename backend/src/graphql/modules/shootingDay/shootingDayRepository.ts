import { eq } from 'drizzle-orm';

import { shooting_day } from '@backend/db/schema';
import { type Db } from '@backend/types/types';

export function getShootingDayRepository(db: Db) {
  return {
    async getAllShootingDaysByProjectId(projectId: string) {
      return db
        .select()
        .from(shooting_day)
        .where(eq(shooting_day.project_id, projectId))
        .orderBy(shooting_day.date);
    },
    async getShootingDayById(id: string) {
      const record = await db
        .select()
        .from(shooting_day)
        .where(eq(shooting_day.id, id));
      return record.length > 0 ? record[0] : null;
    },
    async createShootingDay(data: {
      shootingDayNumber: number;
      date: Date;
      projectId: string;
      eventType?: string | null;
    }) {
      const result = await db
        .insert(shooting_day)
        .values({
          shooting_day_number: data.shootingDayNumber,
          date: data.date,
          project_id: data.projectId,
          event_type: data.eventType,
        })
        .$returningId();
      return result[0].id;
    },
    async updateShootingDay(
      id: string,
      data: Partial<{
        shootingDayNumber: number;
        date: Date;
        projectId: string;
        eventType?: string | null;
      }>,
    ) {
      return db.update(shooting_day).set(data).where(eq(shooting_day.id, id));
    },
    async deleteShootingDay(id: string) {
      return db.delete(shooting_day).where(eq(shooting_day.id, id));
    },
  };
}
