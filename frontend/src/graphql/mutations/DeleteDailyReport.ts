import gql from 'graphql-tag';

export const DELETE_DAILY_REPORT = gql(`
mutation DeleteDailyReport($dailyReportId: String!) {
    deleteDailyReport(dailyReportId: $dailyReportId)
  }
`);
