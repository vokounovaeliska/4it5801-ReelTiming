import { useEffect, useRef } from 'react';
import { Box, Button, Heading, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';
import { ReactRouterLink } from '@frontend/shared/navigation/atoms';
import Footer from '@frontend/shared/navigation/components/footer/Footer';

import LandingHeader from '../molecules/LandingHeader';
import AppFeatures from '../organisms/AppFeatures';

export function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const featuresSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      navigate(route.myprojects());
    }
  }, [user, navigate]);

  const handleScrollToFeatures = () => {
    if (featuresSectionRef.current) {
      window.scrollTo({
        top: featuresSectionRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  if (user) return null;

  return (
    <Box
      bgGradient="linear(to-b, #2D3748, orange.800)"
      color="white"
      position="relative"
    >
      <LandingHeader />

      {/* Hero Section */}
      <Box
        display="flex"
        flexDirection={{ base: 'column', lg: 'row' }}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        flex="1"
        px={{ base: 4, md: 8 }}
        minHeight="100vh"
        bgGradient="linear(to-b, gray.800, #2D3748)"
        overflow="hidden"
        pt={{ base: '70px', lg: '0px' }}
      >
        <Box
          flex="0 0 50%"
          justifyContent="center"
          alignItems="center"
          textAlign="left"
          display="flex"
          flexDirection="column"
          p={4}
        >
          <Heading
            as="h1"
            fontSize={{ base: '5xl', md: '7xl' }}
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
          <Text fontSize="xl" maxW="100%" mb={6} color="gray.300">
            Reeltiming — the ultimate tool for film professionals to track work
            hours, manage crews, and streamline the production process.
          </Text>

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
          <Box width="100%" display="flex" justifyContent="flex-start">
            <Button
              onClick={handleScrollToFeatures}
              variant="link"
              color="orange.400"
              fontSize="md"
              fontWeight={500}
              _hover={{
                textDecoration: 'none',
                color: 'orange.500',
              }}
            >
              Check out the app features
            </Button>
          </Box>
        </Box>

        <Box
          flex="1"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          display="flex"
          flexDirection="column"
          p={4}
        >
          <Image
            src="/hero-image2.jpg"
            width="100%"
            alt="Camera pointing at actors"
            style={{
              boxShadow: '36px 44px 31px -2px rgba(221,107,32,0.5)',
            }}
            height="auto"
            maxWidth={{ base: '500px', lg: '700px' }}
            mb={8}
          />
        </Box>
      </Box>

      {/* Features Section */}
      <Box
        bgGradient="linear(to-b, #2D3748, orange.500)"
        py={16}
        px={{ base: '2', mb: '8' }}
        ref={featuresSectionRef}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <AppFeatures />
      </Box>

      {/* Call to Action Section */}
      <Box
        bgGradient="linear(to-b, orange.500, orange.100, white)"
        pt={16}
        pb={5}
        color="gray.800"
        flex="1"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        display="flex"
        flexDirection="column"
        minHeight="40vh"
      >
        <Heading
          as="h2"
          fontSize="5xl"
          mb={6}
          fontWeight="bold"
          bgGradient="linear(to-r, orange.600, orange.700)"
          bgClip="text"
          pb={3}
        >
          Ready to Simplify Your Workflow?
        </Heading>
        <Text fontSize="xl" pb={6} color="gray.700" maxWidth="70rem" mx="5px">
          Whether you're working on a student film or managing a large-scale
          production, our app is designed to simplify the process for projects
          of any size, offering intuitive features that fit your unique needs.{' '}
          <Text as={'span'} display={'block'}>
            Focus on the art while we handle the logistics!
          </Text>
        </Text>
        <Button
          as={ReactRouterLink}
          to={route.register()}
          bg="orange.600"
          color="white"
          size="lg"
          _hover={{ transform: 'scale(1.1)', bg: 'orange.700' }}
          mb={5}
        >
          Get Started Now
        </Button>
      </Box>

      <Footer />
    </Box>
  );
}
