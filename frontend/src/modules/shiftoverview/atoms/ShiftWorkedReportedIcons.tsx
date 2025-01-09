import { CheckIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { Checkbox, Flex, Td } from '@chakra-ui/react';

type Props = {
  day: Date;
  hasWorked?: boolean;
  hasReported?: boolean;
};

export const ShiftWorkedReportedIcons = ({
  day,
  hasWorked,
  hasReported,
}: Props) => {
  return (
    <Td key={day.toISOString()} textAlign="center">
      <Flex align="center" gap={2}>
        <Checkbox isChecked={hasWorked} colorScheme="gray" />
        {hasReported ? (
          <CheckIcon color="green.500" />
        ) : hasWorked ? (
          <WarningTwoIcon color="orange.500" />
        ) : null}
      </Flex>
    </Td>
  );
};
