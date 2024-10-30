import { gql } from '@apollo/client';

export const INVITE_USER_TO_PROJECT = gql`
  mutation Mutation($userId: String!, $projectId: String!) {
    inviteUser(userId: $userId, projectId: $projectId)
  }
`;
