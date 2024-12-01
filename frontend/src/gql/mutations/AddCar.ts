import { gql } from '@apollo/client';

export const ADD_CAR = gql`
  mutation AddCar(
    $kilometerRate: Float!
    $kilometerAllow: Float!
    $name: String!
    $projectUserId: String!
  ) {
    addCar(
      kilometer_rate: $kilometerRate
      kilometer_allow: $kilometerAllow
      name: $name
      project_user_id: $projectUserId
    ) {
      name
      projectUser {
        id
      }
    }
  }
`;
