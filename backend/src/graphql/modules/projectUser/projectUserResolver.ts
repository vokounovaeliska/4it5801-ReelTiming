import { eq } from 'drizzle-orm';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { ProjectUser } from './projectUserType';
import { type CustomContext } from '@backend/types/types';
import { project_user, project, user } from '@backend/db/schema';
import { GraphQLError } from 'graphql/error';

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
}
