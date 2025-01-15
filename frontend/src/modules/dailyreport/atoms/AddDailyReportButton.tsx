import React from 'react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonProps,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';
import { BsPersonAdd } from 'react-icons/bs';

interface AddDailyReportButtonProps extends ButtonProps {
  onClick: () => void;
  isDisabled: boolean;
}

export const AddDailyReportButton: React.FC<AddDailyReportButtonProps> = ({
  onClick,
  isDisabled,
  ...buttonProps
}) => {
  const label = useBreakpointValue({
    base: 'Add Daily Report',
    md: 'Add New Daily Report',
  });

  return (
    <Box>
      <Button
        {...buttonProps}
        aria-label="Add New Member"
        colorScheme="orange"
        bgColor="orange.500"
        onClick={onClick}
        size="md"
        leftIcon={<BsPersonAdd />}
        borderRadius="full"
        boxShadow="md"
        _hover={{
          bg: 'orange.500',
          color: 'white',
          transform: 'scale(1.2)',
        }}
        transition="all 0.3s ease"
        isDisabled={isDisabled}
        _disabled={{
          transition: 'none',
          opacity: 0.4,
          cursor: 'not-allowed',
          transform: 'none',
        }}
      >
        {label}
      </Button>
      {isDisabled && (
        <Tooltip
          rounded="md"
          label="Button is disabled when all shooting days already have meta information for the daily report (or there are no shooting days defined). If you want to edit the information, please use the edit button in PDF preview."
          fontSize="md"
        >
          <InfoOutlineIcon m={2} color="gray.400" />
        </Tooltip>
      )}
    </Box>
  );
};
