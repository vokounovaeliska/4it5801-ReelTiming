import { gql } from '@apollo/client';

export const DELETE_PROJECT_USER = gql`
  mutation DeleteProjectUser($userId: String!, $projectId: String!) {
    deleteProjectUser(userId: $userId, projectId: $projectId)
  }
`;
