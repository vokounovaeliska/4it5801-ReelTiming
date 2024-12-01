import { gql } from '@apollo/client';

export const GET_CARS_BY_PROJECT_USER_ID = gql`
  query GetCarsByProjectUserId($projectUserId: String!) {
    carsByProjectUserId(projectUserId: $projectUserId) {
      id
      name
    }
  }
`;
