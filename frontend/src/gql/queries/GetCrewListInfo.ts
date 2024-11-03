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
    }
    departments {
      id
      name
    }
    projectUsers(projectId: $projectId) {
      id
      is_active
      position
      user {
        name
        surname
        email
        id
        phone_number
        is_active
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
