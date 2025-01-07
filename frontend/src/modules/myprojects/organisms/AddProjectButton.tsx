import React from 'react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { Button, useBreakpointValue } from '@chakra-ui/react';

type AddProjectButtonProps = {
  handleAddMemberClick: () => void;
};

export const AddProjectButton: React.FC<AddProjectButtonProps> = ({
  handleAddMemberClick: handleAddProjectClick,
}) => {
  const label = useBreakpointValue({
    base: 'Add Project',
    md: 'Add New Project',
  });

  return (
    <Button
      aria-label="Add New Project"
      colorScheme="orange"
      bgColor="orange.500"
      onClick={handleAddProjectClick}
      size="lg"
      leftIcon={<PlusSquareIcon />}
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
