import { gql } from '@frontend/gql';

export const GET_CREW_STATEMENTS = gql(`
  query GetCrewStatements($projectUserId: String!) {
    statementsByProjectUserId(projectUserId: $projectUserId) {
      id
      projectUser {
        id
        name
        surname
        email
        rate {
          compensation_rate
          standard_rate
          overtime_hour1
          overtime_hour2
          overtime_hour3
          overtime_hour4
        }
      }
      start_date
      from
      to
      shift_lenght
      calculated_overtime
      claimed_overtime
      create_date
      car {
        id
        kilometer_allow
        kilometer_rate
        name
      }
      kilometers
    }
  }
`);

export const GET_ADMIN_STATEMENTS = gql(`
  query GetAdminStatements($projectId: String!) {
    statementsByProjectId(projectId: $projectId) {
      id
      projectUser {
        id
        name
        surname
        email
        rate {
          compensation_rate
          standard_rate
          overtime_hour1
          overtime_hour2
          overtime_hour3
          overtime_hour4
        }
      }
      start_date
      from
      to
      shift_lenght
      calculated_overtime
      claimed_overtime
      create_date
      car {
        id
        kilometer_allow
        kilometer_rate
        name
      }
      kilometers
    }
  }
  `);

export const GET_CARS_STATEMENTS = gql(`
  query CarStatementsByProjectId($projectId: String!) {
    carStatementsByProjectId(projectId: $projectId) {
      car_id
      kilometers
    }
  }
`);

export const GET_CARS_STATEMENTS_BY_CREW = gql(`
    query CarStatementsByProjectUserId($projectUserId: String!) {
    statementsByProjectUserId(projectUserId: $projectUserId) {
      car_id
     kilometers
  }
}
  `);
