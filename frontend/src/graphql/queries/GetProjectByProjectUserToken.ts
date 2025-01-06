import { gql } from '@frontend/gql';

export const GET_PROJECT_BY_PROJECT_USER_TOKEN = gql(`
  query GetProjectByProjectUserToken($token: String!) {
    projectUsersByToken(token: $token) {
      project {
        name
      }
    }
  }
`);
