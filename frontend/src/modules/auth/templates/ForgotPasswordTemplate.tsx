import { route } from '@frontend/route';
import { Box, Center, Paragraph } from '@frontend/shared/design-system';
import { RouterLink } from '@frontend/shared/navigation/atoms';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';
import UserNavbar from '@frontend/shared/navigation/components/navbar/UserNavbar';

import { ForgotPasswordForm } from '../organisms/ForgotPasswordForm';

export type ForgotPasswordTemplateProps = {
  isLoading: boolean;
  error?: Error;
  onSubmit: (data: { email: string }) => void;
};
export function ForgotPasswordTemplate({
  isLoading,
  error,
  onSubmit,
}: ForgotPasswordTemplateProps) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar>
        <UserNavbar />
      </Navbar>
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflowY="auto"
        padding={{ base: '4', sm: '6', md: '8' }}
        mx="auto"
      >
        <ForgotPasswordForm
          isLoading={isLoading}
          errorMessage={error && error.message}
          onSubmit={onSubmit}
        >
          <Center>
            <Paragraph>
              Remember your password?
              <RouterLink p={2} to={route.login()} fontWeight={'bold'}>
                Login
              </RouterLink>
            </Paragraph>
          </Center>
        </ForgotPasswordForm>
      </Box>
      <Footer />
    </Box>
  );
}
