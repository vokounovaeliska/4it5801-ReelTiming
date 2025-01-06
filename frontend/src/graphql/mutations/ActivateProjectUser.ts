import { gql } from '@frontend/gql';

export const ACTIVATE_PROJECT_USER = gql(`
  mutation ActivateProjectUser($userId: String!, $token: String!) {
    activateProjectUser(userId: $userId, token: $token)
  }
`);
