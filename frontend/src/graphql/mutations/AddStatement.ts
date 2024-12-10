import { gql } from '@frontend/gql';

export const ADD_STATEMENT = gql(`
  mutation AddStatement(
    $project_user_id: String!
    $start_date: DateTimeISO!
    $from: DateTimeISO!
    $to: DateTimeISO!
    $shift_lenght: Float!
    $calculated_overtime: Float
    $claimed_overtime: Float
    $car_id: String
    $kilometers: Float
  ) {
    addStatement(
      project_user_id: $project_user_id
      start_date: $start_date
      from: $from
      to: $to
      shift_lenght: $shift_lenght
      calculated_overtime: $calculated_overtime
      claimed_overtime: $claimed_overtime
      car_id: $car_id
      kilometers: $kilometers
    ) {
      id
      projectUser {
        id
        user {
          id
          name
          surname
        }
      }
      start_date
      from
      to
      shift_lenght
      calculated_overtime
      claimed_overtime
      create_date
    }
  }
`);
