import { useEffect } from 'react';
import { Button, Grid, Heading, HStack, Input, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';
import { Box } from '@frontend/shared/design-system';
import { ReactRouterLink } from '@frontend/shared/navigation/atoms';
import Footer from '@frontend/shared/navigation/components/footer/Footer';

import HomePageNavbar from './HomePageNavbar';

// const EMPTY_QUERY = gql(/* GraphQL */ `
//   query Quacks {
//     _empty
//   }
// `);

export function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(route.myprojects());
    }
  }, [user, navigate]);

  if (user) return null;

  return (
    <Box
      //bg="gray.50"
      bgGradient="linear(to-l, rgba(251,146,60,1) 0%, transparent 40%)"
    >
      <HomePageNavbar />
      <Box
        //bgGradient="linear(to-l, rgba(251,146,60,1) 0%, transparent 40%)"
        minHeight="60vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        flex="1"
        px={8}
      >
        <Heading
          as="h1"
          fontSize={{ base: '5xl', md: '6xl' }}
          mb={4}
          fontWeight="extrabold"
        >
          Simplify Your{' '}
          <Text
            as="span"
            bgGradient="linear(to-l, orange.600, orange.400)"
            bgClip="text"
            fontWeight="extrabold"
          >
            Production Workflow
          </Text>
        </Heading>
        <Text
          fontSize={{ base: 'md', md: 'xl' }}
          maxW="600px"
          mb={6}
          color="gray.600"
        >
          ReelTiming — the ultimate tool for film professionals to track work
          hours, manage crews, and streamline the production process. Focus on
          the art while we handle the logistics.
        </Text>

        <Grid>
          <HStack spacing={4}>
            <Button
              as={ReactRouterLink}
              to={route.register()}
              colorScheme="orange"
              bg="orange.500"
              size="lg"
              _hover={{ bg: 'orange.600', transform: 'scale(1.1)' }}
            >
              Sign Up for Free
            </Button>
          </HStack>
          <Button
            as={ReactRouterLink}
            to={route.login()}
            variant="link"
            color="orange.400"
            p="4"
          >
            Sign In
          </Button>
        </Grid>
      </Box>
      <Box
        minHeight="30vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        flex="1"
        px={8}
      >
        <Heading as={'h2'} id="features">
          Features
        </Heading>
      </Box>
      <Box
        minHeight="30vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        flex="1"
        px={8}
      >
        <Heading as={'h2'} id="description">
          Description
        </Heading>
      </Box>
      <Box
        minHeight="30vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        flex="1"
        px={8}
      >
        <Heading as={'h2'} id="get-in-touch" pb={6}>
          Get in Touch
        </Heading>
        <Text
          fontSize={{ base: 'md', md: 'xl' }}
          pb={6}
          color="gray.600"
        ></Text>
        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          autoFocus
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
          mb={2}
        />
      </Box>

      <Footer />
    </Box>
  );
}
