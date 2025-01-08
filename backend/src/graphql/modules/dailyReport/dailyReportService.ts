import { Db } from '@backend/types/types';

import { getDailyReportRepository } from './dailyReportRepository';
import { DailyReport, DailyReportInput, ReportItem } from './dailyReportType';

export class DailyReportService {
  private dailyReportRepository: ReturnType<typeof getDailyReportRepository>;

  constructor(db: Db) {
    this.dailyReportRepository = getDailyReportRepository(db);
  }

  async getAllDailyReportsByProjectId(
    projectId: string,
  ): Promise<DailyReport[]> {
    const records =
      await this.dailyReportRepository.getAllDailyReportsByProjectId(projectId);

    return records.map((record) => ({
      ...record,
      intro: record.intro as ReportItem[],
      shooting_progress: record.shooting_progress as ReportItem[],
      footer: record.footer as ReportItem[],
    }));
  }

  async getLastDailyReportByProjectId(
    projectId: string,
  ): Promise<DailyReport | null> {
    const record =
      await this.dailyReportRepository.getLastDailyReportByProjectId(projectId);

    if (!record) return null;
    return {
      ...record,
      intro: record.intro as ReportItem[],
      shooting_progress: record.shooting_progress as ReportItem[],
      footer: record.footer as ReportItem[],
    };
  }

  async getDailyReportById(id: string | null): Promise<DailyReport | null> {
    if (!id) {
      return null;
    }
    const record = await this.dailyReportRepository.getDailyReportById(id);
    return record
      ? {
          ...record,
          intro: record.intro as ReportItem[],
          shooting_progress: record.shooting_progress as ReportItem[],
          footer: record.footer as ReportItem[],
        }
      : null;
  }
  async getDailyReportByShootingDayId(
    shootingId: string,
  ): Promise<DailyReport[] | null> {
    const record =
      await this.dailyReportRepository.getDailyReportByShootingDayId(
        shootingId,
      );

    if (!record) return null;

    const formattedReport = {
      ...record,
      intro: record.intro as ReportItem[],
      shooting_progress: record.shooting_progress as ReportItem[],
      footer: record.footer as ReportItem[],
    };

    return [formattedReport];
  }

  async createDailyReport(data: DailyReportInput): Promise<DailyReport> {
    const dailyReportId = await this.dailyReportRepository.createDailyReport({
      ...data,
      shootingDayId: data.shooting_day_id,
      projectId: data.project_id,
      shootingProgress: data.shooting_progress,
    });
    const record = await this.getDailyReportById(dailyReportId);
    if (!record) {
      throw new Error('DailyReport not found after creation');
    }
    return record;
  }

  async updateDailyReport(
    id: string,
    data: DailyReportInput,
  ): Promise<DailyReport | null> {
    const updateData = {
      ...data,
      shootingDayId: data.shooting_day_id,
      projectId: data.project_id,
      shootingProgress: data.shooting_progress,
    };
    await this.dailyReportRepository.updateDailyReport(id, updateData);
    return this.getDailyReportById(id);
  }

  async deleteDailyReport(id: string): Promise<boolean> {
    await this.dailyReportRepository.deleteDailyReport(id);
    return true;
  }
}
