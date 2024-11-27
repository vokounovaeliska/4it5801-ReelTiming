import { MultiValue, ActionMeta } from 'react-select';
import React from 'react';

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
  };
  create_date: string;
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
}
