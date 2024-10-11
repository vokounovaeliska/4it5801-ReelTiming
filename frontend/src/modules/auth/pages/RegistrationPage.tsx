import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { gql } from '@frontend/gql';

const SIGNUP_MUTATION = gql(/* GraphQL */ `
  mutation login($email: String!, $name: String!, $password: String!) {
    login(email: $email, name: $name, password: $password) {
      user {
        id
        name
        email
      }
      token
    }
  }
`);

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Registering...');
  };

  const handleLoginRedirect = () => {
    navigate('/auth/login');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="#F7FAFC"
      p={4}
    >
      <Box
        width={{ base: '90%', sm: '400px' }} // Responsive width
        p={6}
        borderRadius="md"
        boxShadow="lg"
        bg="white"
      >
        <Heading as="h2" size="xl" textAlign="center" mb={4}>
          Register
        </Heading>
        <form onSubmit={handleRegister}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Enter your email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter your password" />
            </FormControl>
            <FormControl id="confirm-password" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" placeholder="Confirm your password" />
            </FormControl>
            <Button type="submit" colorScheme="orange" width="full" mt={4}>
              Register
            </Button>
            <Text textAlign="center" mt={2}>
              Already have an account?{' '}
              <Button
                variant="link"
                onClick={handleLoginRedirect}
                colorScheme="orange"
              >
                Login
              </Button>
            </Text>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default RegistrationPage;
