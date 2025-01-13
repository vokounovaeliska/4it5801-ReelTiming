import { eq, and, lte, gte, isNotNull, sql } from 'drizzle-orm';
import { department, project_user, statement } from '@backend/db/schema';
import { type Db } from '@backend/types/types';

export function getStatementRepository(db: Db) {
  return {
    async getAllStatements() {
      return db.select().from(statement).orderBy(statement.create_date);
    },
    async getStatementById(id: string) {
      const statementRecord = await db
        .select()
        .from(statement)
        .where(eq(statement.id, id));
      return statementRecord.length > 0 ? statementRecord[0] : null;
    },
    async getStatementsByProjectUserId(projectUserId: string) {
      const statementsByProjectUser = await db
        .select()
        .from(statement)
        .where(eq(statement.project_user_id, projectUserId));
      return statementsByProjectUser;
    },
    async getStatementsByProjectId(projectId: string) {
      const statementsByProjectUser = await db
        .select()
        .from(statement)
        .innerJoin(project_user, eq(statement.project_user_id, project_user.id))
        .where(eq(project_user.project_id, projectId));
      return statementsByProjectUser;
    },
    async getCarStatementsByProjectId(projectId: string) {
      const statementsByProjectUser = await db
        .select({
          car_id: statement.car_id,
          kilometers: statement.kilometers,
        })
        .from(statement)
        .innerJoin(project_user, eq(statement.project_user_id, project_user.id))
        .where(
          and(
            eq(project_user.project_id, projectId),
            isNotNull(statement.car_id),
          ),
        );
      return statementsByProjectUser;
    },
    async getStatementsByUserId(userId: string) {
      const statementsByProjectUser = await db
        .select()
        .from(statement)
        .innerJoin(project_user, eq(statement.project_user_id, project_user.id))
        .where(eq(project_user.user_id, userId));
      return statementsByProjectUser;
    },
    async getStatementsByDateRangeAndProjectUserId(
      startDate: Date,
      endDate: Date,
      projectUserId: string,
    ) {
      const statementsByProjectUser = await db
        .select()
        .from(statement)
        .innerJoin(project_user, eq(statement.project_user_id, project_user.id))
        .where(
          and(
            eq(statement.project_user_id, projectUserId),
            gte(statement.from, startDate),
            lte(statement.to, endDate),
          ),
        )
        .orderBy(statement.start_date, statement.create_date);
      return statementsByProjectUser;
    },
    async createStatement(data: {
      project_user_id: string;
      start_date: Date;
      from: Date;
      to: Date;
      shift_lenght: number;
      calculated_overtime?: number | null;
      claimed_overtime?: number | null;
      create_date: Date;
      last_update_date: Date;
      create_user_id: string;
      last_update_user_id: string;
      car_id?: string | null;
      kilometers?: number | null;
    }) {
      const result = await db.insert(statement).values(data).$returningId();
      return result[0].id;
    },
    async updateStatement(
      id: string,
      data: Partial<{
        start_date?: Date;
        from?: Date;
        to?: Date;
        shift_lenght?: number;
        calculated_overtime?: number | null;
        claimed_overtime?: number | null;
        last_update_date?: Date;
        last_update_user_id?: string;
        car_id?: string | null;
        kilometers?: number | null;
      }>,
    ) {
      return db.update(statement).set(data).where(eq(statement.id, id));
    },
    async deleteStatement(id: string) {
      return db.delete(statement).where(eq(statement.id, id));
    },

    async getStatementsByProjectIdAndDate(projectId: string, date: Date) {
      const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD

      const statements = await db
        .select()
        .from(statement)
        .innerJoin(project_user, eq(statement.project_user_id, project_user.id))
        .innerJoin(department, eq(department.id, project_user.department_id))
        .where(
          and(
            eq(project_user.project_id, projectId),
            sql`DATE(${statement.start_date}) = ${formattedDate}`,
            eq(department.is_visible, true),
          ),
        )
        .orderBy(
          department.order_index,
          statement.start_date,
          statement.create_date,
        );

      return statements;
    },
  };
}
