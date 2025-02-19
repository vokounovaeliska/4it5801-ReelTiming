import { type ReactNode } from 'react';

import { route } from '@frontend/route';
import {
  Box,
  Button,
  ErrorBanner,
  Heading,
  Stack,
} from '@frontend/shared/design-system';
import { Form, InputField } from '@frontend/shared/forms';
import { PasswordInputField } from '@frontend/shared/forms/molecules/fields/PasswordInputField';
import { RouterLink } from '@frontend/shared/navigation/atoms';
import {
  loginFormSchema,
  loginFormValues,
  zodResolver,
} from '@frontend/zod/schemas';

import RequiredInfo from './RequiredInfo';

const initialValues: loginFormValues = {
  email: '',
  password: '',
};

export type LogInFormProps = {
  children?: ReactNode;
  isLoading: boolean;
  errorMessage?: string;
  onSubmit: (data: { email: string; password: string }) => void;
};

export function LogInForm({
  isLoading,
  errorMessage,
  onSubmit,
  children,
}: LogInFormProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Box
        width={{ base: '100%', sm: '350px', md: '450px', lg: '500px' }}
        maxWidth={'500px'}
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
          Login
        </Heading>
        <Form
          onSubmit={onSubmit}
          defaultValues={initialValues}
          resolver={zodResolver(loginFormSchema)}
          noValidate
        >
          <Stack py="0" width="full" justify="center">
            {errorMessage && <ErrorBanner title={errorMessage} />}
            <InputField
              name="email"
              label="Email"
              type="email"
              placeholder="@"
              isRequired
              autoFocus
              autoComplete="on"
              autoCorrect="off"
              autoCapitalize="off"
              mb={2}
            />
            <PasswordInputField
              name="password"
              label="Password"
              isRequired
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />

            <RouterLink
              alignSelf="end"
              color={'gray.500'}
              fontSize={'xs'}
              to={route.forgotPassword()}
            >
              Forgot your password?
            </RouterLink>
          </Stack>
          <Button
            w={'full'}
            size="lg"
            type="submit"
            isLoading={isLoading}
            mt="4"
            mb="2"
            colorScheme="orange"
            bg="orange.500"
            textColor={'white'}
          >
            Login
          </Button>
          {children}
          <RequiredInfo />
        </Form>
      </Box>
    </Box>
  );
}
