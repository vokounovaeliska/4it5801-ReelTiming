import { type ReactNode } from 'react';

import {
  Box,
  Button,
  ErrorBanner,
  Flex,
  Heading,
  Stack,
} from '@frontend/shared/design-system';
import { Form, InputField, zod, zodResolver } from '@frontend/shared/forms';

const schema = zod.object({
  email: zod.string().email().nonempty(),
  password: zod.string().nonempty({ message: 'Password is required' }),
});

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = {
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
      height="50vh"
      p={4}
    >
      <Box
        width={{ base: '90%', sm: '400px' }} // Responsive width
        p={6}
        borderRadius="md"
        boxShadow="lg"
        bg="white"
      >
        <Heading as="h2" size="xl" textAlign="center" mb={4}>
          Login
        </Heading>
        <Form
          onSubmit={onSubmit}
          defaultValues={initialValues}
          resolver={zodResolver(schema)}
          noValidate
        >
          <Stack spacing="3" py="4" maxWidth="500px" justify="center">
            {errorMessage && <ErrorBanner title={errorMessage} />}
            <InputField
              name="email"
              label="Email"
              type="email"
              placeholder=""
              isRequired
              autoFocus
              autoComplete="on"
              autoCorrect="off"
              autoCapitalize="off"
            />
            <InputField
              name="password"
              label="Password"
              type="password"
              isRequired
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </Stack>
          <Button
            size="lg"
            type="submit"
            isLoading={isLoading}
            mt="4"
            mb="2"
            colorScheme="orange"
            bg="orange.600"
            textColor={'white'}
          >
            Sign In
          </Button>
          {children}
        </Form>
      </Box>
    </Box>
  );
}
