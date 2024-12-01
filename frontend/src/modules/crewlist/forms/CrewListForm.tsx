import { useState } from 'react';
import {
  AbsoluteCenter,
  Box,
  Button,
  Collapse,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { Controller } from 'react-hook-form';

import { ErrorBanner } from '@frontend/shared/design-system';
import { Form, InputField, zod, zodResolver } from '@frontend/shared/forms';
import {
  Car,
  CarFormWithTable,
} from '@frontend/shared/forms/VehicleEnrollment';

import { CarData } from '../interfaces/interfaces';

export type CrewListFormProps = {
  projectId: string;
  errorMessage?: string;
  onSubmit: (data: FormValues, sendInvite: boolean, cars: Car[]) => void;
  isLoading: boolean;
  departments: { id: string; name: string }[];
  initialValues?: FormValues;
  mode: 'add' | 'edit';
  userRole: 'ADMIN' | 'CREW';
  cars?: CarData[] | null;
};

const schema = zod.object({
  name: zod.string().min(1),
  surname: zod.string().min(1),
  department: zod.string().min(1, { message: 'Department must be selected.' }),
  position: zod.string().min(1),
  phone_number: zod
    .string()
    .min(1, { message: 'Phone number is required' })
    .refine(
      (val) => {
        const phoneNumber = parsePhoneNumberFromString(val, 'CZ');
        return phoneNumber?.isValid() ?? false;
      },
      {
        message:
          'Invalid phone number format. Example: +420607887591 or 420607887591',
      },
    ),
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
  // cars: zod.array(carSchema).default([]),
});

export type FormValues = zod.infer<typeof schema>;

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
  // cars: [],
};

export function CrewListForm({
  projectId: _projectId,
  errorMessage,
  onSubmit,
  isLoading,
  departments,
  initialValues: formInitialValues = initialValues,
  mode,
  userRole,
  cars,
}: CrewListFormProps) {
  const [sendInvite, setSendInvite] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  function transformedCars(carData: CarData[] | null | undefined): Car[] {
    console.log(carData);
    if (carData === null || carData === undefined) {
      return [];
    }
    return carData.map((car) => ({
      vehicle_name: car.vehicle_name,
      included_mileage: car.included_mileage,
      extra_mileage: car.extra_mileage,
    }));
  }

  const [carData, setCarData] = useState<Car[]>([]);

  const handleCarCollectionChange = (cars: Car[]) => {
    setCarData(cars);
    console.log('Updated car collection in parent:', cars);
  };

  return (
    <Form
      onSubmit={(data) => {
        onSubmit(data, sendInvite, carData);
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
            <InputField name="name" label="Name" isRequired />
            <InputField name="surname" label="Surname" isRequired />
            <Controller
              name="department"
              render={({ field, fieldState }) => (
                <FormControl
                  isRequired={userRole === 'ADMIN'}
                  isInvalid={!!fieldState.error}
                >
                  <FormLabel>Department</FormLabel>
                  <Select
                    {...field}
                    placeholder="Select Department"
                    borderColor="gray.400"
                    borderWidth={1}
                    isDisabled={userRole !== 'ADMIN'}
                  >
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>
                    {fieldState.error?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <InputField
              name="position"
              label="Position"
              isRequired
              isDisabled={userRole !== 'ADMIN'}
            />
            <InputField name="email" label="Email" isRequired />
            <InputField name="phone_number" label="Phone number" isRequired />
            <Controller
              name="role"
              render={({ field }) => (
                <FormControl isRequired isDisabled={userRole !== 'ADMIN'}>
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

        <Box position="relative" padding="2">
          <Divider />
          <AbsoluteCenter px="4">
            <Button
              onClick={toggleCollapse}
              variant="ghost"
              bg="white"
              colorScheme="orange"
              size="sm"
            >
              {isOpen ? 'Hide Car Mileage' : 'Show Car Mileage'}
            </Button>
          </AbsoluteCenter>
        </Box>
        <Collapse in={isOpen} animateOpacity>
          <Box p="4">
            <CarFormWithTable
              onCarCollectionChange={handleCarCollectionChange}
              cars={carData}
            />
          </Box>
        </Collapse>

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
            <Button
              type="submit"
              colorScheme="orange"
              width="100%"
              isLoading={isLoading}
            >
              Save Changes
            </Button>
          )}
        </Stack>
      </Stack>
    </Form>
  );
}
