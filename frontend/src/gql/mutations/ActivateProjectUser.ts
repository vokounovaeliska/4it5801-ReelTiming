import { gql } from '@apollo/client';

export const ACTIVATE_PROJECT_USER = gql`
  mutation Mutation($userId: String!, $token: String!) {
    activateProjectUser(userId: $userId, token: $token)
  }
`;
