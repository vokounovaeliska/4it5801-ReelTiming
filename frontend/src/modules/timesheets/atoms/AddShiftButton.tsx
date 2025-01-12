import React from 'react';
import { Button } from '@chakra-ui/react';
import { MdAddChart } from 'react-icons/md';

type AddShiftButtonProps = {
  handleAddClick: () => void;
  isShown?: boolean;
};

export const AddShiftButton: React.FC<AddShiftButtonProps> = ({
  handleAddClick,
  isShown = true,
}) => {
  return (
    <Button
      aria-label="Add statement"
      colorScheme="orange"
      bgColor="orange.500"
      onClick={handleAddClick}
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
      isDisabled={!isShown}
    >
      Add Shift
    </Button>
  );
};
