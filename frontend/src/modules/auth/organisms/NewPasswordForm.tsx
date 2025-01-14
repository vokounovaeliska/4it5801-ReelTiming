import { type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

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
  newPasswordFormSchema,
  newPasswordFormValues,
  zodResolver,
} from '@frontend/zod/schemas';

import RequiredInfo from './RequiredInfo';

const initialValues: newPasswordFormValues = {
  newPassword: '',
  newPasswordConfirmation: '',
};

export type NewPasswordFormProps = {
  children?: ReactNode;
  isLoading: boolean;
  errorMessage?: string;
  onSubmit: (data: {
    token: string;
    newPassword: string;
    newPasswordConfirmation: string;
  }) => void;
};

export function NewPasswordForm({
  isLoading,
  errorMessage,
  onSubmit,
  children,
}: NewPasswordFormProps) {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = (data: newPasswordFormValues) => {
    if (token) {
      onSubmit({
        token,
        newPassword: data.newPassword,
        newPasswordConfirmation: data.newPassword,
      });
    } else {
      console.error('Token is missing from the query parameters');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Box
        width={{ base: '100%' }}
        p={6}
        borderRadius="md"
        boxShadow="lg"
        bg="white"
        overflow="hidden"
        borderWidth={2}
        borderColor="gray.300"
      >
        <Heading as="h2" size="xl" textAlign="center" mb={4}>
          Choose New Password
        </Heading>
        <Paragraph textAlign="center">
          Please create a new, secure password for your account (at least 10
          characters long).
        </Paragraph>
        <Form
          onSubmit={handleSubmit}
          defaultValues={initialValues}
          resolver={zodResolver(newPasswordFormSchema)}
          noValidate
        >
          <Stack spacing={6} pt={2} pb={6} justify="center">
            {errorMessage && <ErrorBanner title={errorMessage} />}{' '}
            <InputField
              name="newPassword"
              label="Password"
              type="password"
              isRequired
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
            <InputField
              name="newPasswordConfirmation"
              label="Confirm password"
              type="password"
              isRequired
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
            <Box textAlign="left">
              <RequiredInfo />
            </Box>
            <Button
              w="full"
              size="lg"
              type="submit"
              isLoading={isLoading}
              colorScheme="orange"
              bg="orange.500"
              textColor="white"
            >
              Set new password
            </Button>
          </Stack>
          {children}
        </Form>
      </Box>
    </Box>
  );
}
