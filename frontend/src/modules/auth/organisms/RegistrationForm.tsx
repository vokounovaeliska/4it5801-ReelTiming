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
import { PasswordInputField } from '@frontend/shared/forms/molecules/fields/PasswordInputField';
import { RouterLink } from '@frontend/shared/navigation/atoms';

const schema = zod
  .object({
    email: zod.string().email(),
    password: zod
      .string()
      .min(8, 'Password must be at least 8 characters long'),
    passwordConfirmation: zod
      .string()
      .min(8, 'Password confirmation must be at least 8 characters long'),
    name: zod.string().min(1, 'Name is required'),
    surname: zod.string().min(1, 'Surname is required'),
    terms: zod
      .boolean()
      .refine(
        (val) => val === true,
        'You must accept the terms and conditions',
      ),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  });

const initialValues = {
  email: '',
  password: '',
  passwordConfirmation: '',
  name: '',
  surname: '',
  terms: false,
};

export type RegisterProps = {
  isLoading: boolean;
  errorMessage?: string;
  onSubmit: (data: typeof initialValues) => void;
  children?: ReactNode;
};

export function RegisterForm({
  isLoading,
  errorMessage,
  onSubmit,
  children,
}: RegisterProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Box
        width={{ base: '100%', sm: '350px', md: '480px', lg: '700px' }}
        maxWidth="600px"
        pt={4}
        pb={6}
        pl={4}
        pr={4}
        borderRadius="md"
        boxShadow="lg"
        bg="white"
        border="2px"
        borderColor="gray.300"
        overflow="hidden"
        minW={'200px'}
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
                type="text"
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
            <PasswordInputField
              name="password"
              label="Password"
              isRequired
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
            <PasswordInputField
              name="passwordConfirmation"
              label="Password Confirmation"
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
                  <RouterLink
                    to={route.terms()}
                    color="orange.500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
    </Box>
  );
}
