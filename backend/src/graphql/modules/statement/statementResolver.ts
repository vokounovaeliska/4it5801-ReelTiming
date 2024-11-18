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
    const statementService = new StatementService(db);
    const data: StatementInput = {
      project_user_id,
      start_date: convertToLocalTime(start_date),
      from: convertToLocalTime(from),
      to: convertToLocalTime(to),
      shift_lenght,
      calculated_overtime,
      claimed_overtime,
    };
    return statementService.createStatement(data);
  }

  @Mutation(() => Statement)
  async updatestatement(
    @Arg('id') id: string,
    @Arg('data') data: StatementInput,
    @Ctx() { db }: CustomContext,
  ): Promise<Statement | null> {
    const statementService = new StatementService(db);
    const convertedData = {
      ...data,
      start_date: convertToLocalTime(data.start_date),
      from: convertToLocalTime(data.from),
      to: convertToLocalTime(data.to),
    } as StatementInput;
    return statementService.updateStatement(id, convertedData);
  }

  @Mutation(() => Boolean)
  async deleteStatement(
    @Arg('id') id: string,
    @Ctx() { db }: CustomContext,
  ): Promise<boolean> {
    const statementService = new StatementService(db);
    return statementService.deleteStatementById(id);
  }
}
