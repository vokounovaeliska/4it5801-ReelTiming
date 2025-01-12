export interface RoleData {
  userRoleInProject: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  start_date?: string | null;
  end_date?: string | null;
  production_company: string;
  is_active: boolean;
  currency: string;
  shootingDays?: ShootingDay[] | null;
}

export type ShootingDaysByProject = {
  shootingDaysByProject: ShootingDayByProject[];
};

export type ShootingDayByProject = {
  id: string;
  shooting_day_number: number;
  date: string;
  dailyReport?: DailyReport[] | null;
};

export type ShootingDay = {
  id: string;
  shooting_day_number: number;
  date: string;
  dailyReport?: DailyReport[] | null;
};

export type DailyReport = {
  id: string;
  intro: ReportItem[];
  shooting_progress: ReportItem[];
  footer: ReportItem[];
  create_date?: string | null;
  last_update_date?: string | null;
  shootingDay?: ShootingDay;
};

export type ReportItem = {
  title: string;
  value: string;
};

export type ProjectUser = {
  name: string;
  surname: string;
  position?: string | null;
  department?: Department | null;
};

export type Department = {
  id: string;
  name: string;
  order_index?: number | null;
  is_visible?: boolean | null;
};

export type Statement = {
  id: string;
  start_date: string;
  from: string;
  to: string;
  claimed_overtime?: number | null;
  projectUser: ProjectUser;
};

export type DailyReportPreviewInfoQuery = {
  statementsByProjectIdAndDate: Statement[];
  project?: Project | null;
  shootingDay?: ShootingDay | null;
};

export interface LastDailyReportByProjectIdQuery {
  lastDailyReportByProjectId: DailyReport[];
}

export interface DailyReportFormProps {
  projectId: string;
  shootingDays: ShootingDayByProject[];
  refetchShootingDays: () => void;
  mode: 'add' | 'edit';
  dailyReport?: DailyReport;
  onCloseEdit: () => void;
  isOpen: boolean;
  onClose: () => void;
  shootingDay?: ShootingDayByProject | null;
  lastDailyReport?: LastDailyReportByProjectIdQuery;
  lastDailyReportRefetch: () => void;
}
