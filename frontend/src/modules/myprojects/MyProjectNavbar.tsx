import React from 'react';
import { Box, Button, HStack } from '@chakra-ui/react';

export function MyProjectNavbar() {
  return (
    <Box p={4} bg="gray.100">
      <HStack spacing={4}>
        <Button colorScheme="blue">option1</Button>
        <Button colorScheme="blue">option2</Button>
        <Button colorScheme="blue">option3</Button>
        <Button colorScheme="blue">option4</Button>
      </HStack>
    </Box>
  );
}
