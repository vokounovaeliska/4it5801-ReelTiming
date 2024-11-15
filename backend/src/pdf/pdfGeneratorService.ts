import { Statement } from '@backend/graphql/modules/statement/statementType';
import { generatePdf } from './generatePdf';
import { ProjectUser } from '@backend/graphql/modules/projectUser/projectUserType';
import { Rate } from '@backend/graphql/modules/rate/rateType';
import { Project } from '@backend/graphql/modules/project/projectType';
import { Department } from '@backend/graphql/modules/department/departmentType';
import { CrewInfoPdf, DateRange, StatementPdf } from './pdfTypes';
import { ProjectService } from '@backend/graphql/modules/project/projectService';
import { StatementService } from '@backend/graphql/modules/statement/statementService';
import { RateService } from '@backend/graphql/modules/rate/rateService';
import { ProjectUserService } from '@backend/graphql/modules/projectUser/projectUserService';
import { DepartmentService } from '@backend/graphql/modules/department/departmentService';
import { ReportService } from '@backend/graphql/modules/report/reportService';
import { Db } from '@backend/types/types';

export class PdfGeneratorService {
  private statementService: StatementService;
  private rateService: RateService;
  private projectService: ProjectService;
  private projectUserService: ProjectUserService;
  private departmentService: DepartmentService;
  private reportService: ReportService;

  constructor(private db: Db) {
    this.statementService = new StatementService(db);
    this.rateService = new RateService(db);
    this.projectService = new ProjectService(db);
    this.projectUserService = new ProjectUserService(db);
    this.departmentService = new DepartmentService(db);
    this.reportService = new ReportService(db);
  }

  async generatePdfReport(
    projectUserId: string,
    startDate: Date,
    endDate: Date,
    userId: string,
  ): Promise<string> {
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

      // Map statements to StatementPdf format
      const statementList: StatementPdf[] = statements.map((statement) => ({
        start_date: statement.start_date,
        from: statement.from,
        to: statement.to,
        shift_lenght: statement.shift_lenght,
        calculated_overtime: statement.calculated_overtime ?? 0,
        claimed_overtime: statement.claimed_overtime ?? 0,
      }));

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

      // Generate PDF
      const filePath = await generatePdf(dateRange, crewInfo, statementList);

      //Save path to DB
      this.reportService.createReport({
        path: filePath,
        project_user_id: projectUserId,
        name: 'Time sheet report',
        start_date: startDate,
        end_date: endDate,
        create_date: new Date(),
        create_user_id: userId,
      });

      return filePath;
    } catch (error) {
      console.error('Error fetching statements:', error);
      throw error;
    }
  }
}
