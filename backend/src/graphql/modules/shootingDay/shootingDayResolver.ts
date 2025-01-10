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
import { ShootingDay, ShootingDayInput } from './shootingDayType';
import { ShootingDayService } from './shootingDayService';
import { Project } from '../project/projectType';
import { ProjectService } from '../project/projectService';
import { DailyReport } from '../dailyReport/dailyReportType';
import { DailyReportService } from '../dailyReport/dailyReportService';

const shootingDayInputSchema = z.object({
  shooting_day_number: z.number().nonnegative(),
  date: z.date(),
  project_id: z.string().min(1),
  event_type: z.string().optional().nullable(),
});

const deleteShootingDaySchema = z.object({
  id: z.string().uuid().min(1),
});

@Resolver(() => ShootingDay)
export class ShootingDayResolver {
  @Query(() => [ShootingDay])
  async shootingDaysByProject(
    @Arg('projectId') projectId: string,
    @Ctx() { db }: CustomContext,
  ): Promise<ShootingDay[]> {
    const shootindDayService = new ShootingDayService(db);
    return shootindDayService.getAllShootingDays(projectId);
  }

  @Query(() => ShootingDay, { nullable: true })
  async shootingDay(
    @Arg('id') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<ShootingDay | null> {
    const shootindDayService = new ShootingDayService(db);
    return shootindDayService.getShootingDayById(id);
  }

  @Mutation(() => ShootingDay)
  async addShootingDay(
    @Arg('shootingDayNumber') shooting_day_number: number,
    @Arg('date') date: Date,
    @Arg('projectId') project_id: string,
    @Arg('eventType', { nullable: true }) event_type: string,
    @Ctx() { db }: CustomContext,
  ): Promise<ShootingDay> {
    const validatedData = shootingDayInputSchema.parse({
      shooting_day_number,
      date,
      project_id,
      event_type,
    });
    const shootindDayService = new ShootingDayService(db);
    return await shootindDayService.createShootingDay(validatedData);
  }

  @Mutation(() => Boolean)
  async deleteShootingDay(
    @Arg('shootingDayId') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    const validatedData = deleteShootingDaySchema.parse({ id });
    const shootindDayService = new ShootingDayService(db);
    return shootindDayService.deleteShootingDay(validatedData.id);
  }

  @Mutation(() => ShootingDay)
  async updateShootingDay(
    @Arg('shootingDayId') id: string,
    @Arg('data') data: ShootingDayInput,
    @Ctx() { db }: CustomContext,
  ): Promise<ShootingDay | null> {
    const validatedData = shootingDayInputSchema.parse(data);
    const shootindDayService = new ShootingDayService(db);
    return shootindDayService.updateShootingDay(id, validatedData);
  }

  @FieldResolver(() => Project, { nullable: true })
  async project(
    @Root() shootingDay: ShootingDay,
    @Ctx() { db }: CustomContext,
  ): Promise<Project | null> {
    if (shootingDay.project_id) {
      const projectService = new ProjectService(db);
      return projectService.getProjectById(shootingDay.project_id);
    }
    return null;
  }

  @FieldResolver(() => [DailyReport], { nullable: true })
  async dailyReport(
    @Root() shootingDay: ShootingDay,
    @Ctx() { db }: CustomContext,
  ): Promise<DailyReport[] | null> {
    if (shootingDay.id) {
      const dailyReportsService = new DailyReportService(db);
      return dailyReportsService.getDailyReportByShootingDayId(shootingDay.id);
    }
    return null;
  }
}
