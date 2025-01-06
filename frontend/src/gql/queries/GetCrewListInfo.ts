import { gql } from '@apollo/client';

export const GET_CREWLIST_INFO = gql`
  query GetCrewListInfo($projectId: String!, $userId: String!) {
    project(id: $projectId) {
      id
      name
      start_date
      end_date
      production_company
      is_active
      create_date
      create_user_id
      last_update_date
      last_update_user_id
      currency
    }
    departments(projectId: $projectId) {
      id
      name
    }
    projectUsers(projectId: $projectId) {
      id
      is_active
      position
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
      invitation
      role
      phone_number
      department {
        name
        id
      }
      email
      name
      surname
    }
    userRoleInProject(projectId: $projectId, userId: $userId)
  }
`;
