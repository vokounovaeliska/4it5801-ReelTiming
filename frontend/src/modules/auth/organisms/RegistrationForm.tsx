import { type ReactNode } from 'react';
import { Heading, HStack } from '@chakra-ui/react';

import { route } from '@frontend/route';
import {
  Box,
  Button,
  ErrorBanner,
  Stack,
} from '@frontend/shared/design-system';
import {
  CheckboxField,
  Form,
  InputField,
  zod,
  zodResolver,
} from '@frontend/shared/forms';
import { RouterLink } from '@frontend/shared/navigation/atoms';

const schema = zod
  .object({
    email: zod.string().email().nonempty({ message: 'Email is required!' }),
    name: zod.string().nonempty({ message: 'Name is required' }),
    password: zod.string().nonempty({ message: 'Password is required' }),
    passwordConfirmation: zod
      .string()
      .nonempty({ message: 'Password confirmation is required' }),
    terms: zod.literal<boolean>(true, {
      errorMap: () => ({ message: 'You must accept the terms and conditions' }),
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  });

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = {
  email: '',
  name: '',
  password: '',
  passwordConfirmation: '',
  terms: false,
};

export type RegisterProps = {
  children?: ReactNode;
  isLoading: boolean;
  errorMessage?: string;
  onSubmit: (data: {
    email: string;
    password: string;
    name: string;
    passwordConfirmation: string;
    // terms: boolean;
  }) => void;
};

export function RegisterForm({
  isLoading,
  errorMessage,
  onSubmit,
  children,
}: RegisterProps) {
  return (
    <Box
      width={{ base: '90%', sm: '400px', md: '600px', xl: '800px' }} // Responsive width
      p={4}
      borderRadius="md"
      boxShadow="lg"
      bg="white"
    >
      <Heading as="h2" size="xl" textAlign="center" mb={4}>
        Register
      </Heading>
      <Form
        onSubmit={onSubmit}
        defaultValues={initialValues}
        resolver={zodResolver(schema)}
      >
        <Stack spacing={4} mb="2">
          {errorMessage && <ErrorBanner title={errorMessage} />}

          <HStack
            display={{
              sm: 'block',
              md: 'block',
              xl: 'inline-flex',
            }}
            spacing={{ base: '2', xl: '4' }}
          >
            <InputField
              name="name"
              label="Name"
              type="text"
              placeholder="John"
              isRequired
              autoFocus
              autoComplete="on"
              autoCorrect="off"
              autoCapitalize="off"
            />
            <InputField
              name="surname"
              label="Surname"
              type="surname"
              isRequired
              placeholder="Doe"
              autoComplete="on"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </HStack>
          <InputField
            name="email"
            label="Email"
            type="email"
            isRequired
            placeholder="e.g. john@doe.com"
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
          <InputField
            name="passwordConfirmation"
            label="Password Confirmation"
            type="password"
            isRequired
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
          <CheckboxField
            name="terms"
            label={
              <>
                I agree with the{' '}
                <RouterLink to={route.terms()} color="orange.500">
                  terms and conditions
                </RouterLink>
              </>
            }
          />
          <Button
            type="submit"
            colorScheme="orange"
            width="full"
            mt={4}
            isLoading={isLoading}
          >
            Register
          </Button>
        </Stack>
        {children}
      </Form>
    </Box>
  );
}
