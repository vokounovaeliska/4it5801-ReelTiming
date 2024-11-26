import { eq } from 'drizzle-orm';

import { car } from '@backend/db/schema';
import { type Db } from '@backend/types/types';

export function getCarRepository(db: Db) {
  return {
    async getAllCars() {
      return db.select().from(car).orderBy(car.create_date);
    },
    async getCarById(id: string) {
      const carRecord = await db.select().from(car).where(eq(car.id, id));
      return carRecord.length > 0 ? carRecord[0] : null;
    },
    async getCarsByProjectUserId(projectUserId: string) {
      const carsByProjectUser = await db
        .select()
        .from(car)
        .where(eq(car.project_user_id, projectUserId));
      return carsByProjectUser;
    },
    async createCar(data: {
      project_user_id: string;
      name: string;
      kilometer_allow: number;
      kilometer_rate: number;
      create_date: Date;
      last_update_date: Date;
      create_user_id: string;
      last_update_user_id: string;
    }) {
      const result = await db.insert(car).values(data).$returningId();
      return result[0].id;
    },
    async updateCar(
      id: string,
      data: Partial<{
        name: string;
        kilometer_allow: number;
        kilometer_rate: number;
        last_update_date?: Date;
        last_update_user_id?: string;
        project_user_id?: string;
      }>,
    ) {
      return db.update(car).set(data).where(eq(car.id, id));
    },
    async deleteCar(id: string) {
      return db.delete(car).where(eq(car.id, id));
    },
  };
}
