import { route } from '@frontend/route';
import { Box, Center } from '@frontend/shared/design-system';
import { RouterLink } from '@frontend/shared/navigation/atoms';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';

import { NewPasswordForm } from '../organisms/NewPasswordForm';

export type NewPasswordTemplateProps = {
  isLoading: boolean;
  error?: Error;
  onSubmit: (data: {
    token: string;
    password: string;
    passwordConfirmation: string;
  }) => void;
};
export function NewPasswordTemplate({
  isLoading,
  error,
  onSubmit,
}: NewPasswordTemplateProps) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflowY="auto"
        padding={{ base: '4', sm: '6', md: '8' }}
        mx="auto"
      >
        <NewPasswordForm
          isLoading={isLoading}
          errorMessage={error && error.message}
          onSubmit={onSubmit}
        >
          <Center>
            <RouterLink p={2} to={route.landingPage()} fontWeight={'bold'}>
              Cancel
            </RouterLink>
          </Center>
        </NewPasswordForm>
      </Box>
      <Footer />
    </Box>
  );
}
