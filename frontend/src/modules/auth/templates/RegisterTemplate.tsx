import { Box, Heading } from '@chakra-ui/react';

import { route } from '@frontend/route';
import { RouterLink } from '@frontend/shared/navigation/atoms';
import { TopNavigation } from '@frontend/shared/navigation/organisms/TopNavigation';

import { RegisterForm } from '../organisms/RegistrationForm';

export type SignUpTemplateProps = {
  isLoading: boolean;
  error?: Error;
  onSubmit: (data: {
    email: string;
    password: string;
    userName: string;
    name: string;
    profileImage: File | null;
  }) => void;
};

export function SignUpTemplate({
  isLoading,
  error,
  onSubmit,
}: SignUpTemplateProps) {
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
          or <RouterLink to={route.signIn()}>Sign In</RouterLink>
        </Box>
      </RegisterForm>
    </>
  );
}
