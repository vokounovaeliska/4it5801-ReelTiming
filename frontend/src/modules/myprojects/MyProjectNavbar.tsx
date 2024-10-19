import React from 'react';
import { Box, Button, HStack } from '@chakra-ui/react';

export function MyProjectNavbar() {
  return (
    <Box pb={4} bg="white.100">
      <HStack spacing={4}>
        <Button colorScheme="orange">Timesheets</Button>
        <Button colorScheme="orange">Summary</Button>
        <Button colorScheme="orange">Edit</Button>
      </HStack>
    </Box>
  );
}
