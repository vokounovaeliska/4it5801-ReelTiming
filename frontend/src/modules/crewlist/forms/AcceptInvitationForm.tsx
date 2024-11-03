import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

import { AuthUser } from '@frontend/modules/auth/auth-core';
import { ErrorBanner } from '@frontend/shared/design-system';
import { Form, InputField, zod, zodResolver } from '@frontend/shared/forms';
import { FormSection } from '@frontend/shared/forms/molecules/FormSection';

export type AcceptInvitationFormProps = {
  errorMessage?: string;
  onSubmit: (data: FormValues) => void;
  isLoading: boolean;
  projectUserData: ProjectUserData;
  departments: { id: string; name: string }[];
  authUser: AuthUser;
};

export type ProjectUserData = {
  id: string;
  project: {
    id: string;
    name: string;
    description: string;
  };
  department: { id: string; name: string };
  position: string;
  phone_number: string;
  email: string;
  role: string;
  rate?: {
    id: string;
    standard_rate: number;
    compensation_rate: number;
    overtime_hour1: number;
    overtime_hour2: number;
    overtime_hour3: number;
    overtime_hour4: number;
  };
  name: string;
  surname: string;
};

const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{9}$/;

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
  standard_rate: zod.preprocess(
    (val) => (typeof val === 'string' ? parseFloat(val) : val),
    zod.number().nonnegative({ message: 'Must be a non-negative number' }),
  ),
  compensation_rate: zod.preprocess(
    (val) => (typeof val === 'string' ? parseFloat(val) : val),
    zod.number().nonnegative({ message: 'Must be a non-negative number' }),
  ),
  overtime_hour1: zod.preprocess(
    (val) => (typeof val === 'string' ? parseFloat(val) : val),
    zod.number().nonnegative({ message: 'Must be a non-negative number' }),
  ),
  overtime_hour2: zod.preprocess(
    (val) => (typeof val === 'string' ? parseFloat(val) : val),
    zod.number().nonnegative({ message: 'Must be a non-negative number' }),
  ),
  overtime_hour3: zod.preprocess(
    (val) => (typeof val === 'string' ? parseFloat(val) : val),
    zod.number().nonnegative({ message: 'Must be a non-negative number' }),
  ),
  overtime_hour4: zod.preprocess(
    (val) => (typeof val === 'string' ? parseFloat(val) : val),
    zod.number().nonnegative({ message: 'Must be a non-negative number' }),
  ),
  role: zod.string().default('CREW'),
});

export type FormValues = zod.infer<typeof schema>;

export function AcceptInvitationForm({
  errorMessage,
  onSubmit,
  isLoading,
  departments,
  projectUserData,
}: AcceptInvitationFormProps) {
  const initialValues: FormValues = {
    name: projectUserData?.name || '',
    surname: projectUserData?.surname || '',
    department: projectUserData?.department?.id || '',
    position: projectUserData?.position || '',
    phone_number: projectUserData?.phone_number || '',
    email: projectUserData?.email || '',
    standard_rate: projectUserData?.rate?.standard_rate || 0,
    overtime_hour1: projectUserData?.rate?.overtime_hour1 || 0,
    overtime_hour2: projectUserData?.rate?.overtime_hour2 || 0,
    overtime_hour3: projectUserData?.rate?.overtime_hour3 || 0,
    overtime_hour4: projectUserData?.rate?.overtime_hour4 || 0,
    compensation_rate: projectUserData?.rate?.compensation_rate || 0,
    role: projectUserData?.role || 'CREW',
  };

  return (
    <>
      <Box maxWidth={{ base: '100%', md: '90%', lg: '70%' }} mx="auto" p={4}>
        <Heading as="h2" size="xl" mb={4}>
          Invitation to project{' '}
          <Text as="span" fontStyle="italic" color="orange.500">
            {projectUserData.project?.name}
          </Text>
        </Heading>
        <Text mb={6}>{projectUserData.project?.description}</Text>
        {errorMessage && <ErrorBanner title={errorMessage} />}
      </Box>
      <Form
        onSubmit={onSubmit}
        defaultValues={initialValues}
        resolver={zodResolver(schema)}
        noValidate
      >
        <Stack spacing={5}>
          <FormSection
            title="Personal Information"
            description="Please verify all your personal information."
          >
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <InputField name="name" label="Name" isRequired />
              <InputField name="surname" label="Surname" isRequired />
              <InputField name="email" label="Email" isRequired />
              <InputField name="phone_number" label="Phone Number" isRequired />
            </SimpleGrid>
          </FormSection>

          <FormSection
            title="Project Information"
            description="Please verify that project information are correct."
          >
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Controller
                name="department"
                render={({ field }) => (
                  <FormControl isRequired>
                    <FormLabel>Department</FormLabel>
                    <Select
                      {...field}
                      placeholder="Select Department"
                      borderColor="gray.400"
                      borderWidth={1}
                      isDisabled
                    >
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              <InputField
                name="position"
                label="Position"
                isRequired
                isDisabled
              />
            </SimpleGrid>
          </FormSection>

          <FormSection
            title="Rates & Compensation"
            description="Please confirm your standard and overtime rates."
          >
            <InputField name="standard_rate" label="Standard Rate" isRequired />
            <InputField
              name="compensation_rate"
              label="Compensation Rate"
              type="number"
              isRequired
            />
            <InputField
              name="overtime_hour1"
              label="1. Overtime Hour"
              type="number"
              isRequired
            />
            <InputField
              name="overtime_hour2"
              label="2. Overtime Hour"
              type="number"
              isRequired
            />
            <InputField
              name="overtime_hour3"
              label="3. Overtime Hour"
              type="number"
              isRequired
            />
            <InputField
              name="overtime_hour4"
              label="4. Overtime Hour"
              type="number"
              isRequired
            />
          </FormSection>

          <Stack align="flex-end">
            <Button
              type="submit"
              colorScheme="orange"
              isLoading={isLoading}
              width={{ base: '100%', md: '50%' }}
              maxWidth="200px"
              size={'lg'}
            >
              Join the Project
            </Button>
          </Stack>
        </Stack>
      </Form>
    </>
  );
}
