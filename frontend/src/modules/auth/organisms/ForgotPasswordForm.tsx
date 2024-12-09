import { type ReactNode } from 'react';

import {
  Box,
  Button,
  ErrorBanner,
  Heading,
  Paragraph,
  Stack,
} from '@frontend/shared/design-system';
import { Form, InputField } from '@frontend/shared/forms';
import {
  forgotPasswordFormaValues,
  forgotPasswordFormSchema,
  zodResolver,
} from '@frontend/zod/schemas';

import RequiredInfo from './RequiredInfo';

const initialValues: forgotPasswordFormaValues = {
  email: '@',
};

export type ForgotPasswordFormProps = {
  children?: ReactNode;
  isLoading: boolean;
  errorMessage?: string;
  onSubmit: (data: { email: string }) => void;
};

export function ForgotPasswordForm({
  isLoading,
  errorMessage,
  onSubmit,
  children,
}: ForgotPasswordFormProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Box
        // width={{ base: '100%' }}
        // p={6}
        width={{ base: '100%', sm: '110%', md: '500px', lg: '500px' }}
        maxWidth={'600px'}
        pt={6}
        pb={6}
        pl={4}
        pr={4}
        borderRadius="md"
        boxShadow="lg"
        bg="white"
        border="2px"
        borderColor="gray.300"
        overflow="hidden"
      >
        <Heading as="h2" size="xl" textAlign="center" mb={4}>
          Reset Your Password
        </Heading>
        <Paragraph textAlign="center">
          Type in your email and we'll send you a link to reset your password.
        </Paragraph>
        <Form
          onSubmit={onSubmit}
          defaultValues={initialValues}
          resolver={zodResolver(forgotPasswordFormSchema)}
          noValidate
        >
          <Stack spacing={6} pt={2} pb={6} justify="center">
            {errorMessage && <ErrorBanner title={errorMessage} />}{' '}
            <InputField
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              isRequired
              autoFocus
              autoComplete="on"
              autoCorrect="off"
              autoCapitalize="off"
            />
            <Button
              w="full"
              size="lg"
              type="submit"
              isLoading={isLoading}
              colorScheme="orange"
              bg="orange.500"
              textColor="white"
            >
              Send reset email
            </Button>
          </Stack>
          {children}
          <Box textAlign="center">
            <RequiredInfo />
          </Box>
        </Form>
      </Box>
    </Box>
  );
}
