import { route } from '@frontend/route';
import { Box, Center, Paragraph } from '@frontend/shared/design-system';
import { RouterLink } from '@frontend/shared/navigation/atoms';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';

import { RegisterForm } from '../organisms/RegistrationForm';

export type RegisterProps = {
  isLoading: boolean;
  error?: Error;
  onSubmit: (data: {
    email: string;
    password: string;
    name: string;
    surname: string;
    passwordConfirmation: string;
  }) => void;
  token?: string | null;
};

export function RegisterTemplate({
  isLoading,
  error,
  onSubmit,
  token,
}: RegisterProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgColor="gray.50"
    >
      <Navbar children={undefined} />
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflowY="auto"
        padding={{ sm: '6', md: '8' }}
        mx={{ sm: 'auto' }}
        mt={4}
        width="100%"
        maxWidth={{ base: '100%', sm: '90%', md: '60%' }}
      >
        <Box textAlign="center" width="full">
          <RegisterForm
            isLoading={isLoading}
            errorMessage={error?.message}
            onSubmit={onSubmit}
          >
            <Center>
              <Paragraph fontSize={{ base: 's', sm: 'md' }}>
                Already have an account?{' '}
                <RouterLink
                  p={2}
                  to={`${route.login()}${token ? `?token=${token}` : ''}`}
                  fontWeight={'bold'}
                >
                  Login
                </RouterLink>
              </Paragraph>
            </Center>
          </RegisterForm>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
