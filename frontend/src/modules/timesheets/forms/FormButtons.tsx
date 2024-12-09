import React from 'react';
import { Box, Button } from '@chakra-ui/react';

interface FormButtonsProps {
  onSubmit: () => void;
  onClose: () => void;
}

const FormButtons: React.FC<FormButtonsProps> = ({ onSubmit, onClose }) => {
  return (
    <Box display="flex" justifyContent="space-between" mt={4}>
      <Button colorScheme="orange" onClick={onSubmit}>
        Submit
      </Button>
      <Button colorScheme="gray" onClick={onClose}>
        Close
      </Button>
    </Box>
  );
};

export default FormButtons;
