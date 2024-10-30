import { gql } from '@apollo/client';

export const ADD_RATE = gql`
  mutation AddRate(
    $compensationRate: Float!
    $overtimeHour4: Float!
    $overtimeHour3: Float!
    $overtimeHour2: Float!
    $overtimeHour1: Float!
    $standardRate: Float!
  ) {
    addRate(
      compensation_rate: $compensationRate
      overtime_hour4: $overtimeHour4
      overtime_hour3: $overtimeHour3
      overtime_hour2: $overtimeHour2
      overtime_hour1: $overtimeHour1
      standard_rate: $standardRate
    ) {
      id
    }
  }
`;
