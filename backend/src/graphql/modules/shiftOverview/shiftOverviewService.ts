import { Db } from '@backend/types/types';

import { Crew, ShiftOverview, ShiftOverviewInput } from './shiftOverviewType';
import { getShiftOveviewRepository } from './shiftOverviewRepository';
import path from 'path';
import { promises as fs } from 'fs';
import { sendMail } from '@backend/mailer/mailer';
import { APP_LINK } from '@backend/config';

export class ShiftOverviewService {
  private shiftOverviewRepository: ReturnType<typeof getShiftOveviewRepository>;

  constructor(db: Db) {
    this.shiftOverviewRepository = getShiftOveviewRepository(db);
  }

  async getAllShiftOverviewByProjectId(
    projectId: string,
  ): Promise<ShiftOverview[]> {
    const records =
      await this.shiftOverviewRepository.getAllShiftOveviewByProjectId(
        projectId,
      );

    return records.map((record) => ({
      ...record,
      crew_working: record.crew_working as Crew[],
    }));
  }

  async getShiftOverviewById(id: string | null): Promise<ShiftOverview | null> {
    if (!id) {
      return null;
    }
    const record = await this.shiftOverviewRepository.getShiftOveviewById(id);
    return record
      ? {
          ...record,
          crew_working: record.crew_working as Crew[],
        }
      : null;
  }

  async createShiftOverview(data: ShiftOverviewInput): Promise<ShiftOverview> {
    const shiftOverviewId =
      await this.shiftOverviewRepository.createShiftOveview({
        ...data,
        crewWorking: data.crew_working,
        projectId: data.project_id,
      });
    const record = await this.getShiftOverviewById(shiftOverviewId);
    if (!record) {
      throw new Error('ShiftOverview not found after creation');
    }
    return record;
  }

  async updateShiftOverview(
    id: string,
    data: ShiftOverviewInput,
  ): Promise<ShiftOverview | null> {
    const updateData = {
      ...data,
      crewWorking: data.crew_working,
      projectId: data.project_id,
    };
    await this.shiftOverviewRepository.updateShiftOveview(id, updateData);
    return this.getShiftOverviewById(id);
  }

  async deleteShiftOverview(id: string): Promise<boolean> {
    await this.shiftOverviewRepository.deleteShiftOverview(id);
    return true;
  }

  async notifyUser(
    projectName: string,
    name: string,
    email: string,
    message: string,
    dates: string,
    link: string,
  ): Promise<boolean> {
    if (!email) {
      throw new Error('Email not provided');
    }

    try {
      const templatePath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'mailer',
        'shift-report-notification.html',
      );

      let htmlContent = await fs.readFile(templatePath, 'utf-8');
      const reportLink = APP_LINK + link;

      htmlContent = htmlContent.replace('{{message}}', message);
      htmlContent = htmlContent.replace('{{userName}}', name);
      htmlContent = htmlContent.replace('{{dates}}', dates);
      htmlContent = htmlContent.replace('{{reportsLink}}', reportLink);

      await sendMail(email, `${projectName} - shift not reported`, htmlContent);
    } catch (error) {
      console.error('Error sending shift notification email:', error);
      if (error instanceof Error) {
        console.error('Stack trace:', error.stack);
      }
      throw new Error('Failed to send overview notification.');
    }

    return true;
  }
}
