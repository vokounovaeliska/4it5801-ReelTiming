import { gql } from '@apollo/client';

export const EDIT_RATE = gql`
  mutation Mutation($data: RateInput!, $rateId: String!) {
    updateRate(data: $data, rateId: $rateId) {
      id
      standard_rate
      overtime_hour1
      overtime_hour2
      overtime_hour3
      overtime_hour4
      compensation_rate
    }
  }
`;
