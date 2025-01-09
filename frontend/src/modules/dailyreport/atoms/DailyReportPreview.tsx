import { useQuery } from '@apollo/client';
import { Box, Center, Spinner, Text } from '@chakra-ui/react';

import { GET_DAILY_REPORT_PREVIEW_INFO } from '@frontend/graphql/queries/GetDailyReportPreviewInfo';
import PDFGenerator from '@frontend/modules/dailyreport/pdf/PdfGenerator';

import { Divider } from '../../../shared/design-system/atoms/Divider';
import {
  DailyReportPreviewInfoQuery,
  ShootingDayByProject,
} from '../interfaces/interface';

import { ReportCrewStatementsTable } from './preview/ReportCrewStatementsTable';
import ReportFooter from './preview/ReportFooter';
import ReportHeader from './preview/ReportHeader';
import ReportIntro from './preview/ReportIntro';

type DailyReportPreviewProps = {
  shootingDay: ShootingDayByProject;
  projectId: string;
};

const DailyReportPreview = ({
  shootingDay,
  projectId,
}: DailyReportPreviewProps) => {
  const { data, loading, error } = useQuery<DailyReportPreviewInfoQuery>(
    GET_DAILY_REPORT_PREVIEW_INFO,
    {
      variables: {
        projectId,
        date: shootingDay.date,
        shootingDayId: shootingDay.id,
      },
      skip: !projectId || !shootingDay.date || !shootingDay.id,
      fetchPolicy: 'cache-and-network',
    },
  );

  if (loading)
    return (
      <Center minHeight="30vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading preview ...</Text>
      </Center>
    );

  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  return (
    <Box>
      <ReportHeader data={data} />
      <Divider />
      <ReportIntro data={data} />
      <Divider />
      <ReportCrewStatementsTable data={data} />
      <Divider />
      <ReportFooter data={data} />
      <PDFGenerator data={data} />
    </Box>
  );
};

export default DailyReportPreview;
