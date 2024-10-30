import { gql } from '@apollo/client';

export const GET_PROJECT_USER_BY_TOKEN = gql`
  query GetProjectUserByToken($token: String!) {
    projectUsersByToken(token: $token) {
      is_active
      invitation
    }
  }
`;
