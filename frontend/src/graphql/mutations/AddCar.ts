import { gql } from '@frontend/gql';

export const ADD_CAR = gql(`
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
`);

export const DELETE_CAR = gql(`
  mutation DeleteCar($deleteCarId: String!) {
    deleteCar(id: $deleteCarId)
  }
`);

export const UPDATE_CAR = gql(`
  mutation UpdateCar($data: CarInput!, $updateCarId: String!) {
    updateCar(data: $data, id: $updateCarId) {
      kilometer_allow
      kilometer_rate
      name
      id
    }
  }
`);
