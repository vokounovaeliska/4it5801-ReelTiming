// ErrorPage.tsx
import React from 'react';
import { Button, Center, Heading, Text } from '@chakra-ui/react';

import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';

interface ErrorMyProjectPageProps {
  errorMessage: string;
  onRetry: () => void;
}

const ErrorMyProjectPage: React.FC<ErrorMyProjectPageProps> = ({
  errorMessage,
  onRetry,
}) => {
  const isNetworkError = errorMessage.includes('Network error');

  return (
    <>
      <Navbar />
      <Center minHeight="100vh" flexDirection="column">
        <Heading as="h3" size="lg" color="orange.500" mb={4}>
          Error fetching projects
        </Heading>
        <Text color="gray.600" textAlign="center">
          {isNetworkError
            ? 'It seems there is an issue with the database connection. Please check your connection or try again later.'
            : `Error: ${errorMessage}`}
        </Text>
        <Button mt={4} onClick={onRetry} colorScheme="orange">
          Retry
        </Button>
      </Center>
      <Footer />
    </>
  );
};

export default ErrorMyProjectPage;
