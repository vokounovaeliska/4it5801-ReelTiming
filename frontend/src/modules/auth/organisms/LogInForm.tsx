import { type ReactNode } from 'react';

import { route } from '@frontend/route';
import {
  Box,
  Button,
  ErrorBanner,
  Heading,
  Stack,
} from '@frontend/shared/design-system';
import { Form, InputField, zod, zodResolver } from '@frontend/shared/forms';
import { RouterLink } from '@frontend/shared/navigation/atoms';

const schema = zod.object({
  email: zod.string().email().min(1),
  password: zod.string().min(1, { message: 'Password is required' }),
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
      p={4}
    >
      <Box
        width={{ base: '100%', sm: '170%', md: '400px', lg: '400px' }}
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
          resolver={zodResolver(schema)}
          noValidate
        >
          <Stack
            py="0"
            // width={{ base: '200px', sm: '300px', md: '400px' }}
            width="full"
            justify="center"
          >
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
            <InputField
              name="password"
              label="Password"
              type="password"
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
        </Form>
      </Box>
    </Box>
  );
}
