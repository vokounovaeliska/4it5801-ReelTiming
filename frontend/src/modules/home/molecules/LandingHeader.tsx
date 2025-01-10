import { Button, Flex } from '@chakra-ui/react';

import { route } from '@frontend/route';
import { ReactRouterLink } from '@frontend/shared/navigation/atoms';
import AppHeading from '@frontend/shared/navigation/components/AppHeading';
import Logo from '@frontend/shared/navigation/components/logo/Logo';

const LandingHeader = () => {
  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      width="100%"
      zIndex="1000"
      justify="space-between"
      align="center"
      bgGradient="linear(to-b, gray.800, #1c222e)"
      px={4}
      py={2}
    >
      <Flex align="center" gap={0}>
        <Logo />
        <AppHeading />
      </Flex>

      <Flex gap={4}>
        <Button
          as={ReactRouterLink}
          to={route.login()}
          variant="link"
          color="orange.400"
          fontSize="md"
          fontWeight={500}
          _hover={{
            textDecoration: 'none',
            color: 'orange.500',
          }}
        >
          Login
        </Button>
        <Button
          as={ReactRouterLink}
          to={route.register()}
          size="md"
          fontWeight={600}
          color="white"
          bg="orange.500"
          _hover={{
            bg: 'orange.600',
          }}
        >
          Sign Up
        </Button>
      </Flex>
    </Flex>
  );
};

export default LandingHeader;
