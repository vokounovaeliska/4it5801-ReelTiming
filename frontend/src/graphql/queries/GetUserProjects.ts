import { gql } from '@frontend/gql';

export const GET_USER_PROJECTS = gql(`
  query GetUserProjects($userId: String!) {
    userProjects(userId: $userId) {
      id
      name
      description
      is_active
    }
  }

`);
