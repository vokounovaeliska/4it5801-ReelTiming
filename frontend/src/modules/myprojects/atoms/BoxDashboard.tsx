import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

interface BoxDashboardProps extends BoxProps {}

const BoxDashboard: React.FC<BoxDashboardProps> = ({ children, ...props }) => {
  return (
    <Box
      p={6}
      bg="white"
      borderRadius="md"
      boxShadow="base"
      borderWidth={1}
      {...props}
    >
      {children}
    </Box>
  );
};

export default BoxDashboard;
