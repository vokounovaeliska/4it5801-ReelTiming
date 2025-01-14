import { gql } from '@frontend/gql';

export const EDIT_SHIFT_OVERVIEW = gql(`
mutation EditShiftOverview($shiftOverviewId: String!, $data: ShiftOverviewInput!) {
  updateShiftOverview(shiftOverviewId: $shiftOverviewId, data: $data) {
    id
    date
    crew_working {
      id
    }
  }
}
`);
