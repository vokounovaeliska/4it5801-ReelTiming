import { route } from '@frontend/route';
import { Box, Center, Paragraph } from '@frontend/shared/design-system';
import { RouterLink } from '@frontend/shared/navigation/atoms';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';

// import UserNavbar from '@frontend/shared/navigation/components/navbar/UserNavbar';
// import UserNavbarMobile from '@frontend/shared/navigation/components/navbar/UserNavbarMobile';
import { LogInForm } from '../organisms/LogInForm';

export type LogInTemplateProps = {
  isLoading: boolean;
  error?: Error;
  onSubmit: (data: { email: string; password: string }) => void;
};
export function LogInTemplate({
  isLoading,
  error,
  onSubmit,
}: LogInTemplateProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgColor={'gray.50'}
    >
      {/* <Navbar children1={<UserNavbar />} children2={<UserNavbarMobile />} /> */}
      <Navbar />
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflowY="auto"
        padding={{ base: '4', sm: '6', md: '8' }}
        mx="auto"
        width="100%"
        maxWidth="600px"
      >
        <LogInForm
          isLoading={isLoading}
          errorMessage={error && error.message}
          onSubmit={onSubmit}
        >
          <Center>
            <Paragraph>
              Don't have an account?
              <RouterLink p={2} to={route.register()} fontWeight={'bold'}>
                Sign up
              </RouterLink>
            </Paragraph>
          </Center>
        </LogInForm>
      </Box>
      <Footer />
    </Box>
  );
}
