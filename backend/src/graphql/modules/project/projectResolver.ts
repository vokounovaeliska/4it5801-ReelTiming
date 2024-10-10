import { eq } from 'drizzle-orm';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import { project } from '@backend/db/schema';

import { CustomContext } from '../../../types/types';

import { Project } from './projectType';

@Resolver(() => Project)
export class ProjectResolver {
  @Query(() => [Project])
  async projects(@Ctx() { db }: CustomContext): Promise<Project[]> {
    const projects = await db.select().from(project).orderBy(project.create_date);
    return projects.map((proj) => ({
      ...proj,
      create_date: new Date(proj.create_date),
      start_date: proj.start_date ? new Date(proj.start_date) : null,
      end_date: proj.end_date ? new Date(proj.end_date) : null,
      is_active: !!proj.is_active,
    }));
  }

//   @Mutation(() => Project)
//   async addProject(
//     @Arg('name') name: string,
//     @Arg('production_company', { nullable: true }) productionCompany: string | null,
//     @Arg('start_date', { nullable: true }) startDate: Date | null,
//     @Arg('end_date', { nullable: true }) endDate: Date | null,
//     @Ctx() { db }: CustomContext
//   ): Promise<Project> {
//     const createdAt = new Date();

//     const [newProject] = await db
//       .insert(project)
//       .values({
//         name,
//         production_company: productionCompany,
//         start_date: startDate,
//         end_date: endDate,
//         create_date: createdAt,
//         create_user_id: 'user-id', // Replace with actual user ID
//         last_update_user_id: 'user-id', // Replace with actual user ID
//         last_update_date: createdAt,
//         is_active: true,
//       })
//       .$returning('*'); // Get the inserted row

//     return {
//       ...newProject,
//       create_date: new Date(newProject.create_date),
//       start_date: newProject.start_date ? new Date(newProject.start_date) : null,
//       end_date: newProject.end_date ? new Date(newProject.end_date) : null,
//       is_active: !!newProject.is_active,
//     } as Project;
//   }

  @Mutation(() => Boolean)
  async deleteProject(
    @Arg('projectId') projectId: string,
    @Ctx() { db }: CustomContext
  ): Promise<boolean> {
    await db.delete(project).where(eq(project.id, projectId));
    return true;
  }
}
