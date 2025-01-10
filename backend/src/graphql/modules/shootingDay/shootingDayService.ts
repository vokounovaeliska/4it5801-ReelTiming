import { Db } from '@backend/types/types';

import { getShootingDayRepository } from './shootingDayRepository';
import { ShootingDay, ShootingDayInput } from './shootingDayType';

export class ShootingDayService {
  private shootingDayRepository: ReturnType<typeof getShootingDayRepository>;

  constructor(db: Db) {
    this.shootingDayRepository = getShootingDayRepository(db);
  }

  async getAllShootingDays(projectId: string): Promise<ShootingDay[]> {
    const records =
      await this.shootingDayRepository.getAllShootingDaysByProjectId(projectId);
    return records;
  }

  async getShootingDayById(id: string | null): Promise<ShootingDay | null> {
    if (!id) {
      return null;
    }
    return (await this.shootingDayRepository.getShootingDayById(id)) ?? null;
  }

  async createShootingDay(data: ShootingDayInput): Promise<ShootingDay> {
    const shootingDayId = await this.shootingDayRepository.createShootingDay({
      shootingDayNumber: data.shooting_day_number,
      date: data.date,
      projectId: data.project_id,
      eventType: data.event_type,
    });
    const record = await this.getShootingDayById(shootingDayId);
    if (!record) {
      throw new Error('ShootingDay not found after creation');
    }
    return record;
  }

  async updateShootingDay(
    id: string,
    data: ShootingDayInput,
  ): Promise<ShootingDay | null> {
    const updateData = {
      ...data,
      shootingDayNumber: data.shooting_day_number,
      date: data.date,
      eventType: data.event_type ?? undefined,
      projctId: data.project_id,
    };
    await this.shootingDayRepository.updateShootingDay(id, updateData);
    return this.getShootingDayById(id);
  }

  async deleteShootingDay(id: string): Promise<boolean> {
    await this.shootingDayRepository.deleteShootingDay(id);
    return true;
  }
}
