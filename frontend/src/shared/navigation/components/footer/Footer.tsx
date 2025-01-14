import React from 'react';
import { Box, Link, Stack, Text } from '@chakra-ui/react';

import { route } from '@frontend/route';

const Footer = () => {
  return (
    <Box
      as="footer"
      width="100%"
      textAlign="center"
      py={2}
      bg="#2D3748"
      color="white"
      position="relative"
    >
      <Stack direction="column" justify="center" align="center">
        <Text fontSize={{ base: 'xs', md: 'sm' }}>
          &copy; {new Date().getFullYear()} ReelTiming. All rights reserved.
        </Text>

        <Box display="flex" alignItems="center" justifyContent="center">
          <Link
            href={route.terms()}
            color="white"
            textDecoration="none"
            _hover={{ textDecoration: 'underline' }}
            fontSize={{ base: 'xs', md: 'sm' }}
          >
            Terms and Conditions
          </Link>
          <Text mx={2}>|</Text>
          <Link
            href={route.about()}
            color="white"
            textDecoration="none"
            _hover={{ textDecoration: 'underline' }}
            fontSize={{ base: 'xs', md: 'sm' }}
          >
            About us
          </Link>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
