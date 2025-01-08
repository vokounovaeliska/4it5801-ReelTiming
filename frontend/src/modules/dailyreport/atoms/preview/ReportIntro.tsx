import { Box, SimpleGrid } from '@chakra-ui/react';

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
    <SimpleGrid columns={3}>
      {items.map((item, index) => (
        <Box key={index}>
          <LabelValue label={item.title ?? ''} value={item.value ?? ''} />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default ReportIntro;
