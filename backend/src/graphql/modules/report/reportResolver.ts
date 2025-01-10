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
import { ProjectUser } from '../projectUser/projectUserType';
import { ProjectUserService } from '../projectUser/projectUserService';
import { Report, ReportInput } from './reportType';
import { ReportService } from './reportService';
import { Project } from '../project/projectType';
import { ProjectService } from '../project/projectService';
import { UserService } from '../user/userService';
import { User } from '../user/userType';
import { z } from 'zod';

const reportInputSchema = z.object({
  project_user_id: z.string().uuid().optional(),
  project_id: z.string().uuid().optional(),
  start_date: z.date(),
  end_date: z.date(),
  name: z.string().min(1),
  path: z.string().min(1),
  create_user_id: z.string().uuid(),
});

const deleteReportSchema = z.object({
  id: z.string().uuid(),
});

@Resolver(() => Report)
export class ReportResolver {
  //TODO checks if it works with the !
  @FieldResolver(() => ProjectUser, { nullable: true })
  async projectUser(
    @Root() report: Report,
    @Ctx() { db }: CustomContext,
  ): Promise<ProjectUser | null> {
    const projectUserService = new ProjectUserService(db);
    return report.project_user_id
      ? projectUserService.getProjectUserById(report.project_user_id)
      : null;
  }

  //TODO checks if it works with the !
  @FieldResolver(() => Project, { nullable: true })
  async project(
    @Root() report: Report,
    @Ctx() { db }: CustomContext,
  ): Promise<Project | null> {
    const projectService = new ProjectService(db);
    return report.project_id
      ? projectService.getProjectById(report.project_id)
      : null;
  }

  @FieldResolver(() => User, { nullable: true })
  async createUser(
    @Root() report: Report,
    @Ctx() { db }: CustomContext,
  ): Promise<User | null> {
    const userService = new UserService(db);
    return report.create_user_id
      ? userService.getUserById(report.create_user_id)
      : null;
  }

  @Query(() => [Report])
  async reports(@Ctx() { db }: CustomContext): Promise<Report[]> {
    const reportService = new ReportService(db);
    return reportService.getAllReports();
  }

  @Query(() => Report, { nullable: true })
  async report(
    @Arg('id') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<Report | null> {
    const reportService = new ReportService(db);
    return reportService.getReportById(id);
  }

  @Mutation(() => Report)
  async addReport(
    @Arg('project_user_id', () => String, {
      nullable: true,
      defaultValue: null,
    })
    project_user_id: string,
    @Arg('project_id', () => String, { nullable: true, defaultValue: null })
    project_id: string,
    @Arg('start_date') start_date: Date,
    @Arg('end_date') end_date: Date,
    @Arg('name') name: string,
    @Arg('path') path: string,
    @Arg('create_user_id') create_user_id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<Report> {
    const data: ReportInput = {
      project_user_id,
      project_id,
      start_date,
      end_date,
      name,
      path,
      create_user_id,
    };
    const validatedData = reportInputSchema.parse(data);
    const reportService = new ReportService(db);
    return reportService.createReport(validatedData);
  }
  @Mutation(() => Boolean)
  async deleteReport(
    @Arg('id') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    const validatedData = deleteReportSchema.parse({ id });
    const reportService = new ReportService(db);
    return reportService.deleteReportById(validatedData.id);
  }
}
