export interface RoleData {
  userRoleInProject: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  start_date?: string | null;
  end_date?: string | null;
  production_company: string;
  is_active: boolean;
  currency: string;
}
