import { GraphQLError } from 'graphql';

import { Db } from '@backend/types/types';

import { getRateRepository } from './rateRepository';
import { RateInput } from './rateType';

export class RateService {
  constructor(private db: Db) {
    this.rateRepository = getRateRepository(db);
  }

  private rateRepository;

  /**
   * Get all rates in the system
   */
  async getAllRates() {
    const rates = await this.rateRepository.getAllRates();
    return rates.map((rate) => ({
      ...rate,
    }));
  }

  /**
   * Get a rate by ID
   * @param id string - rate id
   */
  async getRateById(id: string) {
    const rate = await this.rateRepository.getRateById(id);
    if (!rate || rate.length === 0) {
      throw new GraphQLError('Rate not found');
    }
    return rate[0];
  }

  /**
   * Create a new rate
   * @param data - object containing rate creation data
   */
  async createRate(data: RateInput) {
    const createdAt = new Date();
    const rateData = {
      standard_rate: data.standard_rate,
      overtime_hour1: data.overtime_hour1,
      overtime_hour2: data.overtime_hour2,
      overtime_hour3: data.overtime_hour3,
      overtime_hour4: data.overtime_hour4,
      compensation_rate: data.compensation_rate,
      create_date: createdAt,
      last_update_date: createdAt,
      is_active: true,
      create_user_id: '',
      last_update_user_id: '',
    };

    const rateId = await this.rateRepository.createRate(rateData);

    const rate = await this.getRateById(rateId);
    if (!rate) {
      throw new Error('Rate not found after creation');
    }
    return rate;
  }

  /**
   * Update rate by ID
   * @param id string - rate id
   * @param data - object containing rate update data
   */

  async updateRate(
    id: string,
    data: {
      standard_rate?: number;
      overtime_hour1?: number;
      overtime_hour2?: number;
      overtime_hour3?: number;
      overtime_hour4?: number;
      compensation_rate?: number;
    },
  ) {
    const rate = await this.getRateById(id);
    const updatedRateData = {
      ...rate,
      ...data,
      standard_rate:
        data.standard_rate !== null ? data.standard_rate : undefined,
      overtime_hour1:
        data.overtime_hour1 !== null ? data.overtime_hour1 : undefined,
      overtime_hour2:
        data.overtime_hour2 !== null ? data.overtime_hour2 : undefined,
      overtime_hour3:
        data.overtime_hour3 !== null ? data.overtime_hour3 : undefined,
      overtime_hour4:
        data.overtime_hour4 !== null ? data.overtime_hour4 : undefined,
      compensation_rate:
        data.compensation_rate !== null ? data.compensation_rate : undefined,
    };

    await this.rateRepository.updateRate(id, updatedRateData);
    return updatedRateData;
  }

  /**
   * Delete a rate by ID
   * @param id string - rate id
   */
  async deleteRate(id: string) {
    await this.rateRepository.deleteRate(id);
    return true;
  }
}
