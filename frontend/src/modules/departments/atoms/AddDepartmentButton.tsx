import React from 'react';
import { Button, useBreakpointValue } from '@chakra-ui/react';
import { BsPersonAdd } from 'react-icons/bs';

type AddDepartmentButtonProps = {
  handleAddDepartmentClick: () => void;
};

export const AddDepartmentButton: React.FC<AddDepartmentButtonProps> = ({
  handleAddDepartmentClick,
}) => {
  const label = useBreakpointValue({
    base: 'Add Department',
    md: 'Add New Department',
  });

  return (
    <Button
      aria-label="Add New Department"
      colorScheme="orange"
      bgColor="orange.500"
      onClick={handleAddDepartmentClick}
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
