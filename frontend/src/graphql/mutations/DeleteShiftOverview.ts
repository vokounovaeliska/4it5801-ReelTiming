import gql from 'graphql-tag';

export const DELETE_SHIFT_OVERVIEW = gql(`
mutation DeleteShiftOverview($shiftOverviewId: String!) {
    deleteShiftOverview(shiftOverviewId: $shiftOverviewId)
  }
`);
