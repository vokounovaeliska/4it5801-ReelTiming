import gql from 'graphql-tag';

export const EDIT_DAILY_REPORT = gql(`
mutation EditDailyReport($data: DailyReportInput!, $dailyReportId: String!) {
    updateDailyReport(data: $data, dailyReportId: $dailyReportId) {
      id
      
    }
  }
`);
