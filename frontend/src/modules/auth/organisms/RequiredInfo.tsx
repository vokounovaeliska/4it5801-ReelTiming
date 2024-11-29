import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const RequiredInfo = () => {
  return (
    <Box>
      <Text color="gray.500" fontSize="xs">
        Fields marked with an asterisk (
        <Text as="span" color="red">
          *
        </Text>
        ) are required
      </Text>
    </Box>
  );
};

export default RequiredInfo;
