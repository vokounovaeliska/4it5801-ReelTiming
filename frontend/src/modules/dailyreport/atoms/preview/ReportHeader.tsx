import { Box, Center, Flex, Image as ChakraImage } from '@chakra-ui/react';

import { Heading } from '@frontend/shared/design-system';
import LabelValue from '@frontend/shared/design-system/atoms/LabelValue';

import { DailyReportPreviewInfoQuery } from '../../interfaces/interface';

type ReportHeaderProps = {
  data?: DailyReportPreviewInfoQuery;
};

const ReportHeader = ({ data }: ReportHeaderProps) => (
  <>
    <Flex
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      px={4}
      py={4}
    >
      {/* Left Column: Empty or additional content */}
      <Box flex="1" />

      {/* Middle Column: Centered text */}
      <Flex
        flex="1"
        direction="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Center fontWeight="bold">DAILY REPORT</Center>
        <Heading as="h4" textTransform="uppercase">
          {data?.project?.name}
        </Heading>
      </Flex>
      <Box flex="1" justifyItems="right">
        {data?.project?.logo && (
          <ChakraImage
            src={`data:image/png;base64,${data?.project?.logo}`}
            alt="Project Logo"
            w="300px"
            h="75px"
            objectFit="contain"
          />
        )}
      </Box>
    </Flex>

    <Flex justifyContent="space-between" width="100%" px={2}>
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
  </>
);

export default ReportHeader;
