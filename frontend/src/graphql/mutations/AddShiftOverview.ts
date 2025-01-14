import { gql } from '@frontend/gql';

export const ADD_SHIFT_OVERVIEW = gql(`
  mutation AddShiftOverview($projectId: String!, $date: DateTimeISO!, $crewWorking: [CrewInput!]!) {
  addShiftOverview(projectId: $projectId, date: $date, crew_working: $crewWorking) {
    id
    date
    crew_working {
      id
    }
  }
}
`);
