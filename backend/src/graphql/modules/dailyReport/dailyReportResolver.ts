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
import { z } from 'zod';
import { Project } from '../project/projectType';
import { ProjectService } from '../project/projectService';
import {
  DailyReport,
  DailyReportInput,
  ReportItemInput,
} from './dailyReportType';
import { DailyReportService } from './dailyReportService';
import { ShootingDay } from '../shootingDay/shootingDayType';
import { ShootingDayService } from '../shootingDay/shootingDayService';

const JsonItemSchema = z.object({
  title: z.string().min(1),
  value: z.string(),
});

const JsonArraySchema = z.array(JsonItemSchema);

const DailyReportInputSchema = z.object({
  shooting_day_id: z.string().min(1),
  project_id: z.string().min(1),
  intro: JsonArraySchema,
  shooting_progress: JsonArraySchema,
  footer: JsonArraySchema,
});

const deleteDailyReportSchema = z.object({
  id: z.string().uuid().min(1),
});

@Resolver(() => DailyReport)
export class DailyReportResolver {
  @Query(() => [DailyReport])
  async dailyReportsByProjectId(
    @Arg('projectId') projectId: string,
    @Ctx() { db }: CustomContext,
  ): Promise<DailyReport[]> {
    const dailyReportService = new DailyReportService(db);
    return dailyReportService.getAllDailyReportsByProjectId(projectId);
  }

  @Query(() => [DailyReport], { nullable: true })
  async lastDailyReportByProjectId(
    @Arg('projectId') projectId: string,
    @Ctx() { db }: CustomContext,
  ): Promise<DailyReport | null> {
    const dailyReportService = new DailyReportService(db);
    return dailyReportService.getLastDailyReportByProjectId(projectId);
  }

  @Query(() => DailyReport, { nullable: true })
  async dailyReport(
    @Arg('id') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<DailyReport | null> {
    const dailyReportService = new DailyReportService(db);
    return dailyReportService.getDailyReportById(id);
  }
  @Mutation(() => DailyReport)
  async addDailyReport(
    @Arg('shooting_day_id') shooting_day_id: string,
    @Arg('projectId') project_id: string,
    @Arg('intro', () => [ReportItemInput]) intro: ReportItemInput[],
    @Arg('shooting_progress', () => [ReportItemInput])
    shooting_progress: ReportItemInput[],
    @Arg('footer', () => [ReportItemInput]) footer: ReportItemInput[],
    @Ctx() { db }: CustomContext,
  ): Promise<DailyReport> {
    const validatedData = DailyReportInputSchema.parse({
      shooting_day_id,
      project_id,
      intro,
      shooting_progress,
      footer,
    });

    const dailyReportService = new DailyReportService(db);
    return await dailyReportService.createDailyReport(validatedData);
  }

  @Mutation(() => Boolean)
  async deleteDailyReport(
    @Arg('dailyReportId') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    const validatedData = deleteDailyReportSchema.parse({ id });
    const dailyReportService = new DailyReportService(db);
    return dailyReportService.deleteDailyReport(validatedData.id);
  }

  @Mutation(() => DailyReport)
  async updateDailyReport(
    @Arg('dailyReportId') id: string,
    @Arg('data') data: DailyReportInput,
    @Ctx() { db }: CustomContext,
  ): Promise<DailyReport | null> {
    const validatedData = DailyReportInputSchema.parse(data);
    const dailyReportService = new DailyReportService(db);
    return dailyReportService.updateDailyReport(id, validatedData);
  }

  @FieldResolver(() => Project, { nullable: true })
  async project(
    @Root() dailyReport: DailyReport,
    @Ctx() { db }: CustomContext,
  ): Promise<Project | null> {
    if (dailyReport.project_id) {
      const projectService = new ProjectService(db);
      return projectService.getProjectById(dailyReport.project_id);
    }
    return null;
  }

  @FieldResolver(() => ShootingDay, { nullable: true })
  async shootingDay(
    @Root() dailyReport: DailyReport,
    @Ctx() { db }: CustomContext,
  ): Promise<ShootingDay | null> {
    if (dailyReport.shooting_day_id) {
      const shootingDayService = new ShootingDayService(db);
      return shootingDayService.getShootingDayById(dailyReport.shooting_day_id);
    }
    return null;
  }
}
