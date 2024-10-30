import { Button, SimpleGrid, Stack } from '@chakra-ui/react';

import { AuthUser } from '@frontend/modules/auth/auth-core';
import { ErrorBanner } from '@frontend/shared/design-system';
import { Form, InputField, zod, zodResolver } from '@frontend/shared/forms';

export type AcceptInvitationFormProps = {
  errorMessage?: string;
  onSubmit: (data: FormValues) => void;
  isLoading: boolean;
  projectUserData: {
    department?: { name: string };
    position?: string;
    phone_number?: string;
    standard_rate?: number;
    overtime_hour1?: number;
    overtime_hour2?: number;
    overtime_hour3?: number;
    overtime_hour4?: number;
    compensation_rate?: number;
    role?: string;
  };
  authUser: AuthUser;
};

const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

const schema = zod.object({
  name: zod.string().min(1),
  surname: zod.string().min(1),
  department: zod.string().min(1),
  position: zod.string().min(1),
  phone_number: zod
    .string()
    .min(1, { message: 'Phone number is required' })
    .regex(phoneRegex, {
      message:
        'Invalid phone number format. Example: +420607887591 or 420607887591',
    }),
  email: zod.string().email().min(1),
  standard_rate: zod.number(),
  overtime_hour1: zod.number(),
  overtime_hour2: zod.number(),
  overtime_hour3: zod.number(),
  overtime_hour4: zod.number(),
  compensation_rate: zod.number(),
  role: zod.string().default('CREW'),
});

type FormValues = zod.infer<typeof schema>;

export function AcceptInvitationForm({
  errorMessage,
  onSubmit,
  isLoading,
  projectUserData,
  authUser,
}: AcceptInvitationFormProps) {
  const initialValues: FormValues = {
    name: authUser?.name || '',
    surname: authUser?.surname || '',
    department: projectUserData?.department?.name || '',
    position: projectUserData?.position || '',
    phone_number: projectUserData?.phone_number || '',
    email: authUser?.email || '',
    standard_rate: projectUserData?.standard_rate || 0,
    overtime_hour1: projectUserData?.overtime_hour1 || 0,
    overtime_hour2: projectUserData?.overtime_hour2 || 0,
    overtime_hour3: projectUserData?.overtime_hour3 || 0,
    overtime_hour4: projectUserData?.overtime_hour4 || 0,
    compensation_rate: projectUserData?.compensation_rate || 0,
    role: projectUserData?.role || 'CREW',
  };
  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={initialValues}
      resolver={zodResolver(schema)}
      noValidate
    >
      <Stack justify="center">
        {errorMessage && <ErrorBanner title={errorMessage} />}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <InputField name="name" label="Name" isRequired isDisabled />
          <InputField name="surname" label="Surname" isRequired isDisabled />
          <InputField
            name="department"
            label="Department"
            isRequired
            isDisabled
          />
          <InputField name="position" label="Position" isRequired isDisabled />
          <InputField name="email" label="Email" isRequired isDisabled />
          <InputField name="phone_number" label="Phone number" isRequired />
          <InputField name="standard_rate" label="Standard rate" isRequired />
          <InputField
            name="compensation_rate"
            label="Compensation rate"
            isRequired
          />
          <InputField
            name="overtime_hour1"
            label="1. Overtime hour"
            isRequired
          />
          <InputField
            name="overtime_hour2"
            label="2. Overtime hour"
            isRequired
          />
          <InputField
            name="overtime_hour3"
            label="3. Overtime hour"
            isRequired
          />
          <InputField
            name="overtime_hour4"
            label="4. Overtime hour"
            isRequired
          />
          <InputField name="role" label="Role" isRequired isDisabled />
        </SimpleGrid>
      </Stack>
      <Stack m={4} spacing={6}>
        <Button
          type="submit"
          colorScheme="orange"
          width="100%"
          isLoading={isLoading}
        >
          Join the project
        </Button>
      </Stack>
    </Form>
  );
}
