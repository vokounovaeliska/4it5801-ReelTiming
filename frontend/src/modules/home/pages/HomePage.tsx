import { useEffect } from 'react';
import { Button, Grid, Heading, HStack, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';
import { Box } from '@frontend/shared/design-system';
import { ReactRouterLink } from '@frontend/shared/navigation/atoms';
import Footer from '@frontend/shared/navigation/components/footer/Footer';

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
    <Box bg="#2D3748" color="white">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        flex="1"
        px={8}
        minHeight="100vh"
      >
        <Box boxSize={{ base: '150px', md: '150px' }} mb="50">
          <Image src="/faviconlogo.png" alt="ReelTiming Logo" />
        </Box>
        <Heading
          as="h1"
          fontSize={{ base: '3xl', md: '5xl' }}
          mb={4}
          fontWeight="extrabold"
          color="orange.400"
        >
          Simplify Your Production Workflow
        </Heading>
        <Text
          fontSize={{ base: 'md', md: 'xl' }}
          maxW="600px"
          mb={6}
          color="gray.300"
        >
          Welcome to Reeltiming — the ultimate tool for film professionals to
          track work hours, manage crews, and streamline the production process.
          Focus on the art while we handle the logistics.
        </Text>
        <Grid>
          <HStack spacing={4}>
            <Button
              as={ReactRouterLink}
              to={route.register()}
              colorScheme="orange"
              bg="orange.600"
              size="lg"
              _hover={{ bg: 'orange.500', transform: 'scale(1.1)' }}
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
            Login
          </Button>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
}
