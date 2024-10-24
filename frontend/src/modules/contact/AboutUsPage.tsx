import { Box, Divider, Heading, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';

const AboutUsPage = () => {
  return (
    <>
      <Navbar children={undefined} />
      <Box boxSize={{ base: '80px', md: '100px' }} mx="auto" py={30}>
        <Image src="/faviconlogo.png" alt="ReelTiming Logo" />
      </Box>
      <Box
        maxW={{ base: '90%', md: '800px' }}
        mx="auto"
        p={4}
        mt={8}
        minHeight="100vh"
      >
        <Heading
          as="h1"
          size={{ base: 'xl', md: '2xl' }}
          textAlign="center"
          mb={6}
        >
          About Us
        </Heading>

        <Text fontSize={{ base: 'md', md: 'lg' }} mb={4} textAlign="center">
          At ReelTiming, we solve critical challenges for film producers by
          simplifying their attendance and production scheduling systems. Our
          platform is designed to streamline crew management, ensuring that
          producers can focus on creating great films while we handle the
          logistics.
        </Text>

        <Text fontSize={{ base: 'sm', md: 'md' }} mb={8} textAlign="center">
          If you’re a film producer looking for innovative solutions to improve
          the efficiency of your productions, we’d love to hear from you. Let us
          know how we can assist with your attendance tracking and production
          needs.
        </Text>

        <Divider my={6} />

        {/* Contact Section */}
        <Heading as="h2" size={{ base: 'lg', md: 'xl' }} mb={4}>
          Get in Touch
        </Heading>

        <Text fontSize={{ base: 'sm', md: 'md' }} mb={6}>
          For inquiries, partnerships, or support, please reach out to us via
          the form below or email us directly at{' '}
          <Link to="mailto:reeltiming@gmail.com">
            <strong>reeltiming@gmail.com</strong>
          </Link>
          . Our team is here to help you optimize your production process.
        </Text>
      </Box>

      <Footer />
    </>
  );
};

export default AboutUsPage;
