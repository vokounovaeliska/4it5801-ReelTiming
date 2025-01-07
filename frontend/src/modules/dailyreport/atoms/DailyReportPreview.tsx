import { useQuery } from '@apollo/client';
import { Box, Center, Spinner, Text } from '@chakra-ui/react';

import { GET_DAILY_REPORT_PREVIEW_INFO } from '@frontend/graphql/queries/GetDailyReportPreviewInfo';

import { Divider } from '../../../shared/design-system/atoms/Divider';
import {
  DailyReportPreviewInfoQuery,
  ShootingDay,
} from '../interfaces/interface';

import ReportHeader from './preview/ReportHeader';

type DailyReportPreviewProps = {
  shootingDay: ShootingDay;
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
    </Box>
  );
};

export default DailyReportPreview;
