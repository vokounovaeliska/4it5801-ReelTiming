import { eq } from 'drizzle-orm';

import { user } from '@backend/db/schema';
import { type Db } from '@backend/types/types';

export function getUserRepository(db: Db) {
  return {
    async getAllUsers() {
      return db.select().from(user).orderBy(user.create_date);
    },
    async getUserById(id: string) {
      return db.select().from(user).where(eq(user.id, id));
    },
    async getUserByEmail(email: string) {
      return db.select().from(user).where(eq(user.email, email));
    },
    async createUser(data: {
      email: string;
      password: string;
      name: string;
      surname: string;
      create_date: Date;
      create_user_id: string;
      last_update_date: Date;
      last_update_user_id: string;
      is_active: boolean;
    }) {
      const result = await db
        .insert(user)
        .values({
          email: data.email,
          password: data.password,
          name: data.name,
          surname: data.surname,
          create_date: data.create_date,
          create_user_id: data.create_user_id,
          last_update_date: data.last_update_date,
          last_update_user_id: data.last_update_user_id,
          is_active: data.is_active,
        })
        .$returningId();
      return result[0].id;
    },
    async deleteUser(id: string) {
      return db.delete(user).where(eq(user.id, id));
    },
    async updateUser(
      id: string,
      data: Partial<{
        name?: string;
        email?: string;
        password?: string;
        surname?: string;
        create_date?: Date;
        create_user_id?: string;
        last_update_date?: Date;
        last_update_user_id?: string;
        is_active?: boolean;
        password_reset_token?: string | null;
        password_reset_expiration_time?: Date | null;
      }>,
    ) {
      return db.update(user).set(data).where(eq(user.id, id));
    },
  };
}
