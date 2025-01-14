export interface StatementPdf {
  start_date: Date;
  from: Date;
  to: Date;
  shift_lenght: number;
  calculated_overtime: number;
  claimed_overtime: number;
  kilometers: number | null;
  car_name: string | null;
  kilometer_allow: number | null;
  kilometer_rate: number | null;
}

export interface CrewInfoPdf {
  projectUser: {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone_number: string;
    position: string;
  };
  department: {
    name: string;
  };
  project: {
    name: string;
    description: string;
    currency: string;
    logo?: string | null;
  };
  rate: {
    standard_rate: number;
    overtime_hour1: number;
    overtime_hour2: number;
    overtime_hour3: number;
    overtime_hour4: number;
    compensation_rate: number;
  };
}

export interface DateRange {
  start_date: Date;
  end_date: Date;
}
