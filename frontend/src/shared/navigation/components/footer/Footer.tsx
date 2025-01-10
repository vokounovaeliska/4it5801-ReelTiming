import React from 'react';
import { Box, Link, Stack, Text } from '@chakra-ui/react';

import { route } from '@frontend/route';

const Footer = () => {
  return (
    <Box
      as="footer"
      width="100%"
      textAlign="center"
      py={1}
      bg="#2D3748"
      color="white"
      position="relative"
    >
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        justify="center"
        align="center"
        spacing={{ base: 0, sm: 3 }}
      >
        <Text fontSize={{ base: 'xs', md: 'sm' }}>
          &copy; {new Date().getFullYear()} ReelTiming. All rights reserved.
        </Text>
        <Link
          href={route.terms()}
          color="white"
          textDecoration="none"
          _hover={{ textDecoration: 'underline' }}
          fontSize={{ base: 'xs', md: 'sm' }}
        >
          Terms and Conditions
        </Link>
        <Link
          href={route.about()}
          color="white"
          textDecoration="none"
          _hover={{ textDecoration: 'underline' }}
          fontSize={{ base: 'xs', md: 'sm' }}
        >
          About us
        </Link>
      </Stack>
    </Box>
  );
};

export default Footer;
