import { and, eq } from 'drizzle-orm';
import { GraphQLError } from 'graphql/error';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import { project, project_user, user } from '@backend/db/schema';
import { type CustomContext } from '@backend/types/types';

import { ProjectUser, ProjectUserInput } from './projectUserType';

@Resolver(() => ProjectUser)
export class ProjectUserResolver {
  @Query(() => ProjectUser, { nullable: true })
  async projectUser(
    @Arg('id') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<ProjectUser | null> {
    const projectUserRecord = await db
      .select()
      .from(project_user)
      .where(eq(project_user.id, id));

    if (projectUserRecord.length === 0) {
      return null;
    }

    return projectUserRecord[0];
  }

  @Query(() => [ProjectUser])
  async project_users(@Ctx() { db }: CustomContext): Promise<ProjectUser[]> {
    const projects = await db
      .select()
      .from(project_user)
      .orderBy(project_user.create_date);

    return projects.map((proj_user) => ({
      ...proj_user,
      create_date: new Date(proj_user.create_date),
      is_active: !!proj_user.is_active,
    }));
  }

  @Mutation(() => ProjectUser)
  async addProjectUser(
    @Arg('projectId') projectId: string,
    @Arg('userId') userId: string,
    @Arg('isTeamLeader', { nullable: true, defaultValue: false })
    isTeamLeader: boolean,
    @Arg('rateId', () => String, { nullable: true, defaultValue: null })
    rateId: string,
    @Ctx() { db }: CustomContext,
  ): Promise<ProjectUser> {
    // check project
    const projectObject = await db
      .select()
      .from(project)
      .where(eq(project.id, projectId));

    if (projectObject.length === 0) {
      throw new GraphQLError('Project not found');
    }

    // check user
    const userObject = await db.select().from(user).where(eq(user.id, userId));

    if (userObject.length === 0) {
      throw new GraphQLError('Project not found');
    }

    // check if the user is already assigned to project
    const projectUserObject = await db
      .select()
      .from(project_user)
      .where(
        and(
          eq(project_user.user_id, userId),
          eq(project_user.project_id, projectId),
        ),
      );

    if (projectUserObject.length !== 0) {
      throw new GraphQLError('User already assigned to project');
    }

    const createdAt: Date = new Date();

    const newProjectUser = await db
      .insert(project_user)
      .values({
        project_id: projectId,
        user_id: userId,
        is_team_leader: isTeamLeader,
        rate_id: rateId,
        create_date: createdAt,
        create_user_id: 'user-id', // Replace with actual user ID
        last_update_user_id: 'user-id', // Replace with actual user ID
        last_update_date: createdAt,
      })
      .$returningId();

    const id = newProjectUser[0].id;
    const result = await db
      .select()
      .from(project_user)
      .where(eq(project_user.id, id));

    if (result.length === 0) {
      throw new GraphQLError('ProjectUser not found');
    }

    const projUser = result[0];

    return {
      ...projUser,
      create_date: new Date(projUser.create_date),
      is_active: !!projUser.is_active,
    } as ProjectUser;
  }

  @Mutation(() => Boolean)
  async deleteProjectUser(
    @Arg('projectUserId') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    await db.delete(project_user).where(eq(project_user.id, id));
    return true;
  }

  @Mutation(() => ProjectUser)
  async updateProjectUser(
    @Arg('projectUserId') id: string,
    @Arg('data') data: ProjectUserInput,
    @Ctx() { db }: CustomContext,
  ): Promise<ProjectUser | null> {
    const projectUserObject = await db
      .select()
      .from(project_user)
      .where(eq(project_user.id, id));

    if (projectUserObject.length === 0) {
      return null;
    }

    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined),
    );
    const is_active: boolean = cleanData.is_active
      ? cleanData.is_active
      : projectUserObject[0].is_active;

    const updatedProjectUser = {
      ...projectUserObject[0],
      ...cleanData,
      last_update_date: new Date(),
      is_active,
    };

    await db
      .update(project_user)
      .set(updatedProjectUser)
      .where(eq(project_user.id, id));

    return updatedProjectUser;
  }
}
