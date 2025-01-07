import { Center, Flex } from '@chakra-ui/react';

import { formatDateToDisplay } from '@frontend/modules/timesheets/utils/timeUtils';
import { Heading } from '@frontend/shared/design-system';
import LabelValue from '@frontend/shared/design-system/atoms/LabelValue';

import { DailyReportPreviewInfoQuery } from '../../interfaces/interface';

type ReportHeaderProps = {
  data?: DailyReportPreviewInfoQuery;
};

const ReportHeader = ({ data }: ReportHeaderProps) => (
  <>
    <Center fontWeight="bold">DAILY REPORT</Center>
    <Heading textAlign="center" as="h4" textTransform="uppercase">
      {data?.project?.name}
    </Heading>
    <Flex justifyContent="space-between" width="100%">
      <LabelValue
        label="Production"
        value={data?.project?.production_company}
      />
      <LabelValue
        label="Shooting day"
        value={
          data?.shootingDay?.shooting_day_number +
          '/' +
          data?.project?.shootingDays?.length
        }
      />
    </Flex>
    <LabelValue
      label="Date"
      value={formatDateToDisplay(data?.shootingDay?.date!)}
    />
  </>
);

export default ReportHeader;
