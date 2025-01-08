import { Box, Text, VStack } from '@chakra-ui/react';

import { DailyReportPreviewInfoQuery } from '../../interfaces/interface';

type ReportShootingProgressProps = {
  data?: DailyReportPreviewInfoQuery;
};

export const ReportShootingProgress = ({
  data,
}: ReportShootingProgressProps) => {
  const dailyReport = data?.shootingDay?.dailyReport;
  const items =
    dailyReport && dailyReport.length > 0
      ? dailyReport[0].shooting_progress
      : [];

  return (
    <Box
      borderWidth={items.length !== 0 ? 2 : 0}
      borderColor="black"
      bg="white"
      mb={2}
    >
      <VStack spacing={4} align="stretch">
        {items.map((item, index) => (
          <Box key={index} bg="orange.500" textAlign="center" fontSize="sm">
            <Text
              whiteSpace="pre-wrap"
              fontWeight="bold"
              textTransform="uppercase"
            >
              {item.title}
            </Text>
            <Text whiteSpace="pre-wrap" color="black" bg="white">
              {item.value}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
