import { gql } from '@apollo/client';

export const GET_PROJECT_USERS_BY_TOKEN = gql`
  query ProjectUser($token: String!) {
    projectUsersByToken(token: $token) {
      id
      position
      role
      phone_number
      project {
        id
        name
        description
      }
      user {
        id
        name
        surname
        email
      }
      rate {
        standard_rate
        overtime_hour1
        overtime_hour2
        overtime_hour3
        overtime_hour4
      }
      department {
        id
        name
      }
    }
  }
`;
