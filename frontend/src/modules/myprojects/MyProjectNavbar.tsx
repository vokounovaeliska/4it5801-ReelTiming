import React from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';

import { route } from '@frontend/route';
import { ReactRouterLink } from '@frontend/shared/navigation/atoms';

export const MyProjectNavbar: React.FC = () => {
  return (
    <Box pb={4} bg="white.100">
      <IconButton
        as={ReactRouterLink}
        to={route.myprojects()}
        aria-label="Go back btn"
        icon={<ArrowBackIcon />}
        size="sm"
        borderRadius="full"
        colorScheme="orange"
        _hover={{ bg: 'orange.600' }}
      />
    </Box>
  );
};
