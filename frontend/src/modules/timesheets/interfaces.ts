import { MultiValue, ActionMeta } from 'react-select';
import React from 'react';
import { ProjectUser } from '../crewlist/interfaces/interfaces';

export interface UserInfo {
  id: string;
  name: string;
  surname: string;
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
    rate?: {
      standard_rate: number;
      overtime_hour1: number;
      overtime_hour2: number;
      overtime_hour3: number;
      overtime_hour4: number;
      compensation_rate: number;
    };
  };
  create_date: string;
  car?: {
    name: string;
    id: string;
    kilometer_allow?: number;
    kilometer_rate?: number;
  };
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
    rate?: {
      compensation_rate: number;
      standard_rate: number;
      overtime_hour1: number;
      overtime_hour2: number;
      overtime_hour3: number;
      overtime_hour4: number;
    };
  };
  carId?: string;
  kilometers?: number;
  // userCars?: { id: string; name: string }[];
  car?: {
    name: string;
    id: string;
    kilometer_allow?: number;
    kilometer_rate?: number;
  };
}

export interface UserOption {
  value: string;
  label: string;
}

export interface UserAuth {
  id: string;
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
  // setSelectedUser: (userId: string) => void;
  setSelectedCar: (carId: string) => void;
  // allCarsOnProject: Car[];
  carOptionsForLoggedInUser: Car[];
  allCarsOnProjectData: AllCarsOnProjectData;
  userInfoRates: TimesheetProjectUsers;
  projectCurrency: string;
}

export interface Car {
  id: string;
  name: string;
  kilometer_allow: number;
  kilometer_rate: number;
}

export interface AllCarsOnProjectData {
  projectUsers: ProjectUser[];
}

export interface TimesheetProjectUsers {
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
    rate: {
      compensation_rate: number;
      standard_rate: number;
      overtime_hour1: number;
      overtime_hour2: number;
      overtime_hour3: number;
      overtime_hour4: number;
    };
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
