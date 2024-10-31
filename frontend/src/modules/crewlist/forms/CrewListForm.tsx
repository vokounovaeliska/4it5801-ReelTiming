import { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

import { ErrorBanner } from '@frontend/shared/design-system';
import { Form, InputField, zod, zodResolver } from '@frontend/shared/forms';

export type CrewListFormProps = {
  projectId: string;
  errorMessage?: string;
  onSubmit: (data: FormValues, sendInvite: boolean) => void;
  isLoading: boolean;
  departments: { id: string; name: string }[];
  initialValues?: FormValues;
  mode: 'add' | 'edit'; // TODO - ugly solution, refactor when free ?
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

type FormValues = zod.infer<typeof schema>;

const initialValues: FormValues = {
  name: '',
  surname: '',
  department: '',
  position: '',
  phone_number: '',
  email: '',
  standard_rate: 0,
  overtime_hour1: 0,
  overtime_hour2: 0,
  overtime_hour3: 0,
  overtime_hour4: 0,
  compensation_rate: 0,
  role: 'CREW',
};

export function CrewListForm({
  projectId: _projectId,
  errorMessage,
  onSubmit,
  isLoading,
  departments,
  initialValues: formInitialValues = initialValues,
  mode,
}: CrewListFormProps) {
  const [sendInvite, setSendInvite] = useState(false);
  return (
    <Form
      onSubmit={(data) => {
        onSubmit(data, sendInvite);
        setSendInvite(false);
      }}
      defaultValues={formInitialValues}
      resolver={zodResolver(schema)}
      noValidate
    >
      <Stack justify="center">
        {errorMessage && <ErrorBanner title={errorMessage} />}
        <Box display={{ base: 'block', lg: 'flex' }} gap={6} p="2">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <InputField
              name="name"
              label="Name"
              isRequired
              isDisabled={mode === 'edit'}
            />
            <InputField
              name="surname"
              label="Surname"
              isRequired
              isDisabled={mode === 'edit'}
            />
            <Controller
              name="department"
              render={({ field }) => (
                <FormControl isRequired>
                  <FormLabel>Department</FormLabel>
                  <Select
                    {...field}
                    placeholder="Select Department"
                    borderColor={'gray.400'}
                    borderWidth={1}
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
            <InputField name="position" label="Position" isRequired />
            <InputField
              name="email"
              label="Email"
              isRequired
              isDisabled={mode === 'edit'}
            />
            <InputField name="phone_number" label="Phone number" isRequired />
            <Controller
              name="role"
              render={({ field }) => (
                <FormControl isRequired>
                  <FormLabel>Role</FormLabel>
                  <Select {...field} borderColor={'gray.400'} borderWidth={1}>
                    <option value="CREW">CREW</option>
                    <option value="ADMIN">ADMIN</option>
                  </Select>
                </FormControl>
              )}
            />
          </SimpleGrid>
          <Divider
            orientation="vertical"
            display={{ base: 'none', lg: 'block' }}
          />
          <Divider
            orientation="horizontal"
            display={{ base: 'block', lg: 'none' }}
          />

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <InputField name="standard_rate" label="Standard rate" isRequired />
            <InputField
              name="compensation_rate"
              label="Compensation rate"
              isRequired
              type="number"
            />
            <InputField
              name="overtime_hour1"
              label="1. Overtime hour"
              isRequired
              type="number"
            />
            <InputField
              name="overtime_hour2"
              label="2. Overtime hour"
              isRequired
              type="number"
            />
            <InputField
              name="overtime_hour3"
              label="3. Overtime hour"
              isRequired
              type="number"
            />
            <InputField
              name="overtime_hour4"
              label="4. Overtime hour"
              isRequired
              type="number"
            />
          </SimpleGrid>
        </Box>
      </Stack>
      <Stack m={4} spacing={6}>
        {mode === 'add' ? (
          <>
            <Button
              type="submit"
              colorScheme="orange"
              width="100%"
              isLoading={isLoading}
              onClick={() => setSendInvite(true)}
            >
              Add Member and Send Invitation
            </Button>
            <Button
              type="submit"
              colorScheme="gray"
              width="100%"
              isLoading={isLoading}
              onClick={() => setSendInvite(false)}
            >
              Add Member without Invitation
            </Button>
          </>
        ) : (
          <>
            <Button
              type="submit"
              colorScheme="orange"
              width="100%"
              isLoading={isLoading}
            >
              Save Changes
            </Button>
          </>
        )}
      </Stack>
    </Form>
  );
}
