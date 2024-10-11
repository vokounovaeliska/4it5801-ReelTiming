import { Box, Link, Paragraph } from '@frontend/shared/design-system';

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
      <LogInForm
        isLoading={isLoading}
        errorMessage={error && error.message}
        onSubmit={onSubmit}
      >
        <Box>
          <Link href="/">Forgotten password?</Link>
        </Box>
        <Box>
          <Paragraph> Don't have account? <Link href="/">Sign up</Link>
          </Paragraph>
        </Box>

      </LogInForm>
    </>
  );
}
