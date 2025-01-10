import { gql } from '@frontend/gql';

export const PROJECT_BASIC_INFO = gql(`
  fragment ProjectBasicInfo on Project {
    id
    name
    description
  }
`);
