import { useEffect, useRef } from 'react';
import { Box, Button, Heading, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';
import { ReactRouterLink } from '@frontend/shared/navigation/atoms';
import Footer from '@frontend/shared/navigation/components/footer/Footer';

import BigSignUpButton from '../atoms/BigSignUpButton';
import LandingBox from '../atoms/LandingBox';
import LandingHeader from '../atoms/LandingHeader';
import AppBenefits from '../organisms/AppBenefits';
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
        pt={{ base: '50px', lg: '0px' }}
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
            fontSize={{ base: '4xl', md: '7xl' }}
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
          <Text fontSize="l" maxW="100%" mb={6} color="gray.300">
            Reeltiming — the ultimate tool for film professionals to track work
            hours, manage crews, and streamline the production process.
          </Text>
          <BigSignUpButton />
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
            src="/homePage2.png"
            width="100%"
            alt="Movie set"
            style={{
              borderRadius: '16px',
              boxShadow: '0px 4px 15px rgba(0,0,0,0.6)',
              zIndex: 2,
            }}
            height="auto"
            maxWidth={{ base: '600px', lg: '900px' }}
            mb={8}
          />
        </Box>
      </Box>

      <LandingBox
        bgGradient="linear(to-b, #2D3748, #b05e2a)"
        pt={16}
        pb={{ base: 10, lg: 16 }}
        px={{ base: '2', mb: '8' }}
        ref={featuresSectionRef}
      >
        <AppFeatures />
      </LandingBox>

      <LandingBox
        bgGradient="linear(to-b, #b05e2a, white)"
        pt={{ base: 8, lg: 12 }}
        pb={5}
        color="gray.800"
        minHeight="40vh"
        textAlign="center"
      >
        <Heading
          as="h2"
          fontSize="5xl"
          mb={6}
          fontWeight="bold"
          color="#2D3748"
          pb={3}
        >
          Comprehensive Reporting Made Easy
        </Heading>
        <Text fontSize="xl" pb={6} color="gray.700" maxWidth="70rem" mx="5px">
          Our reporting tools are designed to give you a complete overview of
          your production, from budgets to crew hours, in a single dashboard.
          Generate detailed reports that help you make informed decisions,
          manage resources effectively, and stay on track.
          <Text as="span" display="block">
            Simplify data collection and analysis, so you can focus on creating
            exceptional content.
          </Text>
        </Text>
        <Box
          display="flex"
          flexDirection={{ base: 'column', lg: 'row' }}
          justifyContent="center"
          alignItems="center"
          gap={100}
        >
          <Box
            textAlign="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Image
              src="/dailyReport.png"
              alt="Dashboard overview"
              width="100%"
              maxWidth={{ base: '300px', sm: '500px' }}
              borderRadius="8px"
              boxShadow="0px 4px 8px rgba(0,0,0,0.6)"
            />
            <Text fontSize="md" color="gray.600" pt={2}>
              Generate detailed daily report on demand.
            </Text>
          </Box>
          <Box
            textAlign="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Image
              src="/overallReport.png"
              alt="Detailed report"
              width="100%"
              maxWidth={{ base: '300px', sm: '500px' }}
              borderRadius="8px"
              boxShadow="0px 4px 8px rgba(0,0,0,0.6)"
            />
            <Text fontSize="md" color="gray.600" pt={2}>
              Generate overall reports with a single click.
            </Text>
          </Box>
        </Box>
      </LandingBox>

      <LandingBox
        bgGradient="linear(to-b, white, white)"
        pt={{ base: 8, lg: 12 }}
        pb={5}
        color="gray.800"
        minHeight="40vh"
        textAlign={'center'}
      >
        <Heading
          as="h2"
          fontSize="5xl"
          mb={6}
          fontWeight="bold"
          color="#2D3748"
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
        <AppBenefits />

        <Button
          as={ReactRouterLink}
          to={route.register()}
          bg="orange.600"
          color="white"
          size="lg"
          _hover={{ transform: 'scale(1.1)', bg: 'orange.700' }}
          mb={7}
        >
          Get Started Now
        </Button>
      </LandingBox>

      <Footer />
    </Box>
  );
}
