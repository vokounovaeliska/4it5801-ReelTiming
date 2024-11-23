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
import { Statement, StatementInput } from './statementType';
import { StatementService } from './statementService';
import { ProjectUser } from '../projectUser/projectUserType';
import { ProjectUserService } from '../projectUser/projectUserService';
import { convertToLocalTime } from '@backend/utils/helpers';
import { z } from 'zod';

const statementInputSchema = z.object({
  project_user_id: z.string().uuid(),
  start_date: z.date(),
  from: z.date(),
  to: z.date(),
  shift_lenght: z.number().nonnegative(),
  calculated_overtime: z.number().nonnegative().optional(),
  claimed_overtime: z.number().nonnegative().optional(),
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
    // const statementService = new StatementService(db);
    const convertedData = {
      ...data,
      start_date: convertToLocalTime(data.start_date),
      from: convertToLocalTime(data.from),
      to: convertToLocalTime(data.to),
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
