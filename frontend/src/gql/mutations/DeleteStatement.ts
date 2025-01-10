import { gql } from '@apollo/client';

export const DELETE_STATEMENT = gql`
  mutation DeleteStatement($id: String!) {
    deleteStatement(id: $id)
  }
`;
