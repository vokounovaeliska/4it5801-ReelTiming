import { gql } from '@frontend/gql';

export const GET_PROJECT_DETAILS = gql(`
  query GetProjectDetail($id: String!) {
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
      projectUsers {
      id
    }
    }
  }
`);
