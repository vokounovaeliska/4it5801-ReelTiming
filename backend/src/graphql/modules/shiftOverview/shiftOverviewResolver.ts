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
  CrewInput,
  ShiftOverview,
  ShiftOverviewInput,
} from './shiftOverviewType';
import { ShiftOverviewService } from './shiftOverviewService';

const JsonItemSchema = z.object({
  id: z.string().min(1),
});

const JsonArraySchema = z.array(JsonItemSchema);

const ShiftOverviewInputSchema = z.object({
  date: z.date(),
  project_id: z.string().min(1),
  crew_working: JsonArraySchema,
});

const deleteShiftOverviewISchema = z.object({
  id: z.string().uuid().min(1),
});

@Resolver(() => ShiftOverview)
export class ShiftOverviewResolver {
  @Query(() => [ShiftOverview])
  async shiftOverviewsByProjectId(
    @Arg('projectId') projectId: string,
    @Ctx() { db }: CustomContext,
  ): Promise<ShiftOverview[]> {
    const shiftOverviewService = new ShiftOverviewService(db);
    return shiftOverviewService.getAllShiftOverviewByProjectId(projectId);
  }

  @Query(() => ShiftOverview, { nullable: true })
  async shiftOverview(
    @Arg('id') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<ShiftOverview | null> {
    const shiftOverviewService = new ShiftOverviewService(db);
    return shiftOverviewService.getShiftOverviewById(id);
  }
  @Mutation(() => ShiftOverview)
  async addShiftOverview(
    @Arg('date') date: Date,
    @Arg('projectId') project_id: string,
    @Arg('crew_working', () => [CrewInput]) crew_working: CrewInput[],
    @Ctx() { db }: CustomContext,
  ): Promise<ShiftOverview> {
    const validatedData = ShiftOverviewInputSchema.parse({
      date,
      project_id,
      crew_working,
    });

    const shiftOverviewService = new ShiftOverviewService(db);
    return await shiftOverviewService.createShiftOverview(validatedData);
  }

  @Mutation(() => Boolean)
  async deleteShiftOverview(
    @Arg('shiftOverviewId') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    const validatedData = deleteShiftOverviewISchema.parse({ id });
    const shiftOverviewService = new ShiftOverviewService(db);
    return shiftOverviewService.deleteShiftOverview(validatedData.id);
  }

  @Mutation(() => ShiftOverview)
  async updateShiftOverview(
    @Arg('shiftOverviewId') id: string,
    @Arg('data') data: ShiftOverviewInput,
    @Ctx() { db }: CustomContext,
  ): Promise<ShiftOverview | null> {
    const validatedData = ShiftOverviewInputSchema.parse(data);
    const shiftOverviewService = new ShiftOverviewService(db);
    return shiftOverviewService.updateShiftOverview(id, validatedData);
  }

  @FieldResolver(() => Project, { nullable: true })
  async project(
    @Root() shiftOverview: ShiftOverview,
    @Ctx() { db }: CustomContext,
  ): Promise<Project | null> {
    if (shiftOverview.project_id) {
      const projectService = new ProjectService(db);
      return projectService.getProjectById(shiftOverview.project_id);
    }
    return null;
  }

  @Mutation(() => Boolean)
  async notifyUser(
    @Arg('projectName') projectName: string,
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('message') message: string,
    @Arg('dates') dates: string,
    @Arg('link') link: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean | null> {
    if (email && dates.length > 0) {
      const shiftOverviewService = new ShiftOverviewService(db);
      return shiftOverviewService.notifyUser(
        projectName,
        name,
        email,
        message,
        dates,
        link,
      );
    }
    return false;
  }
}
