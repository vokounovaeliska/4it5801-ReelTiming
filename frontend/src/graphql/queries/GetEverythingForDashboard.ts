import { gql } from '@frontend/gql';

export const GET_EVERYTHING_FOR_DASHBOARD = gql(`
  query GetEverythingForDashboard(
    $id: String!
    $userId: String!
    $projectId: String!
    $projectUserId: String!
  ) {
    project(id: $id) {
      id
      name
      description
      start_date
      end_date
      production_company
      is_active
      create_date
      create_user_id
      last_update_date
      last_update_user_id
      currency
      description
    }
    userRoleInProject(userId: $userId, projectId: $projectId)
    departments(projectId: $projectId)  {
      id
      name
    }
    projectUsers(projectId: $projectId) {
      id
      is_active
      position
      user {
        id
      }
      rate {
        id
        compensation_rate
        create_date
        create_user_id
        last_update_date
        last_update_user_id
        overtime_hour1
        overtime_hour2
        overtime_hour3
        overtime_hour4
        standard_rate
      }
      invitation
      role
      phone_number
      department {
        name
        id
      }
      email
      name
      surname
    }
    projectUserDetails(userId: $userId, projectId: $projectId) {
      project {
        id
        name
        currency
      }
      id
      name
      surname
    }
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
