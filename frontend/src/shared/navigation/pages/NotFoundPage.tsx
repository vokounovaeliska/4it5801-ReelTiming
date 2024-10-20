import { Box, Heading, Text } from '@chakra-ui/react';

import { route } from '@frontend/route';
import Footer from '@frontend/shared/navigation/components/footer/Footer';

import { RouterLink } from '../atoms';
import Navbar from '../components/navbar/Navbar';

export function NotFoundPage() {
  const errorSentences = [
    'This page worked overtime and took the day off.',
    "This page didn't make it to the final cut.",
    "The director yelled 'Cut!' too soon, and this page disappeared!",
    "Our crew worked all night, but this page still didn't show up!",
    'This page went missing faster than a coffee run on set.',
    "Even our best key grip couldn't locate this page.",
    'Looks like the script for this page got lost in post-production!',
    'This page took a break and forgot to clock back in.',
    'The camera was rolling, but this page forgot its lines!',
    'It seems this page went into overtime and never came back!',
  ];

  let lastIndex = -1;

  function getRandomSentence() {
    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * errorSentences.length);
    } while (randomIndex === lastIndex);

    lastIndex = randomIndex;
    return errorSentences[randomIndex];
  }

  const randomSentence = getRandomSentence();

  return (
    <Box>
      <Navbar />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={8}
        minHeight="100vh"
      >
        <Box
          bg="white"
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          textAlign="center"
          maxWidth="500px"
        >
          <Heading as="h1" fontSize="2xl" color="orange.500" mb={4}>
            Page Not Found
          </Heading>

          <Text fontSize="lg" color="gray.600" mb={2} lineHeight="1.8">
            {randomSentence} <br />
            <br />
            {''}
            <RouterLink to={route.landingPage()}>
              <Box
                as="span"
                color="orange.500"
                fontWeight="bold"
                p="1"
                border="2px"
                borderColor="orange.500"
                borderRadius="md"
                _hover={{ bg: 'orange.500', color: 'white' }}
                transition="all 0.3s ease"
              >
                Home
              </Box>
            </RouterLink>
          </Text>

          <Box
            as="span"
            fontSize="5xl"
            color="gray.500"
            role="img"
            aria-label="thinking face emoji"
          >
            🤔
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
