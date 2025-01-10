import React from 'react';
import { Button, useBreakpointValue } from '@chakra-ui/react';
import { MdAddChart } from 'react-icons/md';

type AddCrewMemberButtonProps = {
  handleAddMemberClick: () => void;
};

export const AddCrewMemberButton: React.FC<AddCrewMemberButtonProps> = ({
  handleAddMemberClick,
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
      leftIcon={<MdAddChart />}
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
