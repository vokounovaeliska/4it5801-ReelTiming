import { gql } from '@frontend/gql';

export const GET_CARS_BY_PROJECT_USER_ID = gql(`
  query GetCarsByProjectUserId($projectUserId: String!) {
    carsByProjectUserId(projectUserId: $projectUserId) {
      id
      name
      kilometer_allow
      kilometer_rate
      create_user_id
      last_update_user_id
      last_update_date
      create_date
    }
  }
`);
