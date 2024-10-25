import { eq } from 'drizzle-orm';

import { rate } from '@backend/db/schema';
import { type Db } from '@backend/types/types';

export function getRateRepository(db: Db) {
  return {
    async getAllRates() {
      return db.select().from(rate).orderBy(rate.create_date);
    },
    async getRateById(id: string) {
      return db.select().from(rate).where(eq(rate.id, id));
    },
    async createRate(data: {
      standard_rate?: number;
      overtime_hour1?: number;
      overtime_hour2?: number;
      overtime_hour3?: number;
      overtime_hour4?: number;
      compensation_rate?: number;
      create_date: Date;
      create_user_id: string;
      last_update_date: Date;
      last_update_user_id: string;
    }) {
      const result = await db
        .insert(rate)
        .values({
          standard_rate: data.standard_rate,
          overtime_hour1: data.overtime_hour1,
          overtime_hour2: data.overtime_hour2,
          overtime_hour3: data.overtime_hour3,
          overtime_hour4: data.overtime_hour4,
          compensation_rate: data.compensation_rate,
          create_date: data.create_date,
          create_user_id: data.create_user_id,
          last_update_date: data.last_update_date,
          last_update_user_id: data.last_update_user_id,
        })
        .$returningId();
      return result[0].id;
    },
    async deleteRate(id: string) {
      return db.delete(rate).where(eq(rate.id, id));
    },
    async updateRate(
      id: string,
      data: Partial<{
        standard_rate?: number;
        overtime_hour1?: number;
        overtime_hour2?: number;
        overtime_hour3?: number;
        overtime_hour4?: number;
        compensation_rate?: number;
        create_date: Date;
        create_user_id: string;
        last_update_date: Date;
        last_update_user_id: string;
      }>,
    ) {
      return db.update(rate).set(data).where(eq(rate.id, id));
    },
  };
}
