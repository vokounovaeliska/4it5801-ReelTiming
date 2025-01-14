import React from 'react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { Button, useBreakpointValue } from '@chakra-ui/react';

import { AuthUser } from '@frontend/modules/auth/auth-core';

type AddProjectButtonProps = {
  handleAddMemberClick: () => void;
  user?: AuthUser | null;
};

export const AddProjectButton: React.FC<AddProjectButtonProps> = ({
  handleAddMemberClick: handleAddProjectClick,
  user,
}) => {
  const label = useBreakpointValue({
    base: 'Add Project',
    md: 'Add New Project',
  });

  return (
    <Button
      display={user?.can_create_project ? 'block' : 'none'}
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
