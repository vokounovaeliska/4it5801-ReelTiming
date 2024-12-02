import { gql } from '@apollo/client';

export const GET_ALL_PROJECT_USERS = gql`
  query GetAllProjectUsers($projectId: String!) {
    projectUsers(projectId: $projectId) {
      id
      name
      surname
      car {
        id
        name
        kilometer_allow
        kilometer_rate
      }
      rate {
        compensation_rate
        standard_rate
        overtime_hour1
        overtime_hour2
        overtime_hour3
        overtime_hour4
      }
    }
  }
`;
