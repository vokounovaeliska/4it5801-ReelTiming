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
import { Form, InputField, zod, zodResolver } from '@frontend/shared/forms';

const schema = zod.object({
  password: zod.string().min(10, {
    message: 'Password is too short. It must be at least 10 characters long',
  }),
  passwordConfirmation: zod
    .string()
    .min(1, { message: 'Password confirmation is required' }),
});

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = {
  password: '',
  passwordConfirmation: '',
};

export type NewPasswordFormProps = {
  children?: ReactNode;
  isLoading: boolean;
  errorMessage?: string;
  onSubmit: (data: {
    token: string;
    password: string;
    passwordConfirmation: string;
  }) => void;
};

export function NewPasswordForm({
  isLoading,
  errorMessage,
  onSubmit,
  children,
}: NewPasswordFormProps) {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Get the token from query parameters

  const handleSubmit = (data: FormValues) => {
    if (token) {
      onSubmit({
        token,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
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
        border="1px"
        borderColor="gray.100"
        overflow="hidden"
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
          resolver={zodResolver(schema)}
          noValidate
        >
          <Stack spacing={6} pt={2} pb={6} justify="center">
            {errorMessage && <ErrorBanner title={errorMessage} />}{' '}
            <InputField
              name="password"
              label="Password"
              type="password"
              isRequired
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
            <InputField
              name="passwordConfirmation"
              label="Confirm password"
              type="password"
              isRequired
              autoComplete="off"
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
              Set new password
            </Button>
          </Stack>
          {children}
        </Form>
      </Box>
    </Box>
  );
}
