import { gql } from '@frontend/gql';

export const GET_LAST_DAILY_REPORT_BY_PROJECT = gql(`
query LastDailyReportByProjectId($projectId: String!) {
  lastDailyReportByProjectId(projectId: $projectId) {
    id
    intro {
      title
      value
    }
    shooting_progress {
      title
      value
    }
    footer {
      title
      value
    }
    create_date
    last_update_date
    shootingDay {
      id
      shooting_day_number
      date
    }
  }
}
`);
