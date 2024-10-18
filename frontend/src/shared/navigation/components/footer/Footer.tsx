import React from 'react';
import { Box, Link, Text } from '@chakra-ui/react';

import { route } from '@frontend/route';

const Footer: React.FC = () => {
  return (
    <Box
      as="footer"
      width="100%"
      textAlign="center"
      py={0.1}
      bg="gray.800"
      color="white"
      position="relative"
    >
      <Link
        href={route.terms()}
        color="white"
        textDecoration="none"
        _hover={{ textDecoration: 'underline' }}
      >
        <Text fontSize="sm">
          &copy; {new Date().getFullYear()} ReelTiming. All rights reserved.
        </Text>
      </Link>
    </Box>
  );
};

export default Footer;
