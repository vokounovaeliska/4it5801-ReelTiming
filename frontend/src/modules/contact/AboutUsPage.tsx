import { Box, Divider, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { Heading } from '@frontend/shared/design-system';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';

const AboutUsPage = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar children={undefined} />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bg="#F7FAFC"
        p={{ sm: 4, md: 8, xl: 8 }}
        flex="1"
      >
        <Box
          w="100%"
          maxW={{ md: '650px', xl: '800px' }}
          p="6"
          borderRadius="md"
          borderWidth={1}
          boxShadow="md"
          bg="white"
          textAlign="center"
          fontSize={{ base: 'md', md: 'lg' }}
        >
          <Box boxSize={{ base: '80px', md: '100px' }} mx="auto" py={8}>
            <Image src="/faviconlogo.png" alt="ReelTiming Logo" />
          </Box>

          <Heading as="h1" size={{ base: 'xl', md: '2xl' }} mt={12} mb={4}>
            About Us
          </Heading>
          <Text mb={4}>
            At ReelTiming, we solve critical challenges for film producers by
            simplifying their attendance and production scheduling systems. Our
            platform is designed to streamline crew management, ensuring that
            producers can focus on creating great films while we handle the
            logistics.
          </Text>

          <Text mb={8} textAlign="justify">
            If you’re a film producer looking for innovative solutions to
            improve the efficiency of your productions, we’d love to hear from
            you. Let us know how we can assist with your attendance tracking and
            production needs.
          </Text>

          <Divider my={6} />

          <Heading
            as="h2"
            size={{ base: 'lg', md: 'xl' }}
            mb={4}
            id="contact-us"
          >
            Get in Touch
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} mb={6} textAlign="justify">
            For inquiries, partnerships, or support, please reach out to us via
            the form below or email us directly at{' '}
            <Link to="mailto:reeltiming@gmail.com">
              <strong>reeltiming@gmail.com</strong>
            </Link>
            . Our team is here to help you optimize your production process.
          </Text>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default AboutUsPage;
