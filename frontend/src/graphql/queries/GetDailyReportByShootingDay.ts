import { gql } from '@frontend/gql';

export const GET_DAILY_REPORT_BY_SHOOTING_DAY = gql(`
  query GetDailyReportByShootingDay($shootingDayId: String!) {
    shootingDay(id: $shootingDayId) {
      id
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
