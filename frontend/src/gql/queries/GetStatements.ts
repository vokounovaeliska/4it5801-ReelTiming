import { gql } from '@apollo/client';

export const GET_CREW_STATEMENTS = gql`
  query GetCrewStatements($userId: String!) {
    statementsByUserId(userId: $userId) {
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
`;

export const GET_ADMIN_STATEMENTS = gql`
  query GetAdminStatements($projectId: String!) {
    statementsByProjectId(projectId: $projectId) {
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
`;
