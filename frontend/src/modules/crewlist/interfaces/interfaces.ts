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
}

export interface CrewAlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export type CrewListTemplateProps = {
  projectId: string;
};
