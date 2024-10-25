import { eq } from 'drizzle-orm';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

import { department } from '@backend/db/schema';
import { CustomContext } from '@backend/types/types';

import { User } from '../user/userType';

import { Department, DepartmentInput } from './departmentType';

@Resolver(() => User)
export class DepartmentResolver {
  @Query(() => [Department])
  async departments(@Ctx() { db }: CustomContext): Promise<Department[]> {
    const departments = await db
      .select()
      .from(department)
      .orderBy(department.name);

    return departments;
  }

  @Query(() => Department, { nullable: true })
  async department(
    @Arg('id') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<Department | null> {
    const departmentRecord = await db
      .select()
      .from(department)
      .where(eq(department.id, id));

    if (departmentRecord.length === 0) {
      return null;
    }

    return departmentRecord[0];
  }

  @Mutation(() => Boolean)
  async deleteDepartment(
    @Arg('department') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    await db.delete(department).where(eq(department.id, id));
    return true;
  }

  @Mutation(() => Department)
  async updateDepartment(
    @Arg('department') id: string,
    @Arg('data') data: DepartmentInput,
    @Ctx() { db }: CustomContext,
  ): Promise<Department | null> {
    const departmentObject = await db
      .select()
      .from(department)
      .where(eq(department.id, id));

    if (departmentObject.length === 0) {
      return null;
    }

    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined),
    );

    const updatedDepartment = {
      ...departmentObject[0],
      ...cleanData,
    };

    await db
      .update(department)
      .set(updatedDepartment)
      .where(eq(department.id, id));

    return updatedDepartment;
  }
}
