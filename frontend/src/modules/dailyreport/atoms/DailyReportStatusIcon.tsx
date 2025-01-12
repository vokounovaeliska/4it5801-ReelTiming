import React from 'react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

type DailyReportStatusIconProps = {
  hasDailyReport: boolean;
};

const DailyReportStatusIcon: React.FC<DailyReportStatusIconProps> = ({
  hasDailyReport,
}) => {
  return hasDailyReport ? (
    <IconButton
      colorScheme="green"
      size="xs"
      icon={<CheckIcon />}
      pointerEvents="none"
      aria-label="Daily report created"
    />
  ) : (
    <IconButton
      size="xs"
      aria-label="No daily report"
      pointerEvents="none"
      borderColor="gray.200"
      borderWidth={2}
      icon={<CloseIcon />}
    />
  );
};

export default DailyReportStatusIcon;
