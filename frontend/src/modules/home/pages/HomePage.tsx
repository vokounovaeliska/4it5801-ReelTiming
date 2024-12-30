import { useEffect } from 'react';
import {
  Button,
  Grid,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';
import { Box } from '@frontend/shared/design-system';
import { ReactRouterLink } from '@frontend/shared/navigation/atoms';
import Footer from '@frontend/shared/navigation/components/footer/Footer';

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
    <Box bgGradient="linear(to-b, #2D3748, orange.800)" color="white">
      {' '}
      {/* Hero Section */}{' '}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        flex="1"
        px={8}
        minHeight="100vh"
        bgGradient="linear(to-b, gray.800, #2D3748)"
      >
        {' '}
        <Box boxSize={{ base: '150px', md: '150px' }} mb="50">
          {' '}
          <Image src="/faviconlogo.png" alt="ReelTiming Logo" />{' '}
        </Box>{' '}
        <Heading
          as="h1"
          fontSize={{ base: '3xl', md: '5xl' }}
          mb={4}
          fontWeight="extrabold"
          bgGradient="linear(to-r, orange.400, orange.500)"
          bgClip="text"
        >
          {' '}
          Simplify Your Production Workflow{' '}
        </Heading>{' '}
        <Text
          fontSize={{ base: 'md', md: 'xl' }}
          maxW="600px"
          mb={6}
          color="gray.300"
        >
          {' '}
          Welcome to Reeltiming — the ultimate tool for film professionals to
          track work hours, manage crews, and streamline the production process.
          Focus on the art while we handle the logistics.{' '}
        </Text>{' '}
        <Grid>
          {' '}
          <HStack spacing={4}>
            {' '}
            <Button
              as={ReactRouterLink}
              to={route.register()}
              bgGradient="linear(to-r, orange.400, orange.500)"
              color="white"
              size="lg"
              _hover={{
                bgGradient: 'linear(to-r, orange.500, orange.600)',
                transform: 'scale(1.1)',
              }}
            >
              {' '}
              Sign Up for Free{' '}
            </Button>{' '}
          </HStack>{' '}
          <Button
            as={ReactRouterLink}
            to={route.login()}
            variant="link"
            color="orange.400"
            p="4"
          >
            {' '}
            Login{' '}
          </Button>{' '}
        </Grid>{' '}
      </Box>{' '}
      {/* Features Section */}{' '}
      <Box bgGradient="linear(to-b, #2D3748, orange.500)" py={16} px={8}>
        {' '}
        <Heading
          as="h2"
          fontSize={{ base: '2xl', md: '4xl' }}
          textAlign="center"
          mb={8}
          fontWeight="bold"
          bgGradient="linear(to-r, orange.400, orange.600)"
          bgClip="text"
        >
          {' '}
          Features That Make Life Easier{' '}
        </Heading>{' '}
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={8}
          textAlign="center"
          color="gray.300"
        >
          {' '}
          <VStack>
            {' '}
            <Image
              src="/icons/feature1.png"
              alt="Track Hours"
              boxSize="80px"
              mb={4}
            />{' '}
            <Text fontSize="lg" fontWeight="bold">
              {' '}
              Track Hours{' '}
            </Text>{' '}
            <Text>
              {' '}
              Effortlessly monitor crew work hours to stay on top of schedules.{' '}
            </Text>{' '}
          </VStack>{' '}
          <VStack>
            {' '}
            <Image
              src="/icons/feature2.png"
              alt="Manage Crews"
              boxSize="80px"
              mb={4}
            />{' '}
            <Text fontSize="lg" fontWeight="bold">
              {' '}
              Manage Crews{' '}
            </Text>{' '}
            <Text>
              {' '}
              Seamlessly organize and manage your production teams.{' '}
            </Text>{' '}
          </VStack>{' '}
          <VStack>
            {' '}
            <Image
              src="/icons/feature3.png"
              alt="Generate Reports"
              boxSize="80px"
              mb={4}
            />{' '}
            <Text fontSize="lg" fontWeight="bold">
              {' '}
              Generate Reports{' '}
            </Text>{' '}
            <Text>
              {' '}
              Produce insightful reports to evaluate production efficiency.{' '}
            </Text>{' '}
          </VStack>{' '}
        </SimpleGrid>{' '}
      </Box>{' '}
      {/* Call to Action Section */}{' '}
      <Box
        bgGradient="linear(to-b, orange.500, white)"
        py={16}
        textAlign="center"
        color="gray.800"
      >
        {' '}
        <Heading
          as="h2"
          fontSize={{ base: '2xl', md: '4xl' }}
          mb={6}
          fontWeight="bold"
          bgGradient="linear(to-r, orange.500, orange.600)"
          bgClip="text"
        >
          {' '}
          Ready to Simplify Your Workflow?{' '}
        </Heading>{' '}
        <Button
          as={ReactRouterLink}
          to={route.register()}
          bg="orange.600"
          color="white"
          size="lg"
          _hover={{ transform: 'scale(1.1)', bg: 'orange.700' }}
        >
          {' '}
          Get Started Now{' '}
        </Button>{' '}
      </Box>{' '}
      <Footer />{' '}
    </Box>
  );
}
