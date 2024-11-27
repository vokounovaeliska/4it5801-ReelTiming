import { gql } from '@apollo/client';

export const GET_ALL_PROJECT_USERS = gql`
  query GetAllProjectUsers($projectId: String!) {
    projectUsers(projectId: $projectId) {
      id
      name
      surname
    }
  }
`;
