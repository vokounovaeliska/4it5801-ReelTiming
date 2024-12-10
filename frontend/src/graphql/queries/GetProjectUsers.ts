import { gql } from '@frontend/gql';

export const GET_PROJECT_USERS = gql(`
  query ProjectUsers($projectId: String!) {
    projectUsers(projectId: $projectId) {
      id
      is_active
      position
      department {
        name
        id
      }
      user {
        name
        surname
        email
        id
      }
      rate {
        id
      }
      invitation
      role
      phone_number
    }
  }
`);
