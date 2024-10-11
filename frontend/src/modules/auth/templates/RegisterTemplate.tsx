import { Box, Button, Heading, Text } from '@chakra-ui/react';

import { route } from '@frontend/route';
import { RouterLink, RouterNavLink } from '@frontend/shared/navigation/atoms';
import { TopNavigation } from '@frontend/shared/navigation/organisms/TopNavigation';

import { RegisterForm } from '../organisms/RegistrationForm';

export type RegisterProps = {
  isLoading: boolean;
  error?: Error;
  onSubmit: (data: {
    email: string;
    password: string;
    name: string;
    passwordConfirmation: string;
  }) => void;
};

export function RegisterTemplate({
  isLoading,
  error,
  onSubmit,
}: RegisterProps) {
  return (
    <>
      <TopNavigation />
      <Heading mb="4">Sign Up</Heading>

      <RegisterForm
        isLoading={isLoading}
        errorMessage={error?.message}
        onSubmit={onSubmit}
      >
        <Box>
          <Text textAlign="center" mt={2}>
            Already have an account?{' '}
            <Button
              as={RouterNavLink}
              to={'auth/login'}
              variant="link"
              colorScheme="orange"
            >
              Login
            </Button>
          </Text>
          or <RouterLink to={route.login()}>Sign In</RouterLink>
        </Box>
      </RegisterForm>
    </>
  );
}
