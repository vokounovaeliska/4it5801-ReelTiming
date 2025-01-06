import { gql } from '@frontend/gql';

export const GET_PROJECTS = gql(`
  query GetProjects {
    projects {
      id
      name
      description
    }
  }
`);
