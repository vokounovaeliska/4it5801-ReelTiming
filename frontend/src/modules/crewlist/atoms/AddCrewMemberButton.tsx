import React from 'react';
import { Button, useBreakpointValue } from '@chakra-ui/react';
import { BsPersonAdd } from 'react-icons/bs';

type AddCrewMemberButtonProps = {
  handleAddMemberClick: () => void;
  isShown?: boolean;
};

export const AddCrewMemberButton: React.FC<AddCrewMemberButtonProps> = ({
  handleAddMemberClick,
  isShown = true,
}) => {
  const label = useBreakpointValue({
    base: 'Add Member',
    md: 'Add New Member',
  });
  return (
    <Button
      aria-label="Add New Member"
      colorScheme="orange"
      bgColor="orange.500"
      onClick={handleAddMemberClick}
      size="md"
      leftIcon={<BsPersonAdd />}
      borderRadius="full"
      boxShadow="md"
      isDisabled={!isShown}
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
