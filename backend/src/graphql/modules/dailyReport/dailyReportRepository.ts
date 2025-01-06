import { eq, desc } from 'drizzle-orm';

import { daily_report } from '@backend/db/schema';
import { type Db } from '@backend/types/types';
import { ReportItem } from './dailyReportType';

export function getDailyReportRepository(db: Db) {
  return {
    async getAllDailyReportsByProjectId(projectId: string) {
      return db
        .select()
        .from(daily_report)
        .where(eq(daily_report.project_id, projectId))
        .orderBy(daily_report.last_update_date);
    },
    async getLastDailyReportByProjectId(projectId: string) {
      const record = await db
        .select()
        .from(daily_report)
        .where(eq(daily_report.project_id, projectId))
        .orderBy(desc(daily_report.last_update_date))
        .limit(1);
      return record.length > 0 ? record[0] : null;
    },
    async getDailyReportById(id: string) {
      const record = await db
        .select()
        .from(daily_report)
        .where(eq(daily_report.id, id));
      return record.length > 0 ? record[0] : null;
    },
    async createDailyReport(data: {
      shootingDayId: string;
      projectId: string;
      intro: ReportItem[];
      shootingProgress: ReportItem[];
      footer: ReportItem[];
    }) {
      const result = await db
        .insert(daily_report)
        .values({
          shooting_day_id: data.shootingDayId,
          project_id: data.projectId,
          intro: data.intro,
          shooting_progress: data.shootingProgress,
          footer: data.footer,
        })
        .$returningId();
      return result[0].id;
    },
    async updateDailyReport(
      id: string,
      data: Partial<{
        shootingDayId: string;
        projectId: string;
        intro: ReportItem[];
        shootingProgress: ReportItem[];
        footer: ReportItem[];
      }>,
    ) {
      return db.update(daily_report).set(data).where(eq(daily_report.id, id));
    },
    async deleteDailyReport(id: string) {
      return db.delete(daily_report).where(eq(daily_report.id, id));
    },
  };
}
