import { Box, Center, Link, Paragraph } from '@frontend/shared/design-system';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';

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
    <>
      <Navbar />
      <LogInForm
        isLoading={isLoading}
        errorMessage={error && error.message}
        onSubmit={onSubmit}
      >
        <Center>
          <Link fontSize={'l'} href="/" >Forgotten password?</Link>
          </Center>
          <Center>
          <Paragraph>
            Don't have account? <Link href="/auth/signup">Sign up</Link>
          </Paragraph>
        </Center>
      </LogInForm>
      <Footer/>
      </>
  );
}
