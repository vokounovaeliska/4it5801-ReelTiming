import { gql } from '@apollo/client';

export const ADD_RATE = gql`
  mutation AddRate(
    $standardRate: Float!
    $compensationRate: Float!
    $overtimeHour1: Float!
    $overtimeHour2: Float!
    $overtimeHour3: Float!
    $overtimeHour4: Float!
  ) {
    addRate(
      standard_rate: $standardRate
      compensation_rate: $compensationRate
      overtime_hour1: $overtimeHour1
      overtime_hour2: $overtimeHour2
      overtime_hour3: $overtimeHour3
      overtime_hour4: $overtimeHour4
    ) {
      id
    }
  }
`;
