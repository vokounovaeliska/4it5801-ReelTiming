import { gql } from '@frontend/gql';

export const DELETE_PROJECT_USER = gql(`
  mutation DeleteProjectUser($projectUserId: String!) {
    deleteProjectUser(projectUserId: $projectUserId)
  }
`);
