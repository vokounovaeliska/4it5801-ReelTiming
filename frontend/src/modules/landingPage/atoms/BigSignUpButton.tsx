import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { route } from '@frontend/route';

const BigSignUpButton = () => (
  <Box width="100%" display="flex" justifyContent="flex-start">
    <Button
      as={ReactRouterLink}
      to={route.register()}
      bgGradient="linear(to-r, orange.400, orange.500)"
      color="white"
      size="lg"
      fontSize={{ base: 'xl', md: '2xl' }}
      px={{ base: 8, md: 12 }}
      py={{ base: 6, md: 8 }}
      mb={4}
      _hover={{
        bgGradient: 'linear(to-r, orange.500, orange.600)',
        transform: 'scale(1.1)',
      }}
    >
      Sign Up for Free
    </Button>
  </Box>
);

export default BigSignUpButton;
