import { eq } from 'drizzle-orm';
import { report } from '@backend/db/schema';
import { type Db } from '@backend/types/types';

export function getReportRepository(db: Db) {
  return {
    async getAllReports() {
      return db.select().from(report).orderBy(report.create_date);
    },
    async getReportById(id: string) {
      const reportRecord = await db
        .select()
        .from(report)
        .where(eq(report.id, id));
      return reportRecord.length > 0 ? reportRecord[0] : null;
    },
    async getReportsByProjectUserId(projectUserId: string) {
      const reportsByProjectUser = await db
        .select()
        .from(report)
        .where(eq(report.project_user_id, projectUserId));
      return reportsByProjectUser;
    },
    async getReportsByProjectId(projectId: string) {
      const reportsByProject = await db
        .select()
        .from(report)
        .where(eq(report.project_id, projectId));
      return reportsByProject;
    },
    async getReportsByCreateUserId(userId: string) {
      const statementsRecords = await db
        .select()
        .from(report)
        .where(eq(report.create_user_id, userId));
      return statementsRecords;
    },
    async createReport(data: {
      name: string;
      path: string;
      project_user_id: string | null;
      project_id: string | null;
      start_date: Date;
      end_date: Date;
      create_date: Date;
      create_user_id: string;
    }) {
      const result = await db.insert(report).values(data).$returningId();
      return result[0].id;
    },
    async deleteReport(id: string) {
      return db.delete(report).where(eq(report.id, id));
    },
  };
}
