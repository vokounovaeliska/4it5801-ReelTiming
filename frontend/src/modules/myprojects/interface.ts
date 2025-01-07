export interface Statement {
  kilometers?: number | null;
  projectUser: {
    id: string;
    rate?: {
      standard_rate?: number | null;
      overtime_hour1?: number | null;
      overtime_hour2?: number | null;
      overtime_hour3?: number | null;
      overtime_hour4?: number | null;
    } | null;
  };
  shift_lenght: number;
  claimed_overtime?: number | null;
  car?: {
    id: string;
    kilometer_allow: number;
    kilometer_rate: number;
    name: string;
  } | null;
}

export interface Timesheet {
  id: string;
  start_date: string;
  shift_lenght: number;
  from: string;
  to: string;
  claimed_overtime?: number | null;
  create_date: string;
  projectUser: {
    id: string;
    name: string;
    surname: string;
  };
}

export interface UserProjectInfo {
  project: {
    id: string;
    name: string;
  };
  id: string;
  name: string;
  surname: string;
}

export interface ProjectUser {
  id: string;
  is_active: boolean;
  name: string;
  surname: string;
  department?: {
    name: string;
    id: string;
  } | null;
  rate?: {
    create_date?: string;
  } | null;
}
