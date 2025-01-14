import { Db } from '@backend/types/types';

import { Statement, StatementInput } from './statementType';
import { getStatementRepository } from './statementRepository';

export class StatementService {
  private statementRepository: ReturnType<typeof getStatementRepository>;

  constructor(db: Db) {
    this.statementRepository = getStatementRepository(db);
  }

  async getAllStatements(): Promise<Statement[]> {
    const statements = await this.statementRepository.getAllStatements();
    return statements;
  }

  async getStatementById(id: string): Promise<Statement | null> {
    const statementRecord = await this.statementRepository.getStatementById(id);
    if (!statementRecord) {
      return null;
    }
    return statementRecord;
  }

  async getStatementsByProjectUserId(projectUserId: string) {
    return this.statementRepository.getStatementsByProjectUserId(projectUserId);
  }

  async getStatementsByProjectId(projectId: string) {
    const statementsRecords =
      await this.statementRepository.getStatementsByProjectId(projectId);

    return statementsRecords.map((record) => ({
      ...record.statement,
    }));
  }

  async getCarStatementsByProjectId(projectId: string) {
    const statementsRecords =
      await this.statementRepository.getCarStatementsByProjectId(projectId);

    return statementsRecords;
  }

  async getStatementsByUserId(userId: string) {
    const statementsRecords =
      await this.statementRepository.getStatementsByUserId(userId);

    return statementsRecords.map((record) => ({
      ...record.statement,
    }));
  }

  async getStatementsByDateRangeAndProjectUserId(
    startDate: Date,
    endDate: Date,
    projectUserId: string,
  ) {
    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(23, 59, 59, 999);
    const statementsRecords =
      await this.statementRepository.getStatementsByDateRangeAndProjectUserId(
        startDate,
        endDate,
        projectUserId,
      );

    return statementsRecords.map((record) => ({
      ...record.statement,
    }));
  }

  async createStatement(data: StatementInput): Promise<Statement> {
    const createdAt = new Date();
    const userId = 'user-id';
    const statementId = await this.statementRepository.createStatement({
      ...data,
      create_date: createdAt,
      last_update_date: createdAt,
      create_user_id: userId,
      last_update_user_id: userId,
    });
    const statement = await this.getStatementById(statementId);
    if (!statement) {
      throw new Error('Failed to create statement');
    }
    return statement;
  }

  async updateStatement(
    id: string,
    data: StatementInput,
  ): Promise<Statement | null> {
    console.log(data.project_user_id);
    console.log(data.last_update_user_id);
    await this.statementRepository.updateStatement(id, {
      start_date: data.start_date,
      from: data.from,
      to: data.to,
      shift_lenght: data.shift_lenght,
      calculated_overtime: data.calculated_overtime ?? null,
      claimed_overtime: data.claimed_overtime ?? null,
      last_update_date: data.last_update_date,
      last_update_user_id: data.last_update_user_id,
      car_id: data.car_id,
      kilometers: data.kilometers,
    });
    return this.getStatementById(id);
  }

  async deleteStatementById(id: string): Promise<boolean> {
    const statement = await this.getStatementById(id);
    if (!statement) {
      throw new Error('Statement not found');
    }
    await this.statementRepository.deleteStatement(statement.id);
    return true;
  }

  async getStatementsByProjectIdAndDate(projectId: string, date: Date) {
    const statementRecords =
      await this.statementRepository.getStatementsByProjectIdAndDate(
        projectId,
        date,
      );
    return statementRecords.map((record) => record.statement);
  }
}
