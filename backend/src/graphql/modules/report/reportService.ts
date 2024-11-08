import { Db } from '@backend/types/types';

import { getReportRepository } from './reportRepository';
import { Report, ReportInput } from './reportType';

export class ReportService {
  private reportRepository: ReturnType<typeof getReportRepository>;

  constructor(db: Db) {
    this.reportRepository = getReportRepository(db);
  }

  async getAllReports(): Promise<Report[]> {
    const reports = await this.reportRepository.getAllReports();
    return reports;
  }

  async getReportById(id: string): Promise<Report | null> {
    const reportRecord = await this.reportRepository.getReportById(id);
    if (!reportRecord) {
      return null;
    }
    return reportRecord;
  }

  async getReportsByProjectUserId(projectUserId: string) {
    return this.reportRepository.getReportsByProjectUserId(projectUserId);
  }

  async getReportsByProjectId(projectId: string) {
    const reportRecords =
      await this.reportRepository.getReportsByProjectId(projectId);
    return reportRecords;
  }

  async getReportsByCreateUserId(userId: string) {
    const reportRecords =
      await this.reportRepository.getReportsByCreateUserId(userId);
    return reportRecords;
  }

  async createReport(data: ReportInput): Promise<Report> {
    const createdAt = new Date();
    const reportId = await this.reportRepository.createReport({
      ...data,
      create_date: createdAt,
      project_user_id: data.project_user_id ?? null,
      project_id: data.project_id ?? null,
    });
    const report = await this.getReportById(reportId);
    if (!report) {
      throw new Error('Failed to create report');
    }
    return report;
  }

  async deleteReportById(id: string): Promise<boolean> {
    const report = await this.getReportById(id);
    if (!report) {
      throw new Error('Report not found');
    }
    await this.reportRepository.deleteReport(report.id);
    return true;
  }
}
