import { Car, CarStatement } from '@frontend/modules/timesheets/interfaces';

export interface CrewMemberData {
  id: string;
  name: string;
  surname: string;
  department: string;
  position?: string | null;
  phone_number: string;
  email: string;
  standard_rate?: number | null;
  compensation_rate?: number | null;
  overtime_hour1?: number | null;
  overtime_hour2?: number | null;
  overtime_hour3?: number | null;
  overtime_hour4?: number | null;
  role?: string | null;
  user_id: string | null;
  rate_id: string | null;
  cars: Car[] | null;
}

export interface CarData {
  vehicle_name: string;
  included_mileage: number;
  extra_mileage: number;
}

export interface ProjectUser {
  id: string;
  user?: {
    id: string;
  } | null;
  department?: { name: string; id: string } | null;
  role?: string | null;
  position?: string | null;
  phone_number?: string | null;
  is_active: boolean;
  invitation?: string | null;
  name: string;
  surname: string;
  email: string;
  rate?: {
    id: string;
    create_date?: string;
    standard_rate?: number | null;
    compensation_rate?: number | null;
    overtime_hour1?: number | null;
    overtime_hour2?: number | null;
    overtime_hour3?: number | null;
    overtime_hour4?: number | null;
  } | null;
  car?: Car[] | null;
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
