import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';

import { CustomContext } from '../../../types/types';

import { ProjectService } from './projectService';
import { Project, ProjectInput } from './projectType';
import { convertToLocalTime } from '@backend/utils/helpers';
import { z } from 'zod';
import { DepartmentService } from '../department/departmentService';
import { Department } from '../department/departmentType';
import { ProjectUser } from '../projectUser/projectUserType';
import { ProjectUserService } from '../projectUser/projectUserService';
import { ShiftOverview } from '../shiftOverview/shiftOverviewType';
import { DailyReportService } from '../dailyReport/dailyReportService';
import { DailyReport } from '../dailyReport/dailyReportType';
import { ShiftOverviewService } from '../shiftOverview/shiftOverviewService';
import { ShootingDayService } from '../shootingDay/shootingDayService';
import { ShootingDay } from '../shootingDay/shootingDayType';

const projectInputSchema = z.object({
  name: z.string().min(1),
  production_company: z.string().min(1),
  description: z.string().optional(),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  currency: z.string().default('CZK'),
  create_user_id: z.string().uuid().optional(),
  last_update_user_id: z.string().uuid().optional(),
  logo: z.string().nullable().optional(),
  is_active: z.boolean().optional(),
});

const deleteProjectSchema = z.object({
  projectId: z.string().uuid(),
});

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
    @Arg('currency', { nullable: true }) currency: string,
    @Arg('create_user_id', { nullable: true }) create_user_id: string,
    @Arg('logo', { nullable: true }) logo: string,
    @Ctx() { db }: CustomContext,
  ): Promise<Project> {
    const validatedData = projectInputSchema.parse({
      name,
      production_company: productionCompany,
      description,
      start_date: startDate,
      end_date: endDate,
      currency,
      create_user_id,
      logo,
    });
    const projectService = new ProjectService(db);
    const project = await projectService.createProject(validatedData);

    const departmentService = new DepartmentService(db);

    const defaultDepartments = [
      { name: 'Production' },
      { name: 'Assistant Director' },
      { name: 'Camera' },
      { name: 'Lights' },
      { name: 'Grip' },
      { name: 'Sound' },
      { name: 'Wardrobe' },
      { name: 'Make-up' },
      { name: 'Art Department' },
      { name: 'SFX' },
      { name: 'Stunts' },
      { name: 'Transport' },
      { name: 'Basecamp' },
      { name: 'Catering' },
      { name: 'Locations' },
      { name: 'Security' },
      { name: 'Talents' },
      { name: 'Extras' },
      { name: 'Others' },
    ];

    for (const department of defaultDepartments) {
      await departmentService.createDepartment(
        department.name,
        project.id,
        defaultDepartments.indexOf(department) + 1,
        true,
      );
    }

    return project;
  }

  @Mutation(() => Boolean)
  async deleteProject(
    @Arg('projectId') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    const validatedData = deleteProjectSchema.parse({ projectId: id });
    const projectService = new ProjectService(db);
    return projectService.deleteProject(validatedData.projectId);
  }

  @Mutation(() => Project)
  async updateProject(
    @Arg('projectId') id: string,
    @Arg('data') data: ProjectInput,
    @Ctx() { db }: CustomContext,
  ): Promise<Project | null> {
    var convertedData = {
      ...data,
      start_date: data.start_date ? convertToLocalTime(data.start_date) : null,
      end_date: data.end_date ? convertToLocalTime(data.end_date) : null,
    } as ProjectInput;
    const validatedData = projectInputSchema.parse(convertedData);
    const projectService = new ProjectService(db);
    return projectService.updateProject(id, validatedData);
  }

  @FieldResolver(() => [Department], { nullable: true })
  async departments(
    @Root() project: Project,
    @Ctx() { db }: CustomContext,
  ): Promise<Department[] | null> {
    if (project.id) {
      const departmentService = new DepartmentService(db);
      return departmentService.getAllDepartmentsByProject(project.id);
    }
    return null;
  }

  @FieldResolver(() => [ProjectUser], { nullable: true })
  async projectUsers(
    @Root() project: Project,
    @Ctx() { db }: CustomContext,
  ): Promise<ProjectUser[] | null> {
    if (project.id) {
      const projectUserService = new ProjectUserService(db);
      return projectUserService.getProjectUsersByProjectId(project.id);
    }
    return null;
  }
  @FieldResolver(() => [ShiftOverview], { nullable: true })
  async shiftsOverview(
    @Root() project: Project,
    @Ctx() { db }: CustomContext,
  ): Promise<ShiftOverview[] | null> {
    if (project.id) {
      const shiftOverviewService = new ShiftOverviewService(db);
      return shiftOverviewService.getAllShiftOverviewByProjectId(project.id);
    }
    return null;
  }
  @FieldResolver(() => [ShootingDay], { nullable: true })
  async shootingDays(
    @Root() project: Project,
    @Ctx() { db }: CustomContext,
  ): Promise<ShootingDay[] | null> {
    if (project.id) {
      const shootingDayService = new ShootingDayService(db);
      return shootingDayService.getAllShootingDays(project.id);
    }
    return null;
  }

  @FieldResolver(() => [DailyReport], { nullable: true })
  async dailyReports(
    @Root() project: Project,
    @Ctx() { db }: CustomContext,
  ): Promise<DailyReport[] | null> {
    if (project.id) {
      const dailyReportsService = new DailyReportService(db);
      return dailyReportsService.getAllDailyReportsByProjectId(project.id);
    }
    return null;
  }
}
