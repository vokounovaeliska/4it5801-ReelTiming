import { eq } from 'drizzle-orm';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import { project } from '@backend/db/schema';

import { CustomContext } from '../../../types/types';

import { Project, ProjectInput } from './projectType';
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

   @Query(() => Project, { nullable: true })
   async project(
      @Arg('id') id: string,
      @Ctx() { db }: CustomContext,
   ): Promise<Project | null> {
      const projectRecord = await db.select().from(project).where(eq(project.id, id));

      if (projectRecord.length === 0) {
         return null;
      }

      return {
         ...projectRecord[0],
         is_active: projectRecord[0].is_active ?? true
      };
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
      @Arg('projectId') id: string,
      @Ctx() { db }: CustomContext,
   ): Promise<boolean> {
      await db.delete(project).where(eq(project.id, id));
      return true;
   }

   @Mutation(() => Project)
   async updateProject(
      @Arg('projectId') id: string,
      @Arg('data') data: ProjectInput,
      @Ctx() { db }: CustomContext
   ): Promise<Project | null> {
      const projectObject = await db
         .select()
         .from(project)
         .where(eq(project.id, id));

      if (projectObject.length === 0) {
         return null;
      }

      const cleanData = Object.fromEntries(
         Object.entries(data).filter(([_, v]) => v !== undefined)
      );
      const is_active: boolean = cleanData.is_active ? cleanData.is_active : projectObject[0].is_active;
      const updatedProject = {
         ...projectObject[0],
         ...cleanData,
         start_date: data.start_date ? new Date(data.start_date) : projectObject[0].start_date,
         end_date: data.end_date ? new Date(data.end_date) : projectObject[0].end_date,
         create_date: data.create_date ? new Date(data.create_date) : projectObject[0].create_date,
         last_update_date: data.last_update_date ? new Date(data.last_update_date) : projectObject[0].last_update_date,
         is_active,
      };

      await db.update(project).set(updatedProject).where(eq(project.id, id));

      return updatedProject;
   }
}
