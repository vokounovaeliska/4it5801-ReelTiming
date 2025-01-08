import { gql } from '@frontend/gql';

export const GET_DAILY_REPORT_PREVIEW_INFO = gql(`
  query DailyReportPreviewInfo($date: DateTimeISO!, $projectId: String!, $shootingDayId: String!) {
  statementsByProjectIdAndDate(date: $date, projectId: $projectId) {
    id
    start_date
    from
    to
    claimed_overtime
    projectUser {
      name
      surname
      position
      department {
        id
        name
        order_index
        is_visible
      }
    }
  }
  project(id: $projectId) {
    id
    name
    production_company
    currency
    shootingDays {
      id
    }
  }
  shootingDay(id: $shootingDayId) {
    id
    shooting_day_number
    date
    dailyReport {
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
    }
  }
}
`);
