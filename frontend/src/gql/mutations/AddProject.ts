import { gql } from '@apollo/client';

export const ADD_PROJECT = gql`
  mutation Mutation(
    $productionCompany: String!
    $name: String!
    $endDate: DateTimeISO
    $startDate: DateTimeISO
    $description: String
  ) {
    addProject(
      production_company: $productionCompany
      name: $name
      end_date: $endDate
      start_date: $startDate
      description: $description
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
    }
  }
`;
