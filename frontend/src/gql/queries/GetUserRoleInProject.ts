import { gql } from '@apollo/client';

export const GET_USER_ROLE_IN_PROJECT = gql`
  query GetUserRoleInProject($userId: String!, $projectId: String!) {
    userRoleInProject(userId: $userId, projectId: $projectId)
  }
`;
