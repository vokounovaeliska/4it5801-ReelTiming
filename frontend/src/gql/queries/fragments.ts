import { gql } from '@apollo/client';

export const PROJECT_BASIC_INFO = gql`
  fragment ProjectBasicInfo on Project {
    id
    name
    description
  }
`;
