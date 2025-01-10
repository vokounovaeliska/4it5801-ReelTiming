import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import { CustomContext } from '@backend/types/types';

import { User } from '../user/userType';

import { Department } from './departmentType';
import { DepartmentService } from './departmentService';
import { z } from 'zod';

const departmentInputSchema = z.object({
  name: z.string().min(1),
});

const deleteDepartmentSchema = z.object({
  departmentId: z.string().uuid(),
});

@Resolver(() => User)
export class DepartmentResolver {
  @Query(() => [Department])
  async departments(@Ctx() { db }: CustomContext): Promise<Department[]> {
    const departmentService = new DepartmentService(db);
    return departmentService.getAllDepartments();
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
    @Ctx() { db }: CustomContext,
  ): Promise<Department | null> {
    const validatedData = departmentInputSchema.parse({ name });
    const departmentService = new DepartmentService(db);
    return departmentService.createDepartment(validatedData.name);
  }

  @Mutation(() => Department)
  async updateDepartment(
    @Arg('departmentId') id: string,
    @Arg('name') name: string,
    @Ctx() { db }: CustomContext,
  ): Promise<Department | null> {
    const validatedData = departmentInputSchema.parse({ name });
    const departmentService = new DepartmentService(db);
    return departmentService.updateDepartment(id, validatedData.name);
  }
}
