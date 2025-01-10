import { Car, CarStatement } from '@frontend/modules/timesheets/interfaces';

export interface CrewMemberData {
  id: string;
  name: string;
  surname: string;
  department: string;
  position: string;
  phone_number: string;
  email: string;
  standard_rate: number;
  compensation_rate: number;
  overtime_hour1: number;
  overtime_hour2: number;
  overtime_hour3: number;
  overtime_hour4: number;
  role: string;
  user_id: string | null;
  rate_id: string | null;
  cars: Car[] | null;
  // cars:
  //   | [
  //       {
  //         vehicle_name: string;
  //         included_mileage: number;
  //         extra_mileage: number;
  //       },
  //     ]
  //   | null;
}

export interface CarData {
  vehicle_name: string;
  included_mileage: number;
  extra_mileage: number;
}

export interface ProjectUser {
  id: string;
  user: {
    id: string;
  };
  department: { name: string; id: string } | null;
  role: string;
  position: string;
  phone_number: string;
  is_active: boolean;
  invitation: string;
  name: string;
  surname: string;
  email: string;
  rate: {
    id: string;
    standard_rate: number;
    compensation_rate: number;
    overtime_hour1: number;
    overtime_hour2: number;
    overtime_hour3: number;
    overtime_hour4: number;
  } | null;
  car: Car[] | null;
}

export interface CrewAlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export type CrewListTemplateProps = {
  projectId: string;
  projectCurrency: string;
  cars: Car[];
  carStatements: CarStatement[];
};
