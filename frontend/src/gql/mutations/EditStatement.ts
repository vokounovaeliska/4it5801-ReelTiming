import { gql } from '@apollo/client';

export const EDIT_STATEMENT = gql`
  mutation UpdateStatement($id: String!, $data: StatementInput!) {
    updatestatement(id: $id, data: $data) {
      id
      projectUser {
        id
      }
      start_date
      from
      to
      shift_lenght
      calculated_overtime
      claimed_overtime
      create_date
      last_update_date
      create_user_id
      last_update_user_id
      kilometers
    }
  }
`;
