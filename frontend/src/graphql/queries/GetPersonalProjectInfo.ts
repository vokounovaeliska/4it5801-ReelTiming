import { gql } from '@frontend/gql';

export const GET_PERSONAL_PROJECT_INFO = gql(`
  query GetPersonalProjectInfo($projectId: String!, $userId: String!) {
    projectUserByUserIdAndProjectId(projectId: $projectId, userId: $userId) {
    id
      is_active
      position
      email
      name
      surname
      invitation
      role
      phone_number
      user {
        id
      }
      rate {
        id
        compensation_rate
        create_date
        create_user_id
        last_update_date
        last_update_user_id
        overtime_hour1
        overtime_hour2
        overtime_hour3
        overtime_hour4
        standard_rate
      }
      department {
        name
        id
        is_visible
        order_index
      }
    car {
      id
      name
      kilometer_allow
      kilometer_rate
    }
  }
  project(id: $projectId) {
    id
    name
    currency
    is_active
    departments {
      id
      name
      order_index
      is_visible
    }
  }
}
`);
