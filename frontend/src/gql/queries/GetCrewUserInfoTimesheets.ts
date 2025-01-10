import { gql } from '@apollo/client';

export const GET_CREWUSERINFO_TIMESHEETS = gql`
  query GetProjectUserDetails($userId: String!, $projectId: String!) {
    projectUserDetails(userId: $userId, projectId: $projectId) {
      project {
        id
        name
        currency
      }
      id
      name
      surname
    }
  }
`;
