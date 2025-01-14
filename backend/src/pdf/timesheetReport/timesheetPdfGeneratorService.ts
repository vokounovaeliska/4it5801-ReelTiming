import { Statement } from '@backend/graphql/modules/statement/statementType';
import { timesheetPdfReport } from './timesheetPdfReport';
import { ProjectUser } from '@backend/graphql/modules/projectUser/projectUserType';
import { Rate } from '@backend/graphql/modules/rate/rateType';
import { Project } from '@backend/graphql/modules/project/projectType';
import { Department } from '@backend/graphql/modules/department/departmentType';
import {
  CrewInfoPdf,
  DateRange,
  StatementPdf,
} from './timesheetPdfReportTypes';
import { ProjectService } from '@backend/graphql/modules/project/projectService';
import { StatementService } from '@backend/graphql/modules/statement/statementService';
import { RateService } from '@backend/graphql/modules/rate/rateService';
import { ProjectUserService } from '@backend/graphql/modules/projectUser/projectUserService';
import { DepartmentService } from '@backend/graphql/modules/department/departmentService';
import { Db } from '@backend/types/types';
import { Stream } from 'stream';
import { CarService } from '@backend/graphql/modules/car/carService';

export class timesheetPdfGeneratorService {
  private statementService: StatementService;
  private rateService: RateService;
  private projectService: ProjectService;
  private projectUserService: ProjectUserService;
  private departmentService: DepartmentService;
  private carService: CarService;

  constructor(private db: Db) {
    this.statementService = new StatementService(db);
    this.rateService = new RateService(db);
    this.projectService = new ProjectService(db);
    this.projectUserService = new ProjectUserService(db);
    this.departmentService = new DepartmentService(db);
    this.carService = new CarService(db);
  }

  async generatePdfReport(
    projectUserId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Stream> {
    try {
      if (!projectUserId || !startDate || !endDate) {
        console.error('Missing parameters');
        throw new Error('Missing parameters');
      }

      const statements: Statement[] =
        await this.statementService.getStatementsByDateRangeAndProjectUserId(
          startDate,
          endDate,
          projectUserId,
        );

      const projectUser: ProjectUser | null =
        await this.projectUserService.getProjectUserById(projectUserId);

      if (!projectUser) {
        throw new Error('Project user not found');
      }

      const rate: Rate = await this.rateService.getRateById(
        projectUser?.rate_id!,
      );
      const project: Project | null = await this.projectService.getProjectById(
        projectUser.project_id,
      );
      const department: Department =
        await this.departmentService.getDepartmentById(
          projectUser?.department_id!,
        );

      const dateRange: DateRange = {
        start_date: startDate,
        end_date: endDate,
      };

      // Map statements to StatementPdf format and add car information
      const statementList: StatementPdf[] = await Promise.all(
        statements.map(async (statement) => {
          const car = statement.car_id
            ? await this.carService.getCarById(statement.car_id)
            : null;

          return {
            start_date: statement.start_date,
            from: statement.from,
            to: statement.to,
            shift_lenght: statement.shift_lenght,
            calculated_overtime: statement.calculated_overtime ?? 0,
            claimed_overtime: statement.claimed_overtime ?? 0,
            kilometers: statement.kilometers ?? null,
            car_name: car?.name ?? null,
            kilometer_allow: car?.kilometer_allow ?? null,
            kilometer_rate: car?.kilometer_rate ?? null,
          };
        }),
      );
      const crewInfo: CrewInfoPdf = {
        projectUser: {
          id: projectUser.id,
          name: projectUser.name,
          surname: projectUser.surname,
          email: projectUser.email,
          phone_number: projectUser.phone_number ?? '',
          position: projectUser.position ?? '',
        },
        department: {
          name: department.name,
        },
        project: {
          name: project?.name || '',
          description: project?.description || '',
          currency: project?.currency || 'CZK',
          logo: project?.logo,
        },
        rate: {
          standard_rate: rate.standard_rate ?? 0,
          overtime_hour1: rate.overtime_hour1 ?? 0,
          overtime_hour2: rate.overtime_hour2 ?? 0,
          overtime_hour3: rate.overtime_hour3 ?? 0,
          overtime_hour4: rate.overtime_hour4 ?? 0,
          compensation_rate: rate.compensation_rate ?? 0,
        },
      };

      const file = await timesheetPdfReport(dateRange, crewInfo, statementList);

      return file;
    } catch (error) {
      console.error('Error fetching statements:', error);
      throw error;
    }
  }
}
