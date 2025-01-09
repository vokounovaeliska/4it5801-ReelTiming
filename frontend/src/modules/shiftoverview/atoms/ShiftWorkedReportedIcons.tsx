import { CheckIcon, WarningTwoIcon } from '@chakra-ui/icons';

type Props = {
  hasWorked?: boolean;
  hasReported?: boolean;
};

export const ShiftWorkedReportedIcons = ({ hasWorked, hasReported }: Props) => {
  return (
    <>
      {hasReported ? (
        <CheckIcon color="green.500" />
      ) : hasWorked ? (
        <WarningTwoIcon color="orange.500" />
      ) : null}
    </>
  );
};
