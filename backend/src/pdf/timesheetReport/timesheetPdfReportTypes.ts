export interface StatementPdf {
  start_date: Date;
  from: Date;
  to: Date;
  shift_lenght: number;
  calculated_overtime: number;
  claimed_overtime: number;
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
