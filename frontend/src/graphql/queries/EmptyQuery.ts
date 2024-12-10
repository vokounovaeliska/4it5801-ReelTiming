import { gql } from '@frontend/gql';

export const EMPTY_QUERY = gql(`
  query Quacks {
    _empty
  }
`);
