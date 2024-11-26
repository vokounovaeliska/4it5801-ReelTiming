import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { z } from 'zod';

import { CustomContext } from '../../../types/types';
import { ProjectUserService } from '../projectUser/projectUserService';
import { ProjectUser } from '../projectUser/projectUserType';
import { Car, CarInput } from './carType';
import { CarService } from './carService';

const carInputSchema = z.object({
  project_user_id: z.string().uuid(),
  name: z.string().min(1),
  kilometer_allow: z.number().nonnegative(),
  kilometer_rate: z.number().nonnegative(),
});

const deleteCarSchema = z.object({
  id: z.string().uuid(),
});

@Resolver(() => Car)
export class CarResolver {
  @Query(() => [Car])
  async cars(@Ctx() { db }: CustomContext): Promise<Car[]> {
    const carService = new CarService(db);
    return carService.getAllCars();
  }

  @FieldResolver(() => ProjectUser)
  async projectUser(
    @Root() car: Car,
    @Ctx() { db }: CustomContext,
  ): Promise<ProjectUser | null> {
    const projectUserService = new ProjectUserService(db);
    return projectUserService.getProjectUserById(car.project_user_id!);
  }

  @Query(() => Car, { nullable: true })
  async car(
    @Arg('id') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<Car | null> {
    const carService = new CarService(db);
    return carService.getCarById(id);
  }

  @Query(() => [Car])
  async carsByProjectUserId(
    @Arg('projectUserId') projectUserId: string,
    @Ctx() { db }: CustomContext,
  ): Promise<Car[]> {
    const carService = new CarService(db);
    return carService.getCarsByProjectUserId(projectUserId);
  }

  @Mutation(() => Car)
  async addCar(
    @Arg('project_user_id') project_user_id: string,
    @Arg('name') name: string,
    @Arg('kilometer_allow')
    kilometer_allow: number,
    @Arg('kilometer_rate')
    kilometer_rate: number,
    @Ctx() { db }: CustomContext,
  ): Promise<Car> {
    const data: CarInput = {
      project_user_id,
      name: name,
      kilometer_allow: kilometer_allow,
      kilometer_rate: kilometer_rate,
    };

    const validatedData = carInputSchema.parse(data);
    const carService = new CarService(db);
    return carService.createCar(validatedData);
  }

  @Mutation(() => Car)
  async updateCar(
    @Arg('id') id: string,
    @Arg('data') data: CarInput,
    @Ctx() { db }: CustomContext,
  ): Promise<Car | null> {
    const validatedData = carInputSchema.parse(data);
    const carService = new CarService(db);
    return carService.updateCar(id, validatedData);
  }

  @Mutation(() => Boolean)
  async deleteCar(
    @Arg('id') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    const validatedData = deleteCarSchema.parse({ id });
    const carService = new CarService(db);
    return carService.deleteCarById(validatedData.id);
  }
}
