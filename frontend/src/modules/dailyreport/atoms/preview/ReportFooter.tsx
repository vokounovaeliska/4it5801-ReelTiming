import { Box, Text, VStack } from '@chakra-ui/react';

import { DailyReportPreviewInfoQuery } from '../../interfaces/interface';

type ReportFooterProps = {
  data?: DailyReportPreviewInfoQuery;
};

const ReportFooter = ({ data }: ReportFooterProps) => {
  const dailyReport = data?.shootingDay?.dailyReport;
  const footerItems =
    dailyReport && dailyReport.length > 0 ? dailyReport[0].footer : [];

  return (
    <Box p={4} textAlign="center">
      <Text fontWeight="bold" fontSize="md" mb={20}>
        REPORT APPROVED BY
      </Text>
      <VStack spacing={20} align={'flex-start'} ml={20}>
        {footerItems.map((item, index) => (
          <Box key={index} textAlign={'left'}>
            <Text whiteSpace="pre-wrap" fontWeight="bold">
              {item.value}
            </Text>
            <Text whiteSpace="pre-wrap">{item.title}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default ReportFooter;
