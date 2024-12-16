import { MultiValue, ActionMeta } from 'react-select';
import React from 'react';
// import { ProjectUser } from '../crewlist/interfaces/interfaces';
import { Control } from 'react-hook-form';
import { UseFormSetValue } from 'react-hook-form';
import { ProjectUser } from '../crewlist/interfaces/interfaces';

export interface UserInfo {
  id: string;
  name: string;
  surname: string;
}

export interface Rate {
  compensation_rate: number;
  standard_rate: number;
  overtime_hour1: number;
  overtime_hour2: number;
  overtime_hour3: number;
  overtime_hour4: number;
}

export interface Car {
  id: string;
  name: string;
  kilometer_allow: number;
  kilometer_rate: number;
}

export interface Timesheet {
  id: string;
  start_date: string;
  end_date: string;
  from: string;
  to: string;
  shift_lenght: number;
  calculated_overtime: number;
  claimed_overtime: number;
  projectUser: {
    id: string;
    name: string;
    surname: string;
    rate?: Rate;
  };
  create_date: string;
  car?: Car;
  car_id?: string;
  kilometers?: number;
}

export interface TimesheetFormValues {
  start_date: string;
  end_date: string;
  shift_lenght: number;
  from: string;
  to: string;
  calculated_overtime: number;
  claimed_overtime: number;
  projectUser: {
    id: string;
    name: string;
    surname: string;
    rate?: Rate;
  };
  carId?: string;
  kilometers?: number;
  car?: Car;
}

export interface UserOption {
  value: string;
  label: string;
}

export interface UserAuth {
  id: string;
  email: string;
  role: string;
}

export interface TimesheetsTemplateProps {
  startDate: string;
  endDate: string;
  handleDateChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'start' | 'end',
  ) => void;
  userOptions: UserOption[];
  handleUserChange: (
    newValue: MultiValue<UserOption>,
    actionMeta: ActionMeta<UserOption>,
  ) => void;
  handleAddClick: () => void;
  sortedTimesheets: Timesheet[];
  handleRowClick: (timesheet: Timesheet) => void;
  onDeleteClick: (id: string) => void;
  projectId: string;
  userRole: string;
  projectName: string;
  projectCurrency: string;
  projectUserId: string;
  authUser: UserAuth;
  selectedUsers: UserOption[];
}

export interface TimesheetsFormProps {
  projectId: string;
  initialValues?: TimesheetFormValues;
  onClose: () => void;
  mode: 'add' | 'edit';
  onSubmit: (data: TimesheetFormValues) => void;
  userRole: string;
  userOptions: UserOption[];
  userInfo: UserInfo | null;
  userCars?: { id: string; name: string }[];
  setSelectedCar: (carId: string) => void;
  // carOptionsForLoggedInUserForSelect: { value: string; label: string }[];
  carOptionsForLoggedInUser: { value: string; label: string }[];
  // carOptionsForLoggedInUser: Car[];
  allCarsOnProjectData: AllCarsOnProjectData;
  userInfoRates: TimesheetProjectUsers;
  projectCurrency: string;
}

export interface AllCarsOnProjectData {
  projectUsers: ProjectUser[];
  // cars: Car[];
}

export interface TimesheetProjectUsers {
  projectUserss?: ProjectUser[];
  projectUsers: {
    id: string;
    name: string;
    surname: string;
    car: {
      id: string;
      name: string;
      kilometer_allow: number;
      kilometer_rate: number;
    };
    rate?: {
      compensation_rate: number;
      standard_rate: number;
      overtime_hour1: number;
      overtime_hour2: number;
      overtime_hour3: number;
      overtime_hour4: number;
    } | null;
  }[];
  id: string;
  name: string;
  surname: string;
  car: {
    id: string;
    name: string;
    kilometer_allow: number;
    kilometer_rate: number;
  };
  rate: {
    compensation_rate: number;
    standard_rate: number;
    overtime_hour1: number;
    overtime_hour2: number;
    overtime_hour3: number;
    overtime_hour4: number;
  };
}

export interface OvertimeSectionProps {
  // control: Control<FormValues>;
  control: Control<TimesheetFormValues>;
}

export interface DateTimeSectionProps {
  // control: Control<FormValues>;
  control: Control<TimesheetFormValues>;
}

export interface SummarySectionProps {
  mode: 'add' | 'edit';
  workedHours: number;
  shift: number;
  claimedOvertime: number;
  userRates: Rate | null;
  initialValues: TimesheetFormValues;
  projectCurrency: string;
  selectedCar: string | null;
  isCarVisible: boolean;
  kilometers?: number;
  carRates: Car | null;
  selectedCarDetails: Car | null;
}

export interface CarSectionProps {
  userRole: string;
  mode: 'add' | 'edit';
  control: Control<TimesheetFormValues>;
  isCarVisible: boolean;
  setIsCarVisible: (isVisible: boolean) => void;
  selectedCar: string | null;
  setSelectedCar: (carId: string | null) => void;
  selectedCarDetails: Car | null;
  setSelectedCarDetails: (car: Car | null) => void;
  setClaimedKilometers: (kilometers: number) => void;
  getAvailableCars: () => {
    id: string;
    name: string;
    kilometer_allow: number;
    kilometer_rate: number;
  }[];
  projectCurrency: string;
  // carOptionsForLoggedInUser: Car[];
  carOptionsForLoggedInUser: { value: string; label: string }[];
  setValue: UseFormSetValue<TimesheetFormValues>;
}

export type FormValues = {
  from: string;
  to: string;
  projectUser: {
    id: string;
    name: string;
    surname: string;
  };
  carId: string | undefined;
  start_date: string;
  end_date: string;
  shift_lenght: number;
  calculated_overtime: number;
  claimed_overtime: number;
  kilometers: number;
  car?: Car;
};

export interface UserInfoData {
  projectUserDetails: {
    id: string;
    project: {
      name: string;
      currency: string;
    };
  };
}

export interface UseAddTimesheetProps {
  projectId: string;
  userRole: string;
  userInfoData: UserInfoData;
  userInfo: UserInfo | null;
}

export interface UseDeleteTimesheetProps {
  projectId: string;
  userRole: string;
  userInfoData: UserInfoData;
}

export interface UseEditTimesheetProps {
  projectId: string;
  userRole: string;
  userInfoData: UserInfoData;
  selectedTimesheet: Timesheet | null;
  userInfo: UserInfo | null;
}

export interface DataLoadingUtilsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  auth: any;
  projectId: string;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
}

export interface Statement {
  id: string;
  projectUser: ProjectUser;
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
  car_id?: string | null;
  kilometers?: number | null;
}

export interface RoleData {
  userRoleInProject: string;
}

export interface CrewData {
  statementsByProjectUserId: Timesheet[];
}

export interface AdminData {
  statementsByProjectId: Timesheet[];
}

export interface AllProjectUsersData {
  projectUsers: TimesheetProjectUsers;
}

export interface AllProjectUsersDataForOptions {
  projectUsers: ProjectUser[];
}

export interface UserCarsData {
  carsByProjectUserId: Car[];
}

export interface DataLoadingUtilsResult {
  isDataAvailable: boolean;
  loading: boolean;
  error: boolean | string;
  roleData: RoleData;
  crewData: CrewData | null;
  adminData: AdminData | null;
  allProjectUsersData: AllProjectUsersData;
  allProjectUsersDataForOptions: AllProjectUsersDataForOptions;
  // allProjectUsersData: TimesheetProjectUsers;
  allCarsOnProjectData: AllCarsOnProjectData;
  userInfoData: UserInfoData;
  userCarsData: UserCarsData;
}

export interface CarStatement {
  car_id: string;
  kilometers: string;
}
