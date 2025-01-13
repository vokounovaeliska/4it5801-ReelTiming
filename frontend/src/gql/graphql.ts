/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: string; output: string };
};

export type AuthInfo = {
  __typename?: 'AuthInfo';
  token: Scalars['String']['output'];
  user: User;
};

export type Car = {
  __typename?: 'Car';
  create_date: Scalars['DateTimeISO']['output'];
  create_user_id: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  kilometer_allow: Scalars['Float']['output'];
  kilometer_rate: Scalars['Float']['output'];
  last_update_date: Scalars['DateTimeISO']['output'];
  last_update_user_id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  projectUser: ProjectUser;
};

export type CarInput = {
  create_date?: InputMaybe<Scalars['DateTimeISO']['input']>;
  create_user_id?: InputMaybe<Scalars['String']['input']>;
  kilometer_allow: Scalars['Float']['input'];
  kilometer_rate: Scalars['Float']['input'];
  last_update_date?: InputMaybe<Scalars['DateTimeISO']['input']>;
  last_update_user_id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  project_user_id: Scalars['String']['input'];
};

export type CarStatement = {
  __typename?: 'CarStatement';
  car_id: Scalars['String']['output'];
  kilometers?: Maybe<Scalars['Float']['output']>;
};

export type Crew = {
  __typename?: 'Crew';
  id: Scalars['String']['output'];
};

export type CrewInput = {
  id: Scalars['String']['input'];
};

export type DailyReport = {
  __typename?: 'DailyReport';
  create_date?: Maybe<Scalars['DateTimeISO']['output']>;
  footer: Array<ReportItem>;
  id: Scalars['ID']['output'];
  intro: Array<ReportItem>;
  last_update_date?: Maybe<Scalars['DateTimeISO']['output']>;
  project?: Maybe<Project>;
  shootingDay?: Maybe<ShootingDay>;
  shooting_progress: Array<ReportItem>;
};

export type DailyReportInput = {
  footer: Array<ReportItemInput>;
  intro: Array<ReportItemInput>;
  project_id: Scalars['String']['input'];
  shooting_day_id: Scalars['String']['input'];
  shooting_progress: Array<ReportItemInput>;
};

export type Department = {
  __typename?: 'Department';
  id: Scalars['ID']['output'];
  is_visible?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  order_index?: Maybe<Scalars['Float']['output']>;
  project?: Maybe<Project>;
};

export type DepartmentInput = {
  is_visible?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  order_index?: InputMaybe<Scalars['Float']['input']>;
  project_id: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  activateProjectUser: Scalars['Boolean']['output'];
  addCar: Car;
  addDailyReport: DailyReport;
  addDepartment: Department;
  addProject: Project;
  addProjectUser: ProjectUser;
  addRate: Rate;
  addShiftOverview: ShiftOverview;
  addShootingDay: ShootingDay;
  addStatement: Statement;
  deleteCar: Scalars['Boolean']['output'];
  deleteDailyReport: Scalars['Boolean']['output'];
  deleteDepartment: Scalars['Boolean']['output'];
  deleteInvitation: Scalars['Boolean']['output'];
  deleteProject: Scalars['Boolean']['output'];
  deleteProjectUser: Scalars['Boolean']['output'];
  deleteRate: Scalars['Boolean']['output'];
  deleteShiftOverview: Scalars['Boolean']['output'];
  deleteShootingDay: Scalars['Boolean']['output'];
  deleteStatement: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  forgotPassword: Scalars['Boolean']['output'];
  inviteUser: Scalars['Boolean']['output'];
  resetPassword: AuthInfo;
  signIn: AuthInfo;
  signUp: AuthInfo;
  updateCar: Car;
  updateDailyReport: DailyReport;
  updateDepartment: Department;
  updateProject: Project;
  updateProjectUser: ProjectUser;
  updateRate: Rate;
  updateShiftOverview: ShiftOverview;
  updateShootingDay: ShootingDay;
  updateUser: User;
  updatestatement: Statement;
};

export type MutationActivateProjectUserArgs = {
  token: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type MutationAddCarArgs = {
  kilometer_allow: Scalars['Float']['input'];
  kilometer_rate: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  project_user_id: Scalars['String']['input'];
};

export type MutationAddDailyReportArgs = {
  footer: Array<ReportItemInput>;
  intro: Array<ReportItemInput>;
  projectId: Scalars['String']['input'];
  shooting_day_id: Scalars['String']['input'];
  shooting_progress: Array<ReportItemInput>;
};

export type MutationAddDepartmentArgs = {
  isVisible?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  orderIndex?: InputMaybe<Scalars['Float']['input']>;
  projectId?: InputMaybe<Scalars['String']['input']>;
};

export type MutationAddProjectArgs = {
  create_user_id?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['DateTimeISO']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  production_company: Scalars['String']['input'];
  start_date?: InputMaybe<Scalars['DateTimeISO']['input']>;
};

export type MutationAddProjectUserArgs = {
  departmentId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  invitation?: InputMaybe<Scalars['String']['input']>;
  isTeamLeader?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  phone_number?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['String']['input'];
  rateId?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  surname: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type MutationAddRateArgs = {
  compensation_rate: Scalars['Float']['input'];
  overtime_hour1: Scalars['Float']['input'];
  overtime_hour2: Scalars['Float']['input'];
  overtime_hour3: Scalars['Float']['input'];
  overtime_hour4: Scalars['Float']['input'];
  standard_rate: Scalars['Float']['input'];
};

export type MutationAddShiftOverviewArgs = {
  crew_working: Array<CrewInput>;
  date: Scalars['DateTimeISO']['input'];
  projectId: Scalars['String']['input'];
};

export type MutationAddShootingDayArgs = {
  date: Scalars['DateTimeISO']['input'];
  eventType?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['String']['input'];
  shootingDayNumber: Scalars['Float']['input'];
};

export type MutationAddStatementArgs = {
  calculated_overtime?: InputMaybe<Scalars['Float']['input']>;
  car_id?: InputMaybe<Scalars['String']['input']>;
  claimed_overtime?: InputMaybe<Scalars['Float']['input']>;
  from: Scalars['DateTimeISO']['input'];
  kilometers?: InputMaybe<Scalars['Float']['input']>;
  project_user_id: Scalars['String']['input'];
  shift_lenght: Scalars['Float']['input'];
  start_date: Scalars['DateTimeISO']['input'];
  to: Scalars['DateTimeISO']['input'];
};

export type MutationDeleteCarArgs = {
  id: Scalars['String']['input'];
};

export type MutationDeleteDailyReportArgs = {
  dailyReportId: Scalars['String']['input'];
};

export type MutationDeleteDepartmentArgs = {
  departmentId: Scalars['String']['input'];
};

export type MutationDeleteInvitationArgs = {
  projectUserId: Scalars['String']['input'];
};

export type MutationDeleteProjectArgs = {
  projectId: Scalars['String']['input'];
};

export type MutationDeleteProjectUserArgs = {
  projectUserId: Scalars['String']['input'];
};

export type MutationDeleteRateArgs = {
  rateId: Scalars['String']['input'];
};

export type MutationDeleteShiftOverviewArgs = {
  shiftOverviewId: Scalars['String']['input'];
};

export type MutationDeleteShootingDayArgs = {
  shootingDayId: Scalars['String']['input'];
};

export type MutationDeleteStatementArgs = {
  id: Scalars['String']['input'];
};

export type MutationDeleteUserArgs = {
  userId: Scalars['String']['input'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};

export type MutationInviteUserArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  projectUserId: Scalars['String']['input'];
};

export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type MutationSignInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationSignUpArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone_number?: InputMaybe<Scalars['String']['input']>;
  surname: Scalars['String']['input'];
};

export type MutationUpdateCarArgs = {
  data: CarInput;
  id: Scalars['String']['input'];
};

export type MutationUpdateDailyReportArgs = {
  dailyReportId: Scalars['String']['input'];
  data: DailyReportInput;
};

export type MutationUpdateDepartmentArgs = {
  data: DepartmentInput;
  departmentId: Scalars['String']['input'];
};

export type MutationUpdateProjectArgs = {
  data: ProjectInput;
  projectId: Scalars['String']['input'];
};

export type MutationUpdateProjectUserArgs = {
  data: ProjectUserInput;
  id: Scalars['String']['input'];
};

export type MutationUpdateRateArgs = {
  data: RateInput;
  rateId: Scalars['String']['input'];
};

export type MutationUpdateShiftOverviewArgs = {
  data: ShiftOverviewInput;
  shiftOverviewId: Scalars['String']['input'];
};

export type MutationUpdateShootingDayArgs = {
  data: ShootingDayInput;
  shootingDayId: Scalars['String']['input'];
};

export type MutationUpdateUserArgs = {
  data: UserInput;
  userId: Scalars['String']['input'];
};

export type MutationUpdatestatementArgs = {
  data: StatementInput;
  id: Scalars['String']['input'];
};

export type Project = {
  __typename?: 'Project';
  create_date: Scalars['DateTimeISO']['output'];
  create_user_id: Scalars['String']['output'];
  currency: Scalars['String']['output'];
  dailyReports?: Maybe<Array<DailyReport>>;
  departments?: Maybe<Array<Department>>;
  description: Scalars['String']['output'];
  end_date?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['ID']['output'];
  is_active: Scalars['Boolean']['output'];
  last_update_date: Scalars['DateTimeISO']['output'];
  last_update_user_id: Scalars['String']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  production_company: Scalars['String']['output'];
  projectUsers?: Maybe<Array<ProjectUser>>;
  shiftsOverview?: Maybe<Array<ShiftOverview>>;
  shootingDays?: Maybe<Array<ShootingDay>>;
  start_date?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type ProjectInput = {
  create_date?: InputMaybe<Scalars['DateTimeISO']['input']>;
  create_user_id?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  end_date: Scalars['DateTimeISO']['input'];
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  last_update_date?: InputMaybe<Scalars['DateTimeISO']['input']>;
  last_update_user_id?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  production_company: Scalars['String']['input'];
  start_date: Scalars['DateTimeISO']['input'];
};

export type ProjectUser = {
  __typename?: 'ProjectUser';
  car?: Maybe<Array<Car>>;
  create_date: Scalars['DateTimeISO']['output'];
  create_user_id: Scalars['String']['output'];
  department?: Maybe<Department>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  invitation?: Maybe<Scalars['String']['output']>;
  is_active: Scalars['Boolean']['output'];
  is_team_leader: Scalars['Boolean']['output'];
  last_update_date: Scalars['DateTimeISO']['output'];
  last_update_user_id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  number_of_people?: Maybe<Scalars['Float']['output']>;
  phone_number?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  project: Project;
  rate?: Maybe<Rate>;
  role?: Maybe<Scalars['String']['output']>;
  statement: Array<Statement>;
  surname: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type ProjectUserInput = {
  department_id?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  invitation?: InputMaybe<Scalars['String']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  is_team_leader?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  number_of_people?: InputMaybe<Scalars['Float']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  project_id: Scalars['String']['input'];
  rate_id?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  surname: Scalars['String']['input'];
  user_id?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  _empty: Scalars['String']['output'];
  car?: Maybe<Car>;
  carStatementsByProjectId: Array<CarStatement>;
  cars: Array<Car>;
  carsByProjectUserId: Array<Car>;
  dailyReport?: Maybe<DailyReport>;
  dailyReportsByProjectId: Array<DailyReport>;
  department?: Maybe<Department>;
  departments: Array<Department>;
  getStatementsByDateRangeAndProjectUserId: Array<Statement>;
  lastDailyReportByProjectId?: Maybe<Array<DailyReport>>;
  project?: Maybe<Project>;
  projectUser?: Maybe<ProjectUser>;
  projectUserDetails?: Maybe<ProjectUser>;
  projectUsers: Array<ProjectUser>;
  projectUsersByToken: ProjectUser;
  project_users: Array<ProjectUser>;
  projects: Array<Project>;
  rate?: Maybe<Rate>;
  rates: Array<Rate>;
  shiftOverview?: Maybe<ShiftOverview>;
  shiftOverviewsByProjectId: Array<ShiftOverview>;
  shootingDay?: Maybe<ShootingDay>;
  shootingDaysByProject: Array<ShootingDay>;
  statement?: Maybe<Statement>;
  statements: Array<Statement>;
  statementsByProjectId: Array<Statement>;
  statementsByProjectIdAndDate: Array<Statement>;
  statementsByProjectUserId: Array<Statement>;
  statementsByUserId: Array<Statement>;
  user?: Maybe<User>;
  userProjects: Array<Project>;
  userRoleInProject?: Maybe<Scalars['String']['output']>;
  users: Array<User>;
};

export type QueryCarArgs = {
  id: Scalars['String']['input'];
};

export type QueryCarStatementsByProjectIdArgs = {
  projectId: Scalars['String']['input'];
};

export type QueryCarsByProjectUserIdArgs = {
  projectUserId: Scalars['String']['input'];
};

export type QueryDailyReportArgs = {
  id: Scalars['String']['input'];
};

export type QueryDailyReportsByProjectIdArgs = {
  projectId: Scalars['String']['input'];
};

export type QueryDepartmentArgs = {
  id: Scalars['String']['input'];
};

export type QueryDepartmentsArgs = {
  projectId: Scalars['String']['input'];
};

export type QueryGetStatementsByDateRangeAndProjectUserIdArgs = {
  endDate: Scalars['DateTimeISO']['input'];
  projectUserId: Scalars['String']['input'];
  startDate: Scalars['DateTimeISO']['input'];
};

export type QueryLastDailyReportByProjectIdArgs = {
  projectId: Scalars['String']['input'];
};

export type QueryProjectArgs = {
  id: Scalars['String']['input'];
};

export type QueryProjectUserArgs = {
  id: Scalars['String']['input'];
};

export type QueryProjectUserDetailsArgs = {
  projectId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type QueryProjectUsersArgs = {
  projectId: Scalars['String']['input'];
};

export type QueryProjectUsersByTokenArgs = {
  token: Scalars['String']['input'];
};

export type QueryRateArgs = {
  id: Scalars['String']['input'];
};

export type QueryShiftOverviewArgs = {
  id: Scalars['String']['input'];
};

export type QueryShiftOverviewsByProjectIdArgs = {
  projectId: Scalars['String']['input'];
};

export type QueryShootingDayArgs = {
  id: Scalars['String']['input'];
};

export type QueryShootingDaysByProjectArgs = {
  projectId: Scalars['String']['input'];
};

export type QueryStatementArgs = {
  id: Scalars['String']['input'];
};

export type QueryStatementsByProjectIdArgs = {
  projectId: Scalars['String']['input'];
};

export type QueryStatementsByProjectIdAndDateArgs = {
  date: Scalars['DateTimeISO']['input'];
  projectId: Scalars['String']['input'];
};

export type QueryStatementsByProjectUserIdArgs = {
  projectUserId: Scalars['String']['input'];
};

export type QueryStatementsByUserIdArgs = {
  userId: Scalars['String']['input'];
};

export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export type QueryUserProjectsArgs = {
  userId: Scalars['String']['input'];
};

export type QueryUserRoleInProjectArgs = {
  projectId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Rate = {
  __typename?: 'Rate';
  compensation_rate?: Maybe<Scalars['Float']['output']>;
  create_date: Scalars['DateTimeISO']['output'];
  create_user_id: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  last_update_date: Scalars['DateTimeISO']['output'];
  last_update_user_id: Scalars['String']['output'];
  overtime_hour1?: Maybe<Scalars['Float']['output']>;
  overtime_hour2?: Maybe<Scalars['Float']['output']>;
  overtime_hour3?: Maybe<Scalars['Float']['output']>;
  overtime_hour4?: Maybe<Scalars['Float']['output']>;
  standard_rate?: Maybe<Scalars['Float']['output']>;
};

export type RateInput = {
  compensation_rate?: InputMaybe<Scalars['Float']['input']>;
  create_date?: InputMaybe<Scalars['DateTimeISO']['input']>;
  create_user_id?: InputMaybe<Scalars['String']['input']>;
  last_update_date?: InputMaybe<Scalars['DateTimeISO']['input']>;
  last_update_user_id?: InputMaybe<Scalars['String']['input']>;
  overtime_hour1?: InputMaybe<Scalars['Float']['input']>;
  overtime_hour2?: InputMaybe<Scalars['Float']['input']>;
  overtime_hour3?: InputMaybe<Scalars['Float']['input']>;
  overtime_hour4?: InputMaybe<Scalars['Float']['input']>;
  standard_rate?: InputMaybe<Scalars['Float']['input']>;
};

export type ReportItem = {
  __typename?: 'ReportItem';
  title: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ReportItemInput = {
  title: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type ShiftOverview = {
  __typename?: 'ShiftOverview';
  crew_working: Array<Crew>;
  date: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  project?: Maybe<Project>;
};

export type ShiftOverviewInput = {
  crew_working: Array<CrewInput>;
  date: Scalars['DateTimeISO']['input'];
  project_id: Scalars['String']['input'];
};

export type ShootingDay = {
  __typename?: 'ShootingDay';
  dailyReport?: Maybe<Array<DailyReport>>;
  date: Scalars['DateTimeISO']['output'];
  event_type?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  project?: Maybe<Project>;
  shooting_day_number: Scalars['Float']['output'];
};

export type ShootingDayInput = {
  date: Scalars['DateTimeISO']['input'];
  event_type?: InputMaybe<Scalars['String']['input']>;
  project_id: Scalars['String']['input'];
  shooting_day_number: Scalars['Float']['input'];
};

export type Statement = {
  __typename?: 'Statement';
  calculated_overtime?: Maybe<Scalars['Float']['output']>;
  car?: Maybe<Car>;
  car_id: Scalars['String']['output'];
  claimed_overtime?: Maybe<Scalars['Float']['output']>;
  create_date: Scalars['DateTimeISO']['output'];
  create_user_id: Scalars['String']['output'];
  from: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  kilometers?: Maybe<Scalars['Float']['output']>;
  last_update_date: Scalars['DateTimeISO']['output'];
  last_update_user_id: Scalars['String']['output'];
  projectUser: ProjectUser;
  shift_lenght: Scalars['Float']['output'];
  start_date: Scalars['DateTimeISO']['output'];
  to: Scalars['DateTimeISO']['output'];
};

export type StatementInput = {
  calculated_overtime?: InputMaybe<Scalars['Float']['input']>;
  car_id?: InputMaybe<Scalars['String']['input']>;
  claimed_overtime?: InputMaybe<Scalars['Float']['input']>;
  create_date?: InputMaybe<Scalars['DateTimeISO']['input']>;
  create_user_id?: InputMaybe<Scalars['String']['input']>;
  from: Scalars['DateTimeISO']['input'];
  kilometers?: InputMaybe<Scalars['Float']['input']>;
  last_update_date?: InputMaybe<Scalars['DateTimeISO']['input']>;
  last_update_user_id?: InputMaybe<Scalars['String']['input']>;
  project_user_id: Scalars['String']['input'];
  shift_lenght: Scalars['Float']['input'];
  start_date: Scalars['DateTimeISO']['input'];
  to: Scalars['DateTimeISO']['input'];
};

export type User = {
  __typename?: 'User';
  can_create_project?: Maybe<Scalars['Boolean']['output']>;
  create_date: Scalars['DateTimeISO']['output'];
  create_user_id: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  is_active: Scalars['Boolean']['output'];
  last_update_date: Scalars['DateTimeISO']['output'];
  last_update_user_id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  password_reset_expiration_time?: Maybe<Scalars['DateTimeISO']['output']>;
  password_reset_token?: Maybe<Scalars['String']['output']>;
  phone_number?: Maybe<Scalars['String']['output']>;
  surname: Scalars['String']['output'];
};

export type UserInput = {
  create_date?: InputMaybe<Scalars['DateTimeISO']['input']>;
  create_user_id?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  last_update_date?: InputMaybe<Scalars['DateTimeISO']['input']>;
  last_update_user_id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password_reset_expiration_time?: InputMaybe<Scalars['DateTimeISO']['input']>;
  password_reset_token?: InputMaybe<Scalars['String']['input']>;
  phone_number: Scalars['String']['input'];
  surname?: InputMaybe<Scalars['String']['input']>;
};

export type ActivateProjectUserMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  token: Scalars['String']['input'];
}>;

export type ActivateProjectUserMutation = {
  __typename?: 'Mutation';
  activateProjectUser: boolean;
};

export type AddCarMutationVariables = Exact<{
  kilometerRate: Scalars['Float']['input'];
  kilometerAllow: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  projectUserId: Scalars['String']['input'];
}>;

export type AddCarMutation = {
  __typename?: 'Mutation';
  addCar: {
    __typename?: 'Car';
    name: string;
    projectUser: { __typename?: 'ProjectUser'; id: string };
  };
};

export type DeleteCarMutationVariables = Exact<{
  deleteCarId: Scalars['String']['input'];
}>;

export type DeleteCarMutation = { __typename?: 'Mutation'; deleteCar: boolean };

export type UpdateCarMutationVariables = Exact<{
  data: CarInput;
  updateCarId: Scalars['String']['input'];
}>;

export type UpdateCarMutation = {
  __typename?: 'Mutation';
  updateCar: {
    __typename?: 'Car';
    kilometer_allow: number;
    kilometer_rate: number;
    name: string;
    id: string;
  };
};

export type AddDailyReportMutationVariables = Exact<{
  footer: Array<ReportItemInput> | ReportItemInput;
  shootingProgress: Array<ReportItemInput> | ReportItemInput;
  intro: Array<ReportItemInput> | ReportItemInput;
  projectId: Scalars['String']['input'];
  shootingDayId: Scalars['String']['input'];
}>;

export type AddDailyReportMutation = {
  __typename?: 'Mutation';
  addDailyReport: {
    __typename?: 'DailyReport';
    id: string;
    create_date?: string | null;
    last_update_date?: string | null;
    intro: Array<{ __typename?: 'ReportItem'; title: string; value: string }>;
    shooting_progress: Array<{
      __typename?: 'ReportItem';
      title: string;
      value: string;
    }>;
    footer: Array<{ __typename?: 'ReportItem'; title: string; value: string }>;
    project?: { __typename?: 'Project'; id: string; name: string } | null;
    shootingDay?: {
      __typename?: 'ShootingDay';
      id: string;
      date: string;
      shooting_day_number: number;
    } | null;
  };
};

export type AddProjectMutationVariables = Exact<{
  productionCompany: Scalars['String']['input'];
  name: Scalars['String']['input'];
  endDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
  startDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  create_user_id?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
}>;

export type AddProjectMutation = {
  __typename?: 'Mutation';
  addProject: {
    __typename?: 'Project';
    id: string;
    name: string;
    production_company: string;
    description: string;
    start_date?: string | null;
    end_date?: string | null;
    create_date: string;
    create_user_id: string;
    last_update_user_id: string;
    last_update_date: string;
    is_active: boolean;
    currency: string;
    departments?: Array<{
      __typename?: 'Department';
      id: string;
      name: string;
    }> | null;
  };
};

export type AddProjectUserMutationVariables = Exact<{
  projectId: Scalars['String']['input'];
  isTeamLeader: Scalars['Boolean']['input'];
  rateId?: InputMaybe<Scalars['String']['input']>;
  departmentId?: InputMaybe<Scalars['String']['input']>;
  role: Scalars['String']['input'];
  invitation?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  surname: Scalars['String']['input'];
  position?: InputMaybe<Scalars['String']['input']>;
}>;

export type AddProjectUserMutation = {
  __typename?: 'Mutation';
  addProjectUser: {
    __typename?: 'ProjectUser';
    id: string;
    is_team_leader: boolean;
    role?: string | null;
    project: { __typename?: 'Project'; id: string };
    rate?: { __typename?: 'Rate'; id: string } | null;
  };
};

export type AddRateMutationVariables = Exact<{
  standardRate: Scalars['Float']['input'];
  compensationRate: Scalars['Float']['input'];
  overtimeHour1: Scalars['Float']['input'];
  overtimeHour2: Scalars['Float']['input'];
  overtimeHour3: Scalars['Float']['input'];
  overtimeHour4: Scalars['Float']['input'];
}>;

export type AddRateMutation = {
  __typename?: 'Mutation';
  addRate: { __typename?: 'Rate'; id: string };
};

export type AddShootingDayMutationVariables = Exact<{
  projectId: Scalars['String']['input'];
  date: Scalars['DateTimeISO']['input'];
  shootingDayNumber: Scalars['Float']['input'];
  eventType?: InputMaybe<Scalars['String']['input']>;
}>;

export type AddShootingDayMutation = {
  __typename?: 'Mutation';
  addShootingDay: {
    __typename?: 'ShootingDay';
    project?: { __typename?: 'Project'; id: string } | null;
  };
};

export type AddStatementMutationVariables = Exact<{
  project_user_id: Scalars['String']['input'];
  start_date: Scalars['DateTimeISO']['input'];
  from: Scalars['DateTimeISO']['input'];
  to: Scalars['DateTimeISO']['input'];
  shift_lenght: Scalars['Float']['input'];
  calculated_overtime?: InputMaybe<Scalars['Float']['input']>;
  claimed_overtime?: InputMaybe<Scalars['Float']['input']>;
  car_id?: InputMaybe<Scalars['String']['input']>;
  kilometers?: InputMaybe<Scalars['Float']['input']>;
}>;

export type AddStatementMutation = {
  __typename?: 'Mutation';
  addStatement: {
    __typename?: 'Statement';
    id: string;
    start_date: string;
    from: string;
    to: string;
    shift_lenght: number;
    calculated_overtime?: number | null;
    claimed_overtime?: number | null;
    create_date: string;
    projectUser: {
      __typename?: 'ProjectUser';
      id: string;
      user?: {
        __typename?: 'User';
        id: string;
        name: string;
        surname: string;
      } | null;
    };
  };
};

export type AddDepartmentMutationVariables = Exact<{
  name: Scalars['String']['input'];
  isVisible?: InputMaybe<Scalars['Boolean']['input']>;
  orderIndex?: InputMaybe<Scalars['Float']['input']>;
  projectId: Scalars['String']['input'];
}>;

export type AddDepartmentMutation = {
  __typename?: 'Mutation';
  addDepartment: {
    __typename?: 'Department';
    id: string;
    is_visible?: boolean | null;
    name: string;
    order_index?: number | null;
  };
};

export type DeleteDailyReportMutationVariables = Exact<{
  dailyReportId: Scalars['String']['input'];
}>;

export type DeleteDailyReportMutation = {
  __typename?: 'Mutation';
  deleteDailyReport: boolean;
};

export type DeleteInvitationMutationVariables = Exact<{
  projectUserId: Scalars['String']['input'];
}>;

export type DeleteInvitationMutation = {
  __typename?: 'Mutation';
  deleteInvitation: boolean;
};

export type DeleteShootingDayMutationVariables = Exact<{
  shootingDayId: Scalars['String']['input'];
}>;

export type DeleteShootingDayMutation = {
  __typename?: 'Mutation';
  deleteShootingDay: boolean;
};

export type DeleteStatementMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type DeleteStatementMutation = {
  __typename?: 'Mutation';
  deleteStatement: boolean;
};

export type EditDailyReportMutationVariables = Exact<{
  data: DailyReportInput;
  dailyReportId: Scalars['String']['input'];
}>;

export type EditDailyReportMutation = {
  __typename?: 'Mutation';
  updateDailyReport: { __typename?: 'DailyReport'; id: string };
};

export type EditProjectMutationVariables = Exact<{
  data: ProjectInput;
  projectId: Scalars['String']['input'];
}>;

export type EditProjectMutation = {
  __typename?: 'Mutation';
  updateProject: {
    __typename?: 'Project';
    description: string;
    name: string;
    production_company: string;
    end_date?: string | null;
    is_active: boolean;
    last_update_user_id: string;
    currency: string;
  };
};

export type EditProjectUserMutationVariables = Exact<{
  data: ProjectUserInput;
  updateProjectUserId: Scalars['String']['input'];
}>;

export type EditProjectUserMutation = {
  __typename?: 'Mutation';
  updateProjectUser: { __typename?: 'ProjectUser'; id: string };
};

export type EditRateMutationVariables = Exact<{
  data: RateInput;
  rateId: Scalars['String']['input'];
}>;

export type EditRateMutation = {
  __typename?: 'Mutation';
  updateRate: {
    __typename?: 'Rate';
    id: string;
    standard_rate?: number | null;
    overtime_hour1?: number | null;
    overtime_hour2?: number | null;
    overtime_hour3?: number | null;
    overtime_hour4?: number | null;
    compensation_rate?: number | null;
  };
};

export type UpdateShootingDayMutationVariables = Exact<{
  data: ShootingDayInput;
  shootingDayId: Scalars['String']['input'];
}>;

export type UpdateShootingDayMutation = {
  __typename?: 'Mutation';
  updateShootingDay: {
    __typename?: 'ShootingDay';
    project?: { __typename?: 'Project'; id: string } | null;
  };
};

export type UpdateStatementMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: StatementInput;
}>;

export type UpdateStatementMutation = {
  __typename?: 'Mutation';
  updatestatement: {
    __typename?: 'Statement';
    id: string;
    start_date: string;
    from: string;
    to: string;
    shift_lenght: number;
    calculated_overtime?: number | null;
    claimed_overtime?: number | null;
    create_date: string;
    last_update_date: string;
    create_user_id: string;
    last_update_user_id: string;
    kilometers?: number | null;
    projectUser: { __typename?: 'ProjectUser'; id: string };
  };
};

export type EditUserMutationVariables = Exact<{
  data: UserInput;
  userId: Scalars['String']['input'];
}>;

export type EditUserMutation = {
  __typename?: 'Mutation';
  updateUser: {
    __typename?: 'User';
    id: string;
    name: string;
    surname: string;
    email: string;
    is_active: boolean;
  };
};

export type InviteUserToProjectMutationVariables = Exact<{
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  projectUserId: Scalars['String']['input'];
}>;

export type InviteUserToProjectMutation = {
  __typename?: 'Mutation';
  inviteUser: boolean;
};

export type UpdateAndActivateProjectUserMutationVariables = Exact<{
  data: ProjectUserInput;
  updateProjectUserId: Scalars['String']['input'];
  updateRateData: RateInput;
  rateId: Scalars['String']['input'];
}>;

export type UpdateAndActivateProjectUserMutation = {
  __typename?: 'Mutation';
  updateRate: {
    __typename?: 'Rate';
    compensation_rate?: number | null;
    overtime_hour1?: number | null;
    overtime_hour2?: number | null;
    overtime_hour3?: number | null;
    overtime_hour4?: number | null;
    standard_rate?: number | null;
  };
  updateProjectUser: {
    __typename?: 'ProjectUser';
    id: string;
    position?: string | null;
    number_of_people?: number | null;
    is_team_leader: boolean;
    name: string;
    surname: string;
    email: string;
    create_date: string;
    create_user_id: string;
    last_update_user_id: string;
    last_update_date: string;
    is_active: boolean;
    role?: string | null;
    invitation?: string | null;
    phone_number?: string | null;
  };
};

export type UpdateDepartmentOrderMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: DepartmentInput;
}>;

export type UpdateDepartmentOrderMutation = {
  __typename?: 'Mutation';
  updateDepartment: {
    __typename?: 'Department';
    id: string;
    name: string;
    order_index?: number | null;
    is_visible?: boolean | null;
  };
};

export type UpdateUserMutationVariables = Exact<{
  data: UserInput;
  userId: Scalars['String']['input'];
}>;

export type UpdateUserMutation = {
  __typename?: 'Mutation';
  updateUser: {
    __typename?: 'User';
    name: string;
    surname: string;
    phone_number?: string | null;
    email: string;
    last_update_date: string;
  };
};

export type DeleteProjectUserMutationVariables = Exact<{
  projectUserId: Scalars['String']['input'];
}>;

export type DeleteProjectUserMutation = {
  __typename?: 'Mutation';
  deleteProjectUser: boolean;
};

export type QuacksQueryVariables = Exact<{ [key: string]: never }>;

export type QuacksQuery = { __typename?: 'Query'; _empty: string };

export type GetAllCarsOnProjectByProjectUserIdQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;

export type GetAllCarsOnProjectByProjectUserIdQuery = {
  __typename?: 'Query';
  projectUsers: Array<{
    __typename?: 'ProjectUser';
    id: string;
    name: string;
    surname: string;
    car?: Array<{
      __typename?: 'Car';
      id: string;
      name: string;
      kilometer_allow: number;
      kilometer_rate: number;
    }> | null;
    statement: Array<{
      __typename?: 'Statement';
      id: string;
      kilometers?: number | null;
      car?: {
        __typename?: 'Car';
        id: string;
        kilometer_allow: number;
        kilometer_rate: number;
        name: string;
      } | null;
    }>;
  }>;
};

export type GetAllProjectUsersQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;

export type GetAllProjectUsersQuery = {
  __typename?: 'Query';
  projectUsers: Array<{
    __typename?: 'ProjectUser';
    id: string;
    name: string;
    surname: string;
    car?: Array<{
      __typename?: 'Car';
      id: string;
      name: string;
      kilometer_allow: number;
      kilometer_rate: number;
    }> | null;
    rate?: {
      __typename?: 'Rate';
      compensation_rate?: number | null;
      standard_rate?: number | null;
      overtime_hour1?: number | null;
      overtime_hour2?: number | null;
      overtime_hour3?: number | null;
      overtime_hour4?: number | null;
    } | null;
  }>;
};

export type GetCarsByProjectUserIdQueryVariables = Exact<{
  projectUserId: Scalars['String']['input'];
}>;

export type GetCarsByProjectUserIdQuery = {
  __typename?: 'Query';
  carsByProjectUserId: Array<{
    __typename?: 'Car';
    id: string;
    name: string;
    kilometer_allow: number;
    kilometer_rate: number;
    create_user_id: string;
    last_update_user_id: string;
    last_update_date: string;
    create_date: string;
  }>;
};

export type GetCrewListInfoQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;

export type GetCrewListInfoQuery = {
  __typename?: 'Query';
  userRoleInProject?: string | null;
  project?: {
    __typename?: 'Project';
    id: string;
    name: string;
    start_date?: string | null;
    end_date?: string | null;
    production_company: string;
    is_active: boolean;
    create_date: string;
    create_user_id: string;
    last_update_date: string;
    last_update_user_id: string;
    currency: string;
  } | null;
  departments: Array<{
    __typename?: 'Department';
    id: string;
    name: string;
    is_visible?: boolean | null;
    order_index?: number | null;
  }>;
  projectUsers: Array<{
    __typename?: 'ProjectUser';
    id: string;
    is_active: boolean;
    position?: string | null;
    invitation?: string | null;
    role?: string | null;
    phone_number?: string | null;
    email: string;
    name: string;
    surname: string;
    user?: { __typename?: 'User'; id: string } | null;
    rate?: {
      __typename?: 'Rate';
      id: string;
      compensation_rate?: number | null;
      create_date: string;
      create_user_id: string;
      last_update_date: string;
      last_update_user_id: string;
      overtime_hour1?: number | null;
      overtime_hour2?: number | null;
      overtime_hour3?: number | null;
      overtime_hour4?: number | null;
      standard_rate?: number | null;
    } | null;
    department?: {
      __typename?: 'Department';
      name: string;
      id: string;
      is_visible?: boolean | null;
      order_index?: number | null;
    } | null;
  }>;
};

export type GetProjectUserDetailsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
}>;

export type GetProjectUserDetailsQuery = {
  __typename?: 'Query';
  projectUserDetails?: {
    __typename?: 'ProjectUser';
    id: string;
    name: string;
    surname: string;
    email: string;
    project: {
      __typename?: 'Project';
      id: string;
      name: string;
      currency: string;
      is_active: boolean;
    };
  } | null;
};

export type GetDailyReportByShootingDayQueryVariables = Exact<{
  shootingDayId: Scalars['String']['input'];
}>;

export type GetDailyReportByShootingDayQuery = {
  __typename?: 'Query';
  shootingDay?: {
    __typename?: 'ShootingDay';
    id: string;
    dailyReport?: Array<{
      __typename?: 'DailyReport';
      id: string;
      intro: Array<{ __typename?: 'ReportItem'; title: string; value: string }>;
      shooting_progress: Array<{
        __typename?: 'ReportItem';
        title: string;
        value: string;
      }>;
      footer: Array<{
        __typename?: 'ReportItem';
        title: string;
        value: string;
      }>;
    }> | null;
  } | null;
};

export type DailyReportPreviewInfoQueryVariables = Exact<{
  date: Scalars['DateTimeISO']['input'];
  projectId: Scalars['String']['input'];
  shootingDayId: Scalars['String']['input'];
}>;

export type DailyReportPreviewInfoQuery = {
  __typename?: 'Query';
  statementsByProjectIdAndDate: Array<{
    __typename?: 'Statement';
    id: string;
    start_date: string;
    from: string;
    to: string;
    claimed_overtime?: number | null;
    projectUser: {
      __typename?: 'ProjectUser';
      name: string;
      surname: string;
      position?: string | null;
      department?: {
        __typename?: 'Department';
        id: string;
        name: string;
        order_index?: number | null;
        is_visible?: boolean | null;
      } | null;
    };
  }>;
  project?: {
    __typename?: 'Project';
    id: string;
    name: string;
    production_company: string;
    currency: string;
    shootingDays?: Array<{ __typename?: 'ShootingDay'; id: string }> | null;
  } | null;
  shootingDay?: {
    __typename?: 'ShootingDay';
    id: string;
    shooting_day_number: number;
    date: string;
    dailyReport?: Array<{
      __typename?: 'DailyReport';
      id: string;
      intro: Array<{ __typename?: 'ReportItem'; title: string; value: string }>;
      shooting_progress: Array<{
        __typename?: 'ReportItem';
        title: string;
        value: string;
      }>;
      footer: Array<{
        __typename?: 'ReportItem';
        title: string;
        value: string;
      }>;
    }> | null;
  } | null;
};

export type DepartmentsQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;

export type DepartmentsQuery = {
  __typename?: 'Query';
  departments: Array<{
    __typename?: 'Department';
    id: string;
    name: string;
    is_visible?: boolean | null;
    order_index?: number | null;
  }>;
};

export type LastDailyReportByProjectIdQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;

export type LastDailyReportByProjectIdQuery = {
  __typename?: 'Query';
  lastDailyReportByProjectId?: Array<{
    __typename?: 'DailyReport';
    id: string;
    create_date?: string | null;
    last_update_date?: string | null;
    intro: Array<{ __typename?: 'ReportItem'; title: string; value: string }>;
    shooting_progress: Array<{
      __typename?: 'ReportItem';
      title: string;
      value: string;
    }>;
    footer: Array<{ __typename?: 'ReportItem'; title: string; value: string }>;
    shootingDay?: {
      __typename?: 'ShootingDay';
      id: string;
      shooting_day_number: number;
      date: string;
    } | null;
  }> | null;
};

export type GetProjectByProjectUserTokenQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;

export type GetProjectByProjectUserTokenQuery = {
  __typename?: 'Query';
  projectUsersByToken: {
    __typename?: 'ProjectUser';
    project: { __typename?: 'Project'; name: string };
  };
};

export type GetProjectDetailQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type GetProjectDetailQuery = {
  __typename?: 'Query';
  project?: {
    __typename?: 'Project';
    id: string;
    name: string;
    description: string;
    start_date?: string | null;
    end_date?: string | null;
    production_company: string;
    is_active: boolean;
    create_date: string;
    create_user_id: string;
    last_update_date: string;
    last_update_user_id: string;
    currency: string;
    projectUsers?: Array<{ __typename?: 'ProjectUser'; id: string }> | null;
  } | null;
};

export type GetProjectUserByTokenQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;

export type GetProjectUserByTokenQuery = {
  __typename?: 'Query';
  projectUsersByToken: {
    __typename?: 'ProjectUser';
    id: string;
    position?: string | null;
    name: string;
    surname: string;
    email: string;
    is_active: boolean;
    role?: string | null;
    invitation?: string | null;
    phone_number?: string | null;
    project: {
      __typename?: 'Project';
      id: string;
      name: string;
      description: string;
      currency: string;
    };
    rate?: {
      __typename?: 'Rate';
      standard_rate?: number | null;
      overtime_hour1?: number | null;
      overtime_hour2?: number | null;
      overtime_hour3?: number | null;
      overtime_hour4?: number | null;
      compensation_rate?: number | null;
      id: string;
    } | null;
    department?: { __typename?: 'Department'; id: string; name: string } | null;
  };
};

export type ProjectUsersQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;

export type ProjectUsersQuery = {
  __typename?: 'Query';
  projectUsers: Array<{
    __typename?: 'ProjectUser';
    id: string;
    is_active: boolean;
    position?: string | null;
    invitation?: string | null;
    role?: string | null;
    phone_number?: string | null;
    department?: { __typename?: 'Department'; name: string; id: string } | null;
    user?: {
      __typename?: 'User';
      name: string;
      surname: string;
      email: string;
      id: string;
    } | null;
    rate?: { __typename?: 'Rate'; id: string } | null;
  }>;
};

export type ProjectUserQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;

export type ProjectUserQuery = {
  __typename?: 'Query';
  projectUsersByToken: {
    __typename?: 'ProjectUser';
    id: string;
    position?: string | null;
    role?: string | null;
    phone_number?: string | null;
    project: {
      __typename?: 'Project';
      id: string;
      name: string;
      description: string;
    };
    user?: {
      __typename?: 'User';
      id: string;
      name: string;
      surname: string;
      email: string;
    } | null;
    rate?: {
      __typename?: 'Rate';
      standard_rate?: number | null;
      overtime_hour1?: number | null;
      overtime_hour2?: number | null;
      overtime_hour3?: number | null;
      overtime_hour4?: number | null;
    } | null;
    department?: { __typename?: 'Department'; id: string; name: string } | null;
  };
};

export type GetProjectsQueryVariables = Exact<{ [key: string]: never }>;

export type GetProjectsQuery = {
  __typename?: 'Query';
  projects: Array<{
    __typename?: 'Project';
    id: string;
    name: string;
    description: string;
  }>;
};

export type ShootingDaysByProjectQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;

export type ShootingDaysByProjectQuery = {
  __typename?: 'Query';
  shootingDaysByProject: Array<{
    __typename?: 'ShootingDay';
    id: string;
    date: string;
    shooting_day_number: number;
    event_type?: string | null;
  }>;
};

export type GetShootingDaysByProjectQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;

export type GetShootingDaysByProjectQuery = {
  __typename?: 'Query';
  shootingDaysByProject: Array<{
    __typename?: 'ShootingDay';
    id: string;
    shooting_day_number: number;
    date: string;
    event_type?: string | null;
    dailyReport?: Array<{
      __typename?: 'DailyReport';
      id: string;
      intro: Array<{ __typename?: 'ReportItem'; title: string; value: string }>;
      shooting_progress: Array<{
        __typename?: 'ReportItem';
        title: string;
        value: string;
      }>;
      footer: Array<{
        __typename?: 'ReportItem';
        title: string;
        value: string;
      }>;
    }> | null;
  }>;
};

export type GetCrewStatementsQueryVariables = Exact<{
  projectUserId: Scalars['String']['input'];
}>;

export type GetCrewStatementsQuery = {
  __typename?: 'Query';
  statementsByProjectUserId: Array<{
    __typename?: 'Statement';
    id: string;
    start_date: string;
    from: string;
    to: string;
    shift_lenght: number;
    calculated_overtime?: number | null;
    claimed_overtime?: number | null;
    create_date: string;
    kilometers?: number | null;
    projectUser: {
      __typename?: 'ProjectUser';
      id: string;
      name: string;
      surname: string;
      email: string;
      rate?: {
        __typename?: 'Rate';
        compensation_rate?: number | null;
        standard_rate?: number | null;
        overtime_hour1?: number | null;
        overtime_hour2?: number | null;
        overtime_hour3?: number | null;
        overtime_hour4?: number | null;
      } | null;
    };
    car?: {
      __typename?: 'Car';
      id: string;
      kilometer_allow: number;
      kilometer_rate: number;
      name: string;
    } | null;
  }>;
};

export type GetAdminStatementsQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;

export type GetAdminStatementsQuery = {
  __typename?: 'Query';
  statementsByProjectId: Array<{
    __typename?: 'Statement';
    id: string;
    start_date: string;
    from: string;
    to: string;
    shift_lenght: number;
    calculated_overtime?: number | null;
    claimed_overtime?: number | null;
    create_date: string;
    kilometers?: number | null;
    projectUser: {
      __typename?: 'ProjectUser';
      id: string;
      name: string;
      surname: string;
      email: string;
      rate?: {
        __typename?: 'Rate';
        compensation_rate?: number | null;
        standard_rate?: number | null;
        overtime_hour1?: number | null;
        overtime_hour2?: number | null;
        overtime_hour3?: number | null;
        overtime_hour4?: number | null;
      } | null;
    };
    car?: {
      __typename?: 'Car';
      id: string;
      kilometer_allow: number;
      kilometer_rate: number;
      name: string;
    } | null;
  }>;
};

export type CarStatementsByProjectIdQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;

export type CarStatementsByProjectIdQuery = {
  __typename?: 'Query';
  carStatementsByProjectId: Array<{
    __typename?: 'CarStatement';
    car_id: string;
    kilometers?: number | null;
  }>;
};

export type GetUserProfileSettingsInfoQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;

export type GetUserProfileSettingsInfoQuery = {
  __typename?: 'Query';
  user?: {
    __typename?: 'User';
    id: string;
    name: string;
    surname: string;
    email: string;
    phone_number?: string | null;
    last_update_date: string;
    create_date: string;
  } | null;
};

export type GetUserProjectsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;

export type GetUserProjectsQuery = {
  __typename?: 'Query';
  userProjects: Array<{
    __typename?: 'Project';
    id: string;
    name: string;
    description: string;
    is_active: boolean;
  }>;
};

export type GetUserRoleInProjectQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
}>;

export type GetUserRoleInProjectQuery = {
  __typename?: 'Query';
  userRoleInProject?: string | null;
};

export type ProjectBasicInfoFragment = {
  __typename?: 'Project';
  id: string;
  name: string;
  description: string;
} & { ' $fragmentName'?: 'ProjectBasicInfoFragment' };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;

export type ForgotPasswordMutation = {
  __typename?: 'Mutation';
  forgotPassword: boolean;
};

export type SignInMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type SignInMutation = {
  __typename?: 'Mutation';
  signIn: {
    __typename?: 'AuthInfo';
    token: string;
    user: {
      __typename?: 'User';
      id: string;
      name: string;
      email: string;
      surname: string;
    };
  };
};

export type ResetPasswordMutationVariables = Exact<{
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
}>;

export type ResetPasswordMutation = {
  __typename?: 'Mutation';
  resetPassword: {
    __typename?: 'AuthInfo';
    token: string;
    user: {
      __typename?: 'User';
      id: string;
      name: string;
      surname: string;
      email: string;
    };
  };
};

export type SignUpMutationVariables = Exact<{
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  surname: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type SignUpMutation = {
  __typename?: 'Mutation';
  signUp: {
    __typename?: 'AuthInfo';
    token: string;
    user: {
      __typename?: 'User';
      id: string;
      name: string;
      email: string;
      surname: string;
    };
  };
};

export const ProjectBasicInfoFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProjectBasicInfo' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Project' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProjectBasicInfoFragment, unknown>;
export const ActivateProjectUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ActivateProjectUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'token' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'activateProjectUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'token' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'token' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ActivateProjectUserMutation,
  ActivateProjectUserMutationVariables
>;
export const AddCarDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddCar' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'kilometerRate' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'kilometerAllow' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectUserId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addCar' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'kilometer_rate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'kilometerRate' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'kilometer_allow' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'kilometerAllow' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'name' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'project_user_id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectUserId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'projectUser' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddCarMutation, AddCarMutationVariables>;
export const DeleteCarDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteCar' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'deleteCarId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteCar' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'deleteCarId' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteCarMutation, DeleteCarMutationVariables>;
export const UpdateCarDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateCar' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CarInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'updateCarId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateCar' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'updateCarId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'kilometer_allow' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'kilometer_rate' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateCarMutation, UpdateCarMutationVariables>;
export const AddDailyReportDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddDailyReport' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'footer' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'ReportItemInput' },
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'shootingProgress' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'ReportItemInput' },
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'intro' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'ReportItemInput' },
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'shootingDayId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addDailyReport' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'footer' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'footer' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'shooting_progress' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'shootingProgress' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'intro' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'intro' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'shooting_day_id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'shootingDayId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'intro' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shooting_progress' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'footer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'create_date' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'last_update_date' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'project' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shootingDay' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shooting_day_number' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AddDailyReportMutation,
  AddDailyReportMutationVariables
>;
export const AddProjectDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddProject' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'productionCompany' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'endDate' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'DateTimeISO' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'startDate' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'DateTimeISO' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'description' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'create_user_id' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'currency' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addProject' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'production_company' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'productionCompany' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'name' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'end_date' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'endDate' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'start_date' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'startDate' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'description' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'create_user_id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'create_user_id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'currency' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'currency' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'production_company' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'start_date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'end_date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'create_date' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'create_user_id' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'last_update_user_id' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'last_update_date' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'is_active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'departments' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddProjectMutation, AddProjectMutationVariables>;
export const AddProjectUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddProjectUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'isTeamLeader' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'Boolean' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'rateId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'departmentId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'role' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'invitation' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'phone_number' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'surname' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'position' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addProjectUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'isTeamLeader' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'isTeamLeader' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'rateId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'rateId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'departmentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'departmentId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'role' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'role' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'invitation' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'invitation' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'phone_number' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'phone_number' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'email' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'name' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'surname' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'surname' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'position' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'position' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'project' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'is_team_leader' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'rate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AddProjectUserMutation,
  AddProjectUserMutationVariables
>;
export const AddRateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddRate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'standardRate' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'compensationRate' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'overtimeHour1' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'overtimeHour2' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'overtimeHour3' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'overtimeHour4' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addRate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'standard_rate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'standardRate' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'compensation_rate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'compensationRate' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'overtime_hour1' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'overtimeHour1' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'overtime_hour2' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'overtimeHour2' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'overtime_hour3' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'overtimeHour3' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'overtime_hour4' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'overtimeHour4' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddRateMutation, AddRateMutationVariables>;
export const AddShootingDayDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddShootingDay' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'date' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DateTimeISO' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'shootingDayNumber' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'eventType' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addShootingDay' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'date' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'date' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'shootingDayNumber' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'shootingDayNumber' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'eventType' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'eventType' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'project' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AddShootingDayMutation,
  AddShootingDayMutationVariables
>;
export const AddStatementDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddStatement' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'project_user_id' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'start_date' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DateTimeISO' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'from' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DateTimeISO' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'to' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DateTimeISO' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'shift_lenght' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'calculated_overtime' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'claimed_overtime' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'car_id' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'kilometers' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addStatement' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'project_user_id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'project_user_id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'start_date' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'start_date' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'from' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'from' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'to' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'to' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'shift_lenght' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'shift_lenght' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'calculated_overtime' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'calculated_overtime' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'claimed_overtime' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'claimed_overtime' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'car_id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'car_id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'kilometers' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'kilometers' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'projectUser' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'surname' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'start_date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                { kind: 'Field', name: { kind: 'Name', value: 'to' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shift_lenght' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'calculated_overtime' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'claimed_overtime' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'create_date' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AddStatementMutation,
  AddStatementMutationVariables
>;
export const AddDepartmentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddDepartment' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'isVisible' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderIndex' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addDepartment' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'name' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'isVisible' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'isVisible' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderIndex' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderIndex' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'is_visible' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'order_index' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AddDepartmentMutation,
  AddDepartmentMutationVariables
>;
export const DeleteDailyReportDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteDailyReport' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'dailyReportId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteDailyReport' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'dailyReportId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'dailyReportId' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteDailyReportMutation,
  DeleteDailyReportMutationVariables
>;
export const DeleteInvitationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteInvitation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectUserId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteInvitation' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectUserId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectUserId' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteInvitationMutation,
  DeleteInvitationMutationVariables
>;
export const DeleteShootingDayDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteShootingDay' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'shootingDayId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteShootingDay' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'shootingDayId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'shootingDayId' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteShootingDayMutation,
  DeleteShootingDayMutationVariables
>;
export const DeleteStatementDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteStatement' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteStatement' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteStatementMutation,
  DeleteStatementMutationVariables
>;
export const EditDailyReportDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'EditDailyReport' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DailyReportInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'dailyReportId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateDailyReport' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'dailyReportId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'dailyReportId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  EditDailyReportMutation,
  EditDailyReportMutationVariables
>;
export const EditProjectDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'EditProject' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ProjectInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateProject' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'production_company' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'end_date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'is_active' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'last_update_user_id' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EditProjectMutation, EditProjectMutationVariables>;
export const EditProjectUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'EditProjectUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ProjectUserInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'updateProjectUserId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateProjectUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'updateProjectUserId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  EditProjectUserMutation,
  EditProjectUserMutationVariables
>;
export const EditRateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'EditRate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'RateInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'rateId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateRate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'rateId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'rateId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'standard_rate' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'overtime_hour1' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'overtime_hour2' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'overtime_hour3' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'overtime_hour4' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'compensation_rate' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EditRateMutation, EditRateMutationVariables>;
export const UpdateShootingDayDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateShootingDay' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ShootingDayInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'shootingDayId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateShootingDay' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'shootingDayId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'shootingDayId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'project' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateShootingDayMutation,
  UpdateShootingDayMutationVariables
>;
export const UpdateStatementDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateStatement' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'StatementInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updatestatement' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'projectUser' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'start_date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                { kind: 'Field', name: { kind: 'Name', value: 'to' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shift_lenght' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'calculated_overtime' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'claimed_overtime' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'create_date' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'last_update_date' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'create_user_id' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'last_update_user_id' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'kilometers' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateStatementMutation,
  UpdateStatementMutationVariables
>;
export const EditUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'EditUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UserInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'is_active' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EditUserMutation, EditUserMutationVariables>;
export const InviteUserToProjectDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'InviteUserToProject' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectUserId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inviteUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'email' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'name' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectUserId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectUserId' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  InviteUserToProjectMutation,
  InviteUserToProjectMutationVariables
>;
export const UpdateAndActivateProjectUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateAndActivateProjectUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ProjectUserInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'updateProjectUserId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'updateRateData' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'RateInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'rateId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateRate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'updateRateData' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'rateId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'rateId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'compensation_rate' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'overtime_hour1' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'overtime_hour2' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'overtime_hour3' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'overtime_hour4' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'standard_rate' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateProjectUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'updateProjectUserId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'position' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'number_of_people' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'is_team_leader' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'create_date' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'create_user_id' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'last_update_user_id' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'last_update_date' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'is_active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                { kind: 'Field', name: { kind: 'Name', value: 'invitation' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'phone_number' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateAndActivateProjectUserMutation,
  UpdateAndActivateProjectUserMutationVariables
>;
export const UpdateDepartmentOrderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateDepartmentOrder' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DepartmentInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateDepartment' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'departmentId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'order_index' } },
                { kind: 'Field', name: { kind: 'Name', value: 'is_visible' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateDepartmentOrderMutation,
  UpdateDepartmentOrderMutationVariables
>;
export const UpdateUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UserInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'phone_number' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'last_update_date' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteProjectUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteProjectUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectUserId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteProjectUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectUserId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectUserId' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteProjectUserMutation,
  DeleteProjectUserMutationVariables
>;
export const QuacksDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Quacks' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '_empty' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<QuacksQuery, QuacksQueryVariables>;
export const GetAllCarsOnProjectByProjectUserIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAllCarsOnProjectByProjectUserId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'projectUsers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'car' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'kilometer_allow' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'kilometer_rate' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'statement' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'kilometers' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'car' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'kilometer_allow' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'kilometer_rate' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetAllCarsOnProjectByProjectUserIdQuery,
  GetAllCarsOnProjectByProjectUserIdQueryVariables
>;
export const GetAllProjectUsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAllProjectUsers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'projectUsers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'car' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'kilometer_allow' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'kilometer_rate' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'rate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'compensation_rate' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'standard_rate' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'overtime_hour1' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'overtime_hour2' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'overtime_hour3' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'overtime_hour4' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetAllProjectUsersQuery,
  GetAllProjectUsersQueryVariables
>;
export const GetCarsByProjectUserIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCarsByProjectUserId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectUserId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'carsByProjectUserId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectUserId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectUserId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'kilometer_allow' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'kilometer_rate' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'create_user_id' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'last_update_user_id' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'last_update_date' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'create_date' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCarsByProjectUserIdQuery,
  GetCarsByProjectUserIdQueryVariables
>;
export const GetCrewListInfoDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCrewListInfo' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'project' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'start_date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'end_date' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'production_company' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'is_active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'create_date' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'create_user_id' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'last_update_date' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'last_update_user_id' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'departments' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'is_visible' } },
                { kind: 'Field', name: { kind: 'Name', value: 'order_index' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'projectUsers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'is_active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'position' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'rate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'compensation_rate' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'create_date' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'create_user_id' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'last_update_date' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'last_update_user_id' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'overtime_hour1' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'overtime_hour2' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'overtime_hour3' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'overtime_hour4' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'standard_rate' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'invitation' } },
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'phone_number' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'department' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'is_visible' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'order_index' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'userRoleInProject' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userId' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCrewListInfoQuery,
  GetCrewListInfoQueryVariables
>;
export const GetProjectUserDetailsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProjectUserDetails' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'projectUserDetails' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'project' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currency' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'is_active' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetProjectUserDetailsQuery,
  GetProjectUserDetailsQueryVariables
>;
export const GetDailyReportByShootingDayDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetDailyReportByShootingDay' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'shootingDayId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shootingDay' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'shootingDayId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'dailyReport' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'intro' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shooting_progress' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'footer' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetDailyReportByShootingDayQuery,
  GetDailyReportByShootingDayQueryVariables
>;
export const DailyReportPreviewInfoDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'DailyReportPreviewInfo' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'date' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DateTimeISO' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'shootingDayId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'statementsByProjectIdAndDate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'date' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'date' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'start_date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                { kind: 'Field', name: { kind: 'Name', value: 'to' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'claimed_overtime' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'projectUser' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'surname' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'position' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'department' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'order_index' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'is_visible' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'project' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'production_company' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shootingDays' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shootingDay' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'shootingDayId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shooting_day_number' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'dailyReport' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'intro' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shooting_progress' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'footer' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DailyReportPreviewInfoQuery,
  DailyReportPreviewInfoQueryVariables
>;
export const DepartmentsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Departments' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'departments' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'is_visible' } },
                { kind: 'Field', name: { kind: 'Name', value: 'order_index' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DepartmentsQuery, DepartmentsQueryVariables>;
export const LastDailyReportByProjectIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'LastDailyReportByProjectId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'lastDailyReportByProjectId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'intro' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shooting_progress' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'footer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'create_date' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'last_update_date' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shootingDay' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shooting_day_number' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  LastDailyReportByProjectIdQuery,
  LastDailyReportByProjectIdQueryVariables
>;
export const GetProjectByProjectUserTokenDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProjectByProjectUserToken' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'token' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'projectUsersByToken' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'token' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'token' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'project' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetProjectByProjectUserTokenQuery,
  GetProjectByProjectUserTokenQueryVariables
>;
export const GetProjectDetailDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProjectDetail' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'project' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'start_date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'end_date' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'production_company' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'is_active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'create_date' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'create_user_id' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'last_update_date' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'last_update_user_id' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'projectUsers' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetProjectDetailQuery,
  GetProjectDetailQueryVariables
>;
export const GetProjectUserByTokenDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProjectUserByToken' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'token' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'projectUsersByToken' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'token' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'token' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'position' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'is_active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                { kind: 'Field', name: { kind: 'Name', value: 'invitation' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'phone_number' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'project' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currency' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'rate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'standard_rate' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'overtime_hour1' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'overtime_hour2' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'overtime_hour3' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'overtime_hour4' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'compensation_rate' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'department' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetProjectUserByTokenQuery,
  GetProjectUserByTokenQueryVariables
>;
export const ProjectUsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ProjectUsers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'projectUsers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'is_active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'position' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'department' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'surname' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'rate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'invitation' } },
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'phone_number' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProjectUsersQuery, ProjectUsersQueryVariables>;
export const ProjectUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ProjectUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'token' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'projectUsersByToken' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'token' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'token' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'position' } },
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'phone_number' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'project' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'surname' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'rate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'standard_rate' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'overtime_hour1' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'overtime_hour2' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'overtime_hour3' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'overtime_hour4' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'department' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProjectUserQuery, ProjectUserQueryVariables>;
export const GetProjectsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProjects' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'projects' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetProjectsQuery, GetProjectsQueryVariables>;
export const ShootingDaysByProjectDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ShootingDaysByProject' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shootingDaysByProject' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shooting_day_number' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'event_type' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ShootingDaysByProjectQuery,
  ShootingDaysByProjectQueryVariables
>;
export const GetShootingDaysByProjectDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetShootingDaysByProject' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shootingDaysByProject' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shooting_day_number' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'event_type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'dailyReport' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'intro' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shooting_progress' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'footer' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetShootingDaysByProjectQuery,
  GetShootingDaysByProjectQueryVariables
>;
export const GetCrewStatementsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCrewStatements' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectUserId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'statementsByProjectUserId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectUserId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectUserId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'projectUser' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'surname' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'rate' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'compensation_rate',
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'standard_rate' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'overtime_hour1' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'overtime_hour2' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'overtime_hour3' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'overtime_hour4' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'start_date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                { kind: 'Field', name: { kind: 'Name', value: 'to' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shift_lenght' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'calculated_overtime' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'claimed_overtime' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'create_date' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'car' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'kilometer_allow' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'kilometer_rate' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'kilometers' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCrewStatementsQuery,
  GetCrewStatementsQueryVariables
>;
export const GetAdminStatementsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAdminStatements' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'statementsByProjectId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'projectUser' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'surname' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'rate' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'compensation_rate',
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'standard_rate' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'overtime_hour1' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'overtime_hour2' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'overtime_hour3' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'overtime_hour4' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'start_date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                { kind: 'Field', name: { kind: 'Name', value: 'to' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shift_lenght' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'calculated_overtime' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'claimed_overtime' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'create_date' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'car' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'kilometer_allow' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'kilometer_rate' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'kilometers' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetAdminStatementsQuery,
  GetAdminStatementsQueryVariables
>;
export const CarStatementsByProjectIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'CarStatementsByProjectId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'carStatementsByProjectId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'car_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'kilometers' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CarStatementsByProjectIdQuery,
  CarStatementsByProjectIdQueryVariables
>;
export const GetUserProfileSettingsInfoDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUserProfileSettingsInfo' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'surname' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'phone_number' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'last_update_date' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'create_date' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetUserProfileSettingsInfoQuery,
  GetUserProfileSettingsInfoQueryVariables
>;
export const GetUserProjectsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUserProjects' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'userProjects' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'is_active' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetUserProjectsQuery,
  GetUserProjectsQueryVariables
>;
export const GetUserRoleInProjectDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUserRoleInProject' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'projectId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'userRoleInProject' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'projectId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'projectId' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetUserRoleInProjectQuery,
  GetUserRoleInProjectQueryVariables
>;
export const ForgotPasswordDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ForgotPassword' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'forgotPassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'email' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export const SignInDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SignIn' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'password' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'signIn' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'email' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'password' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'surname' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const ResetPasswordDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ResetPassword' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'newPassword' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'token' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'resetPassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'newPassword' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'newPassword' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'token' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'token' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'surname' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;
export const SignUpDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SignUp' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'surname' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'password' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'signUp' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'email' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'name' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'surname' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'surname' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'password' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'surname' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
