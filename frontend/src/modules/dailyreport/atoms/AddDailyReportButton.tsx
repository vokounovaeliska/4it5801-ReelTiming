import React from 'react';
import { Button, ButtonProps, useBreakpointValue } from '@chakra-ui/react';
import { BsPersonAdd } from 'react-icons/bs';

interface AddDailyReportButtonProps extends ButtonProps {
  onClick: () => void;
}

export const AddDailyReportButton: React.FC<AddDailyReportButtonProps> = ({
  onClick,
  ...buttonProps
}) => {
  const label = useBreakpointValue({
    base: 'Add Daily Report',
    md: 'Add New Daily Report',
  });

  return (
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
    >
      {label}
    </Button>
  );
};
