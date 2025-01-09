import { gql } from '@frontend/gql';

export const GET_SHIFT_OVERVIEW_PAGE_DATA = gql(`
    query GetShiftOverviewPageData($projectId: String!){
    project_users {
      id
      name
      surname
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
    }
    project(id: $projectId) {
      id
      name
      start_date
      end_date
    }
  }
`);
