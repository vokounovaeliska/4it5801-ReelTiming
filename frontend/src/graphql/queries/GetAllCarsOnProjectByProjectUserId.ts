import { gql } from '@frontend/gql';

export const GET_ALL_CARS_ON_PROJECT_BY_PROJECTUSER_ID = gql(`
  query GetAllCarsOnProjectByProjectUserId($projectId: String!) {
    projectUsers(projectId: $projectId) {
      id
      name
      surname
      car {
        id
        name
        kilometer_allow
        kilometer_rate
      }
      statement {
        id
        kilometers
        car {
          id
          kilometer_allow
          kilometer_rate
          name
        }
      }
    }
  }
`);
