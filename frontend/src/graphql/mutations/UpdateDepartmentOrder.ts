import { gql } from '@frontend/gql';

export const UPDATE_DEPARTMENT_ORDER = gql(`
  mutation UpdateDepartmentOrder($id: String!, $data: DepartmentInput!) {
    updateDepartment(id: $id, data: $data) {
      id
      name
      project_id
      order_index
      is_visible
    }
  }
`);
