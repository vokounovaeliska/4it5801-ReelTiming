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
    user: UserInfo;
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
  };
}

export interface UserOption {
  value: string;
  label: string;
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
  // TODO - figure out the type of this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authUser: any;
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
