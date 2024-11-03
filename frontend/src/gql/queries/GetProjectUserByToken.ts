import { gql } from '@apollo/client';

export const GET_PROJECT_USER_BY_TOKEN = gql`
  query GetProjectUserByToken($token: String!) {
    projectUsersByToken(token: $token) {
      id
      position
      name
      surname
      email
      is_active
      role
      invitation
      phone_number
      project {
        id
        name
        description
      }
      rate {
        standard_rate
        overtime_hour1
        overtime_hour2
        overtime_hour3
        overtime_hour4
        compensation_rate
        id
      }
      department {
        id
        name
      }
    }
  }
`;
