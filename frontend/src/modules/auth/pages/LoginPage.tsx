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

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your login logic here
    console.log('Logging in...');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  return (
    <Box
      display="flex"
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
          Login
        </Heading>
        <form onSubmit={handleLogin}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Enter your email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter your password" />
            </FormControl>
            <Button type="submit" colorScheme="orange" width="full" mt={4}>
              Login
            </Button>
            <Button
              variant="link"
              onClick={handleForgotPassword}
              colorScheme="orange"
              textAlign="center"
            >
              Forgot Password?
            </Button>
            <Text textAlign="center" mt={2}>
              Don't have an account?{' '}
              <Button
                variant="link"
                onClick={handleRegister}
                colorScheme="orange"
              >
                Register
              </Button>
            </Text>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage; // Make sure this is the default export
