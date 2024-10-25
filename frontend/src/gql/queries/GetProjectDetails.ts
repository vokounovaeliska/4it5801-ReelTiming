import { gql } from '@apollo/client';

import { PROJECT_BASIC_INFO } from './fragments';

export const GET_PROJECT_DETAILS = gql`
  query GetProjectDetail($id: String!) {
    project(id: $id) {
      ...ProjectBasicInfo
      start_date
      end_date
      production_company
    }
  }
  ${PROJECT_BASIC_INFO}
`;
