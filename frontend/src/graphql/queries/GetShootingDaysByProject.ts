import { gql } from '@frontend/gql';

export const GET_SHOOTING_DAYS_BY_PROJECT = gql(`
  query GetShootingDaysByProject($projectId: String!) {
    shootingDaysByProject(projectId: $projectId) {
      id
      shooting_day_number
      date
      event_type
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
