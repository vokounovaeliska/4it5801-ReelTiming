import { gql } from '@frontend/gql';

export const ADD_DAILY_REPORT = gql(`
  mutation AddDailyReport($footer: [ReportItemInput!]!, $shootingProgress: [ReportItemInput!]!, $intro: [ReportItemInput!]!, $projectId: String!, $shootingDayId: String!) {
  addDailyReport(footer: $footer, shooting_progress: $shootingProgress, intro: $intro, projectId: $projectId, shooting_day_id: $shootingDayId) {
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
    project {
      id
      name
    }
    shootingDay {
      id
      date
      shooting_day_number
    }
  }
}
`);
