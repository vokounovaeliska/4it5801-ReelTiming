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
import { CarStatement, Statement, StatementInput } from './statementType';
import { StatementService } from './statementService';
import { ProjectUser } from '../projectUser/projectUserType';
import { ProjectUserService } from '../projectUser/projectUserService';
import { convertToLocalTime } from '@backend/utils/helpers';
import { z } from 'zod';
import { Car } from '../car/carType';
import { CarService } from '../car/carService';
import { GraphQLError } from 'graphql';

const statementInputSchema = z.object({
  project_user_id: z.string().uuid(),
  start_date: z.date(),
  from: z.date(),
  to: z.date(),
  shift_lenght: z.number().nonnegative(),
  calculated_overtime: z.number().nonnegative().optional(),
  claimed_overtime: z.number().nonnegative().optional(),
  car_id: z.string().nullable(),
  kilometers: z.number().nonnegative().nullable(),
});

const deleteStatementSchema = z.object({
  id: z.string().uuid(),
});

@Resolver(() => Statement)
export class StatementResolver {
  @Query(() => [Statement])
  async statements(@Ctx() { db }: CustomContext): Promise<Statement[]> {
    const statementService = new StatementService(db);
    return statementService.getAllStatements();
  }

  @FieldResolver(() => ProjectUser)
  async projectUser(
    @Root() statement: Statement,
    @Ctx() { db }: CustomContext,
  ): Promise<ProjectUser | null> {
    const projectUserService = new ProjectUserService(db);
    return projectUserService.getProjectUserById(statement.project_user_id);
  }

  @FieldResolver(() => Car, { nullable: true })
  async car(
    @Root() statement: Statement,
    @Ctx() { db }: CustomContext,
  ): Promise<Car | null> {
    const carService = new CarService(db);
    try {
      return await carService.getCarById(statement.car_id!);
    } catch (error) {
      if (error instanceof GraphQLError && error.message === 'Car not found') {
        return null;
      }
      throw error;
    }
  }

  @Query(() => Statement, { nullable: true })
  async statement(
    @Arg('id') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<Statement | null> {
    const statementService = new StatementService(db);
    return statementService.getStatementById(id);
  }

  @Query(() => [Statement])
  async statementsByProjectUserId(
    @Arg('projectUserId') projectUserId: string,
    @Ctx() { db }: CustomContext,
  ): Promise<Statement[]> {
    const statementService = new StatementService(db);
    return statementService.getStatementsByProjectUserId(projectUserId);
  }

  @Query(() => [Statement])
  async statementsByProjectId(
    @Arg('projectId') projectId: string,
    @Ctx() { db }: CustomContext,
  ): Promise<Statement[]> {
    const statementService = new StatementService(db);
    return statementService.getStatementsByProjectId(projectId);
  }

  @Query(() => [CarStatement])
  async carStatementsByProjectId(
    @Arg('projectId') projectId: string,
    @Ctx() { db }: CustomContext,
  ): Promise<CarStatement[]> {
    const statementService = new StatementService(db);
    return statementService.getCarStatementsByProjectId(projectId);
  }

  @Query(() => [Statement])
  async statementsByUserId(
    @Arg('userId') userId: string,
    @Ctx() { db }: CustomContext,
  ): Promise<Statement[]> {
    const statementService = new StatementService(db);
    return statementService.getStatementsByUserId(userId);
  }

  @Query(() => [Statement])
  async getStatementsByDateRangeAndProjectUserId(
    @Arg('startDate') startDate: Date,
    @Arg('endDate') endDate: Date,
    @Arg('projectUserId') projectUserId: string,
    @Ctx() { db }: CustomContext,
  ): Promise<Statement[]> {
    const statementService = new StatementService(db);
    return statementService.getStatementsByDateRangeAndProjectUserId(
      convertToLocalTime(startDate),
      convertToLocalTime(endDate),
      projectUserId,
    );
  }

  @Mutation(() => Statement)
  async addStatement(
    @Arg('project_user_id') project_user_id: string,
    @Arg('start_date') start_date: Date,
    @Arg('from') from: Date,
    @Arg('to') to: Date,
    @Arg('shift_lenght') shift_lenght: number,
    @Arg('calculated_overtime', { nullable: true, defaultValue: null })
    calculated_overtime: number,
    @Arg('claimed_overtime', { nullable: true, defaultValue: null })
    claimed_overtime: number,
    @Arg('kilometers', { nullable: true, defaultValue: null })
    kilometers: number,
    @Arg('car_id', { nullable: true, defaultValue: null })
    car_id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<Statement> {
    // const statementService = new StatementService(db);
    const data: StatementInput = {
      project_user_id,
      start_date: convertToLocalTime(start_date),
      from: convertToLocalTime(from),
      to: convertToLocalTime(to),
      shift_lenght,
      calculated_overtime,
      claimed_overtime,
      car_id,
      kilometers,
    };

    const validatedData = statementInputSchema.parse(data);
    const statementService = new StatementService(db);
    return statementService.createStatement(validatedData);
  }

  @Mutation(() => Statement)
  async updatestatement(
    @Arg('id') id: string,
    @Arg('data') data: StatementInput,
    @Ctx() { db }: CustomContext,
  ): Promise<Statement | null> {
    const convertedData = {
      ...data,
      start_date: convertToLocalTime(data.start_date),
      from: convertToLocalTime(data.from),
      to: convertToLocalTime(data.to),
      car_id: data.car_id || null,
      kilometers: data.kilometers || null,
    } as StatementInput;
    const validatedData = statementInputSchema.parse(convertedData);
    const statementService = new StatementService(db);
    return statementService.updateStatement(id, validatedData);
  }

  @Mutation(() => Boolean)
  async deleteStatement(
    @Arg('id') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    const validatedData = deleteStatementSchema.parse({ id });
    const statementService = new StatementService(db);
    return statementService.deleteStatementById(validatedData.id);
  }
}
