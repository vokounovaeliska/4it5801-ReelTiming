import { and, eq } from 'drizzle-orm';
import {
  car,
  department,
  project,
  project_user,
  user,
} from '@backend/db/schema';
import { type Db } from '@backend/types/types';

export function getProjectUserRepository(db: Db) {
  return {
    async getAllProjectUsers() {
      return db.select().from(project_user).orderBy(project_user.create_date);
    },
    async getProjectUsersByProjectId(projectId: string) {
      return db
        .select()
        .from(project_user)
        .innerJoin(department, eq(department.id, project_user.department_id))
        .where(
          and(
            eq(project_user.project_id, projectId),
            eq(department.is_visible, true),
          ),
        )
        .orderBy(department.order_index);
    },
    async getProjectUserById(id: string) {
      const projectUserRecord = await db
        .select()
        .from(project_user)
        .where(eq(project_user.id, id));
      return projectUserRecord.length > 0 ? projectUserRecord[0] : null;
    },
    async createProjectUser(data: {
      project_id: string;
      user_id?: string | null;
      group_id?: string | null;
      position?: string | null;
      rate_id?: string | null;
      number_of_people?: number | null;
      is_team_leader: boolean;
      create_date: Date;
      last_update_date: Date;
      create_user_id: string;
      last_update_user_id: string;
      is_active: boolean;
      phone_number?: string | null;
      name: string;
      surname: string;
      email: string;
    }) {
      const result = await db.insert(project_user).values(data).$returningId();
      return result[0].id;
    },
    async updateProjectUser(
      id: string,
      data: Partial<{
        group_id?: string | null;
        position?: string | null;
        rate_id?: string | null;
        number_of_people?: number | null;
        is_team_leader?: boolean;
        last_update_date?: Date;
        is_active?: boolean;
        user_id?: string;
        phone_number?: string | null;
        name?: string;
        surname?: string;
        email?: string;
        invitation?: string | null;
      }>,
    ) {
      return db.update(project_user).set(data).where(eq(project_user.id, id));
    },
    async deleteProjectUser(id: string) {
      return db.delete(project_user).where(eq(project_user.id, id));
    },
    async getProjectUserByUserIdAndProjectId(
      userId: string,
      projectId: string,
    ) {
      const projectUserRecord = await db
        .select()
        .from(project_user)
        .where(
          and(
            eq(project_user.user_id, userId),
            eq(project_user.project_id, projectId),
          ),
        );
      return projectUserRecord.length > 0 ? projectUserRecord[0] : null;
    },
    async getProjectsByUserId(userId: string) {
      return db
        .select()
        .from(project)
        .innerJoin(project_user, eq(project.id, project_user.project_id))
        .where(eq(project_user.user_id, userId));
    },
    async getProjectUserByToken(token: string) {
      const projectUserRecord = await db
        .select()
        .from(project_user)
        .where(
          and(
            eq(project_user.invitation, token),
            eq(project_user.is_active, false),
          ),
        );
      return projectUserRecord.length > 0 ? projectUserRecord[0] : null;
    },
    async inviteUserToProject(id: string, token: string) {
      return db
        .update(project_user)
        .set({
          invitation: token,
        })
        .where(and(eq(project_user.id, id)));
    },
    async getProjectUserDetails(userId: string, projectId: string) {
      const projectUserRecord = await db
        .select({
          projectUserId: project_user.id,
          userId: project_user.user_id,
          projectId: project_user.project_id,
          userName: project_user.name,
          userSurname: project_user.surname,
          userEmail: project_user.email,
        })
        .from(project_user)
        .innerJoin(user, eq(project_user.user_id, user.id))
        .where(
          and(
            eq(project_user.user_id, userId),
            eq(project_user.project_id, projectId),
          ),
        );
      return projectUserRecord.length > 0 ? projectUserRecord[0] : null;
    },
    async getCarsByProjectUserId(projectUserId: string) {
      return db
        .select()
        .from(car)
        .where(eq(car.project_user_id, projectUserId));
    },
  };
}
