import { gql } from '@frontend/gql';

export const ADD_PROJECT = gql(`
  mutation AddProject(
    $productionCompany: String!
    $name: String!
    $endDate: DateTimeISO
    $startDate: DateTimeISO
    $description: String
    $create_user_id: String
    $currency: String
  ) {
    addProject(
      production_company: $productionCompany
      name: $name
      end_date: $endDate
      start_date: $startDate
      description: $description
      create_user_id: $create_user_id
      currency: $currency
    ) {
      id
      name
      production_company
      description
      start_date
      end_date
      create_date
      create_user_id
      last_update_user_id
      last_update_date
      is_active
      currency
      departments {
        id
        name
      }
    }
  }
`);
