import { Box, Flex } from '@chakra-ui/react';

import { formatDateToDisplay } from '@frontend/modules/timesheets/utils/timeUtils';
import LabelValue from '@frontend/shared/design-system/atoms/LabelValue';

import { DailyReportPreviewInfoQuery } from '../../interfaces/interface';

type ReportIntroProps = {
  data?: DailyReportPreviewInfoQuery;
};

const ReportIntro = ({ data }: ReportIntroProps) => {
  const dailyReport = data?.shootingDay?.dailyReport;
  const introItems =
    dailyReport && dailyReport.length > 0 ? dailyReport[0].intro : [];

  const items = [
    introItems[0] || { title: '', value: '' },
    {
      title: 'Date',
      value: formatDateToDisplay(data?.shootingDay?.date ?? ''),
    },
    ...introItems.slice(1),
  ];

  return (
    <Flex justify="space-between" wrap="wrap" pl={2}>
      {items.map((item, index) => (
        <Box key={index} flexBasis={'33%'}>
          <LabelValue label={item.title ?? ''} value={item.value ?? ''} />
        </Box>
      ))}
    </Flex>
  );
};

export default ReportIntro;
