import { eq } from 'drizzle-orm';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import { project } from '@backend/db/schema';

import { CustomContext } from '../../../types/types';

import { Project } from './projectType';
import { GraphQLError } from 'graphql/error';

@Resolver(() => Project)
export class ProjectResolver {
  @Query(() => [Project])
  async projects(@Ctx() { db }: CustomContext): Promise<Project[]> {
    const projects = await db
      .select()
      .from(project)
      .orderBy(project.create_date);

    return projects.map((proj) => ({
      ...proj,
      create_date: new Date(proj.create_date),
      start_date: proj.start_date ? new Date(proj.start_date) : null,
      end_date: proj.end_date ? new Date(proj.end_date) : null,
      is_active: !!proj.is_active,
    }));
  }

  @Mutation(() => Project)
  async addProject(
    @Arg('name') name: string,
    @Arg('production_company') productionCompany: string,
    @Arg('start_date', { nullable: true }) startDate: Date,
    @Arg('end_date', { nullable: true }) endDate: Date,
    @Ctx() { db }: CustomContext
  ): Promise<Project> {
    const createdAt: Date = new Date();

    const newProject = await db
      .insert(project)
      .values({
        name,
        production_company: productionCompany,
        start_date: startDate,
        end_date: endDate,
        create_date: createdAt,
        create_user_id: 'user-id', // Replace with actual user ID
        last_update_user_id: 'user-id', // Replace with actual user ID
        last_update_date: createdAt,
        is_active: true,
      })
      .$returningId();

    const id = newProject[0].id;
    const result = await db
      .select()
      .from(project)
      .where(eq(project.id, id));

    if (result.length === 0) {
      throw new GraphQLError('Project not found');
    }

    const proj = result[0];

    return {
      ...proj,
      create_date: new Date(proj.create_date),
      start_date: proj.start_date ? new Date(proj.start_date) : null,
      end_date: proj.end_date ? new Date(proj.end_date) : null,
      is_active: !!proj.is_active,
    } as Project;
  }

  @Mutation(() => Boolean)
  async deleteProject(
    @Arg('projectId') projectId: number,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    await db.delete(project).where(eq(project.id, projectId));
    return true;
  }
}
