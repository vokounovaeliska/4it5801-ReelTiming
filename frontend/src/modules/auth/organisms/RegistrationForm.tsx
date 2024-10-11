import { type ReactNode } from 'react';
import { Heading } from '@chakra-ui/react';

import { route } from '@frontend/route';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@frontend/shared/design-system';
import { CheckboxField, Form, zod } from '@frontend/shared/forms';
import { RouterLink } from '@frontend/shared/navigation/atoms';

const schema = zod
  .object({
    email: zod.string().email().nonempty({ message: 'Email is required!' }),
    name: zod.string().nonempty({ message: 'Name is required' }),
    password: zod.string().nonempty({ message: 'Password is required' }),
    passwordConfirmation: zod
      .string()
      .nonempty({ message: 'Password confirmation is required' }),
    // terms: zod.literal<boolean>(true, {
    //   errorMap: () => ({ message: 'You must accept the terms and conditions' }),
    // }),
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
  //   terms: false,
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
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="#F7FAFC"
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
          Register
        </Heading>
        <Form onSubmit={onSubmit}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Enter your email" />
            </FormControl>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input type="name" placeholder="Enter your name" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter your password" />
            </FormControl>
            <FormControl id="passwordConfirmation" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" placeholder="Confirm your password" />
            </FormControl>
            <CheckboxField
              name="terms"
              label={
                <>
                  I agree with the{' '}
                  <RouterLink to={route.terms()}>
                    terms and conditions
                  </RouterLink>
                </>
              }
            />
            <Button type="submit" colorScheme="orange" width="full" mt={4}>
              Register
            </Button>
          </Stack>
        </Form>
      </Box>
    </Box>
  );
}
//   return (
//     <Form
//       onSubmit={onSubmit}
//       defaultValues={initialValues}
//       resolver={zodResolver(schema)}
//       noValidate
//     >
//       <Stack spacing="3" py="4">
//         {errorMessage && <ErrorBanner title={errorMessage} />}
//         <InputField
//           name="name"
//           label="Name"
//           type="text"
//           isRequired
//           autoFocus
//           autoComplete="on"
//           autoCorrect="off"
//           autoCapitalize="off"
//         />
//         <InputField
//           name="userName"
//           label="Username"
//           type="text"
//           isRequired
//           autoComplete="on"
//           autoCorrect="off"
//           autoCapitalize="off"
//         />
//         <InputField
//           name="email"
//           label="Email"
//           type="email"
//           isRequired
//           placeholder="e.g. john@doe.com"
//           autoComplete="on"
//           autoCorrect="off"
//           autoCapitalize="off"
//         />
//         <InputField
//           name="password"
//           label="Password"
//           type="password"
//           isRequired
//           autoComplete="off"
//           autoCorrect="off"
//           autoCapitalize="off"
//         />
//         <InputField
//           name="passwordConfirmation"
//           label="Password Confirmation"
//           type="password"
//           isRequired
//           autoComplete="off"
//           autoCorrect="off"
//           autoCapitalize="off"
//         />
//         <SingleFileUploadField
//           name="profileImage"
//           label="Profile Image"
//           accept="image/*"
//         />
//         <CheckboxField
//           name="terms"
//           label={
//             <>
//               I agree with the{' '}
//               <RouterLink to={route.terms()}>terms and conditions</RouterLink>
//             </>
//           }
//         />
//       </Stack>
//       <Button
//         size="lg"
//         type="submit"
//         isLoading={isLoading}
//         colorScheme="green"
//         mt="4"
//         mb="2"
//       >
//         Sign Up
//       </Button>
//       {children}
//     </Form>
//   );
