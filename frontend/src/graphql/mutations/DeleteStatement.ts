import { gql } from '@frontend/gql';

export const DELETE_STATEMENT = gql(`
  mutation DeleteStatement($id: String!) {
    deleteStatement(id: $id)
  }
`);
