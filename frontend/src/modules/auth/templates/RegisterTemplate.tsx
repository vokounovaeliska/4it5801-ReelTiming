import { Box, Center, Link, Paragraph } from '@frontend/shared/design-system';
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
    passwordConfirmation: string;
  }) => void;
};

export function RegisterTemplate({
  isLoading,
  error,
  onSubmit,
}: RegisterProps) {
  // todo - navbar and footer are imported - fix - add as local
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding={{ base: '4', sm: '6', md: '8' }}
        maxWidth={{ base: '100%', sm: '80%', md: '60%' }}
        mx="auto"
      >
        <Box textAlign="center">
          <RegisterForm
            isLoading={isLoading}
            errorMessage={error?.message}
            onSubmit={onSubmit}
          >
            <Center>
              <Paragraph fontSize={{ base: 'xs', sm: 'md' }}>
                Already have an account?{' '}
                <Link href="/auth/login" color="orange.500" fontWeight="bold">
                  Login
                </Link>
              </Paragraph>
            </Center>
          </RegisterForm>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
