import { useEffect } from 'react';
import { Button, Grid, HStack, Input, Text } from '@chakra-ui/react';
import { FaUsers } from 'react-icons/fa';
import { IoIosPhonePortrait } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';
import { Box, Heading } from '@frontend/shared/design-system';
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
      bgGradient="linear(to-l, #fadbc3 0%, transparent 47%)"
    >
      <HomePageNavbar />
      <Box
        //bgGradient="linear(to-l, rgba(251,146,60,1) 0%, transparent 40%)"
        minHeight="60vh"
        display="flex"
        flexDirection={{ base: 'column', md: 'row' }}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        flex="1"
        px={8}
      >
        <Box
          flex="0 0 60%"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          display="flex"
          flexDirection="column"
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
            color="gray.700"
          >
            <Text as={'span'} fontWeight="bold">
              ReelTiming
            </Text>{' '}
            — the ultimate tool for film professionals to track work hours,
            manage crews, and streamline the production process. Focus on the
            art while we handle the logistics.
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
        <Box flex="0 0 40%" p={10}>
          <video
            width="100%"
            height="auto"
            autoPlay
            muted
            loop
            style={{
              maxWidth: '600px',
              boxShadow: '29px 28px 9px -1px rgba(255,255,255,1)',
            }}
          >
            <source src="/homepagevideo.mp4" type="video/mp4" />
          </video>
        </Box>
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
        <Heading as={'h2'} id="features" pb={3}>
          Features
        </Heading>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          flexWrap="wrap"
          alignItems="center"
        >
          <Box
            display="flex"
            flexDirection="column"
            flex="0 0 25%"
            mx={5}
            justifyContent="center"
            alignItems="center"
          >
            <FaUsers />
            <Text fontSize="2xl">First claim</Text>
            <Text fontSize={{ base: 'md', md: 'xl' }} color="gray.700">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci
              sed praesentium molestias, fugiat laudantium incidunt quos
              explicabo similique ducimus animi?
            </Text>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            flex="0 0 25%"
            mx={5}
            justifyContent="center"
            alignItems="center"
          >
            <IoIosPhonePortrait />
            <Text fontSize="2xl">Second claim</Text>
            <Text fontSize={{ base: 'md', md: 'xl' }} color="gray.700">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci
              sed praesentium molestias, fugiat laudantium incidunt quos
              explicabo similique ducimus animi?
            </Text>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            flex="0 0 25%"
            mx={5}
            justifyContent="center"
            alignItems="center"
          >
            <FaUsers />
            <Text fontSize="2xl">Third claim</Text>
            <Text fontSize={{ base: 'md', md: 'xl' }} color="gray.700">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci
              sed praesentium molestias, fugiat laudantium incidunt quos
              explicabo similique ducimus animi?
            </Text>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            flex="0 0 25%"
            mx={5}
            justifyContent="center"
            alignItems="center"
          >
            <FaUsers />
            <Text fontSize="2xl">Fourth claim</Text>
            <Text fontSize={{ base: 'md', md: 'xl' }} color="gray.700">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci
              sed praesentium molestias, fugiat laudantium incidunt quos
              explicabo similique ducimus animi?
            </Text>
          </Box>
        </Box>
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
        <Heading as={'h2'} id="description" pb={3}>
          Description
        </Heading>
        <Text
          fontSize={{ base: 'md', md: 'xl' }}
          pb={6}
          color="gray.700"
          maxWidth="70rem"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          veritatis doloremque tenetur molestiae. Corporis molestiae neque
          dolore voluptates commodi tenetur doloribus officiis, deserunt
          veritatis ex ad iste impedit, maiores nemo assumenda repellendus quod
          numquam dolorem debitis, minus nulla architecto porro aspernatur.
          Voluptas impedit repudiandae excepturi quia porro obcaecati vero
          minima!
        </Text>
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
        <Heading as={'h2'} id="get-in-touch" pb={3}>
          Get in Touch
        </Heading>
        <Text
          fontSize={{ base: 'md', md: 'xl' }}
          pb={6}
          color="gray.700"
          maxWidth="70rem"
        >
          Whether you're working on a student project or a large-scale
          production, we tailor our solutions to fit your unique needs. Share
          your email with us, and we'll get in touch with a personalized pricing
          proposal that works for you.{' '}
          <Text as={'span'} display={'block'}>
            Enter your email below, and let's start optimizing your workflow!
          </Text>
        </Text>
        <Box display="flex" flex-direcion="row">
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            autoFocus
            autoComplete="on"
            autoCorrect="off"
            autoCapitalize="off"
            mb={2}
            mx={3}
            size="lg"
          />
          <Button colorScheme="orange" size="lg" px={10}>
            Get Started
          </Button>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
