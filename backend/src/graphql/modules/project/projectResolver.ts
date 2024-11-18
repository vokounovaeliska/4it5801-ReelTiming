import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import { CustomContext } from '../../../types/types';

import { ProjectService } from './projectService';
import { Project, ProjectInput } from './projectType';
import { convertToLocalTime } from '@backend/utils/helpers';

@Resolver(() => Project)
export class ProjectResolver {
  @Query(() => [Project])
  async projects(@Ctx() { db }: CustomContext): Promise<Project[]> {
    const projectService = new ProjectService(db);
    return projectService.getAllProjects();
  }

  @Query(() => Project, { nullable: true })
  async project(
    @Arg('id') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<Project | null> {
    const projectService = new ProjectService(db);
    return projectService.getProjectById(id);
  }

  @Mutation(() => Project)
  async addProject(
    @Arg('name') name: string,
    @Arg('production_company') productionCompany: string,
    @Arg('description', { nullable: true }) description: string,
    @Arg('start_date', { nullable: true }) startDate: Date,
    @Arg('end_date', { nullable: true }) endDate: Date,
    @Ctx() { db }: CustomContext,
  ): Promise<Project> {
    const projectService = new ProjectService(db);
    const data: ProjectInput = {
      name,
      production_company: productionCompany,
      description,
      start_date: convertToLocalTime(startDate),
      end_date: convertToLocalTime(endDate),
    };
    return projectService.createProject(data);
  }

  @Mutation(() => Boolean)
  async deleteProject(
    @Arg('projectId') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    const projectService = new ProjectService(db);
    return projectService.deleteProject(id);
  }

  @Mutation(() => Project)
  async updateProject(
    @Arg('projectId') id: string,
    @Arg('data') data: ProjectInput,
    @Ctx() { db }: CustomContext,
  ): Promise<Project | null> {
    const projectService = new ProjectService(db);
    var convertedData = {
      ...data,
      start_date: data.start_date ? convertToLocalTime(data.start_date) : null,
      end_date: data.end_date ? convertToLocalTime(data.end_date) : null,
    } as ProjectInput;
    return projectService.updateProject(id, convertedData);
  }
}
