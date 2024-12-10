import { gql } from '@frontend/gql';

export const GET_DEPARTMENTS = gql(`
  query Departments {
    departments {
      id
      name
    }
  }
`);
