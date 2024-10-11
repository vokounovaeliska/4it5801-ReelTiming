import { Box, Center, Link, Paragraph } from '@frontend/shared/design-system';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';

import { LogInForm } from '../organisms/LogInForm';

export type LogInTemplateProps = {
  isLoading: boolean;
  error?: Error;
  onSubmit: (data: { email: string; password: string }) => void;
};
// todo - on extreme vertical shrink login window 'hides' behind navbar - fix pls
export function LogInTemplate({
  isLoading,
  error,
  onSubmit,
}: LogInTemplateProps) {
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
        maxWidth={{ base: '100%', sm: '80%', md: '60%' }}
        mx="auto"
      >
        <LogInForm
          isLoading={isLoading}
          errorMessage={error && error.message}
          onSubmit={onSubmit}
        >
          <Center>
            <Link
              fontSize={{ base: 'xs', sm: 'sm' }} // todo - tweak those so it looks good
              href="/"
            >
              Forgotten password?
            </Link>
          </Center>
          <Center>
            <Paragraph
              fontSize={{ base: 'xs', sm: 'md' }} // tweak those too
            >
              Don't have an account? <Link href="/auth/signup">Sign up</Link>
            </Paragraph>
          </Center>
        </LogInForm>
      </Box>
      <Footer />
    </Box>
  );
}
