import { gql } from '@frontend/gql';

export const GET_DEPARTMENTS = gql(`
  query Departments($projectId: String!) {
    departments(projectId: $projectId) {
      id
      name
      is_visible
      order_index
    }
  }
`);
