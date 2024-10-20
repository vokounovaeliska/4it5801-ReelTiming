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
};

export function RegisterTemplate({
  isLoading,
  error,
  onSubmit,
}: RegisterProps) {
  // todo - navbar and footer are imported - fix - add as local
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgColor={'gray.50'}
    >
      <Navbar />
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflowY="auto"
        padding={{ base: '4', sm: '6', md: '8' }}
        // maxWidth={{ base: '100%', sm: '80%', md: '60%' }}
        mx="auto"
        width="100%"
        maxWidth="800px"
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
                <RouterLink p={2} to={route.login()} fontWeight={'bold'}>
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
