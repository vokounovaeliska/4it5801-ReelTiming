import { and, eq } from 'drizzle-orm';
import { project, project_user } from '@backend/db/schema';
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
        .where(eq(project_user.project_id, projectId));
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
        .where(eq(project_user.invitation, token));
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
  };
}
