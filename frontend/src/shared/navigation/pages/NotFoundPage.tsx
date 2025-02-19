import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Link,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';

import { route } from '@frontend/route';
import { Heading } from '@frontend/shared/design-system';
import Footer from '@frontend/shared/navigation/components/footer/Footer';

import { ReactRouterLink } from '../atoms';
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
    <>
      <Navbar children={undefined} />
      <Box
        display="flex"
        alignItems="flex-start" // Align items to the top
        justifyContent="center"
        p={8}
        minHeight="100vh"
        bg="#F7FAFC"
        pt={12} // Add top padding to move it away from the top a bit
      >
        <SimpleGrid
          columns={1}
          bg="white"
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          borderWidth={1}
          textAlign="center"
          w="100%"
          maxW={{ md: '650px', xl: '800px' }} // Responsive width
        >
          <Heading as="h1" fontSize="2xl" color="orange.500" mb={4}>
            404 Page Not Found
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={2} lineHeight="1.8">
            {randomSentence}
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
          <Button
            m={4}
            as={ReactRouterLink}
            to={route.landingPage()}
            colorScheme="orange"
            textColor="white"
            justifySelf={'center'}
            leftIcon={<FaHome />}
            _hover={{
              bg: 'orange.700',
              color: 'white',
              boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            Home
          </Button>
          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left" color="gray.600">
                  What happened?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel color="gray.600" textAlign="justify">
                It looks like the page you're trying to visit doesn't exist
                anymore or was never there in the first place. This could happen
                because the URL was typed incorrectly, the page was moved, or it
                no longer exists. Don't worry though! You can go back to the{' '}
                <Link
                  as={ReactRouterLink}
                  to={route.landingPage()}
                  color="orange.500"
                >
                  homepage
                </Link>
                , or feel free to{' '}
                <Link
                  as={ReactRouterLink}
                  to={`${route.about()}#contact-us`}
                  color="orange.500"
                >
                  contact us
                </Link>{' '}
                if you need further assistance.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </SimpleGrid>
      </Box>
      <Footer />
    </>
  );
}
