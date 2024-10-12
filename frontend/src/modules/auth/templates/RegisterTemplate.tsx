import { Box, Link } from '@chakra-ui/react';

import { route } from '@frontend/route';
import { RouterNavLink } from '@frontend/shared/navigation/atoms';

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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bg="#F7FAFC"
        p={4}
      >
        <Box textAlign="center">
          <RegisterForm
            isLoading={isLoading}
            errorMessage={error?.message}
            onSubmit={onSubmit}
          >
            <Box display="inline" textAlign="center">
              Already have an account?{' '}
              <Link
                as={RouterNavLink}
                to={route.login()}
                color="orange.500"
                fontWeight="bold"
                display="inline"
              >
                Login
              </Link>
            </Box>
          </RegisterForm>
        </Box>
      </Box>
    </>
  );
}
