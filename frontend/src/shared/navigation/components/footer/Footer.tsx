import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Box
      as="footer"
      width="100%"
      textAlign="center"
      py={1}
      bg="gray.800"
      color="white"
      position="relative"
    >
      <Text fontSize="sm">
        &copy; {new Date().getFullYear()} ReelTiming. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
