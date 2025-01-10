import { gql } from '@frontend/gql';

export const UPDATE_DEPARTMENT_ORDER = gql(`
  mutation UpdateDepartmentOrder($id: String!, $data: DepartmentInput!) {
    updateDepartment(departmentId: $id, data: $data) {
      id
      name
      order_index
      is_visible
    }
  }
`);
