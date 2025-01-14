import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';

import { CustomContext } from '@backend/types/types';

import { Department, DepartmentInput } from './departmentType';
import { DepartmentService } from './departmentService';
import { z } from 'zod';
import { ProjectService } from '../project/projectService';
import { Project } from '../project/projectType';

const departmentInputSchema = z.object({
  name: z.string().min(1),
  project_id: z.string(),
  order_index: z.number().optional(),
  is_visible: z.boolean().optional(),
});

const deleteDepartmentSchema = z.object({
  departmentId: z.string().uuid(),
});

@Resolver(() => Department)
export class DepartmentResolver {
  @Query(() => [Department])
  async departments(
    @Arg('projectId') projectId: string,
    @Ctx() { db }: CustomContext,
  ): Promise<Department[]> {
    const departmentService = new DepartmentService(db);
    return departmentService.getAllDepartmentsByProject(projectId);
  }

  @FieldResolver(() => Project, { nullable: true })
  async project(
    @Root() department: Department,
    @Ctx() { db }: CustomContext,
  ): Promise<Project | null> {
    if (department.project_id) {
      const projectService = new ProjectService(db);
      return projectService.getProjectById(department.project_id);
    }
    return null;
  }

  @Query(() => Department, { nullable: true })
  async department(
    @Arg('id') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<Department | null> {
    const departmentService = new DepartmentService(db);
    return departmentService.getDepartmentById(id);
  }

  @Mutation(() => Boolean)
  async deleteDepartment(
    @Arg('departmentId') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    const validatedData = deleteDepartmentSchema.parse({ departmentId: id });
    const departmentService = new DepartmentService(db);
    return departmentService.deleteDepartment(validatedData.departmentId);
  }

  @Mutation(() => Department)
  async addDepartment(
    @Arg('name') name: string,
    @Arg('projectId', { nullable: true })
    projectId: string,
    @Arg('orderIndex', { nullable: true })
    orderIndex: number,
    @Arg('isVisible', { nullable: true })
    isVisible: boolean,

    @Ctx() { db }: CustomContext,
  ): Promise<Department | null> {
    const validatedData = departmentInputSchema.parse({
      name,
      project_id: projectId,
      order_index: orderIndex,
      is_visible: isVisible,
    });

    const departmentService = new DepartmentService(db);
    return departmentService.createDepartment(
      validatedData.name,
      validatedData.project_id ?? undefined,
      validatedData.order_index,
      validatedData.is_visible,
    );
  }

  @Mutation(() => Department)
  async updateDepartment(
    @Arg('departmentId') id: string,
    @Arg('data') data: DepartmentInput,
    @Ctx() { db }: CustomContext,
  ): Promise<Department | null> {
    const validatedData = departmentInputSchema.parse({
      ...data,
      projectId: data.project_id,
      isVisible: data.is_visible,
      orderIndex: data.order_index,
    });
    const departmentService = new DepartmentService(db);
    return departmentService.updateDepartment(id, {
      ...validatedData,
    });
  }
}
