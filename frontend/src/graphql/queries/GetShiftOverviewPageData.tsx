import { gql } from '@frontend/gql';

export const GET_SHIFT_OVERVIEW_PAGE_DATA = gql(`
    query GetShiftOverviewPageData($projectId: String!, ){
  projectUsers(projectId: $projectId) {
    id
    name
    surname
    email
    position
    department {
      id
      name
      order_index
    }
    statement {
      id
      start_date
      from
      to
    }
  }
  shootingDaysByProject(projectId: $projectId) {
    id
    shooting_day_number
    date
  }
  shiftOverviewsByProjectId(projectId: $projectId) {
    id
    date
    crew_working {
      id
    }
  }
  project(id: $projectId) {
    id
    name
    start_date
    end_date
  }
}
`);
