import { CheckIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { Tooltip } from '@chakra-ui/react';

type Props = {
  hasWorked?: boolean;
  hasReported?: boolean;
};

export const ShiftWorkedReportedIcons = ({ hasWorked, hasReported }: Props) => {
  return (
    <>
      {hasWorked && hasReported ? (
        <Tooltip
          label="Already filed in"
          aria-label="Already filed in"
          rounded="md"
        >
          <CheckIcon color="green.500" />
        </Tooltip>
      ) : hasWorked && !hasReported ? (
        <Tooltip label="Not filed in" aria-label="Not filed in" rounded="md">
          <WarningTwoIcon color="orange.500" />
        </Tooltip>
      ) : !hasWorked && hasReported ? (
        <Tooltip
          label="Filed without approval"
          aria-label="Filed without approval"
          rounded="md"
        >
          <CheckIcon color="red.500" />
        </Tooltip>
      ) : null}
    </>
  );
};
