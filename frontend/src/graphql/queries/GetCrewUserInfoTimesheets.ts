import { gql } from '@frontend/gql';

export const GET_CREWUSERINFO_TIMESHEETS = gql(`
  query GetProjectUserDetails($userId: String!, $projectId: String!) {
    projectUserDetails(userId: $userId, projectId: $projectId) {
      project {
        id
        name
        currency
        is_active
      }
      id
      name
      surname
      email
    }
  }
`);
