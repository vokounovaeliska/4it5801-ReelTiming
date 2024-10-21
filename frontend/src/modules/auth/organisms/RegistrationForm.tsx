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
    email: zod
      .string()
      .email()
      .min(1, { message: 'Email is required!' })
      .email({
        message:
          'Invalid email format. It must be in the format example@domain.com',
      }),
    name: zod.string().min(1, { message: 'Name is required' }),
    surname: zod.string().min(1, { message: 'Name is required' }),
    password: zod
      .string()
      .min(10, { message: 'Password must be at least 10 characters long ' })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
    passwordConfirmation: zod
      .string()
      .min(10, { message: 'Password must be at least 10 characters long' }),
    terms: zod.literal<boolean>(true, {
      errorMap: () => ({ message: 'You must accept the terms and conditions' }),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ['passwordConfirmation'],
        message: 'Passwords must match',
      });
    }
    if (data.password && data.password.length < 10) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ['password'],
        message: 'Password is too short',
      });
    }
  });

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = {
  email: '',
  name: '',
  surname: '',
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
    surname: string;
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
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Box
        // width={{ base: '90%', sm: '400px', md: '600px', xl: '800px' }} // Responsive width
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
