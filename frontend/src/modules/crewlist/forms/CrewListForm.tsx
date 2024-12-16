import { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

import { Car, CarStatement } from '@frontend/modules/timesheets/interfaces';
import { ErrorBanner } from '@frontend/shared/design-system';
import { Form, InputField } from '@frontend/shared/forms';
import { FormSection } from '@frontend/shared/forms/molecules/FormSection';
import { CarFormWithTable } from '@frontend/shared/forms/VehicleFulfillmentForm';
import {
  crewListFormSchema,
  crewListFormValues,
  zodResolver,
} from '@frontend/zod/schemas';

export type CrewListFormProps = {
  projectId: string;
  errorMessage?: string;
  onSubmit: (
    data: crewListFormValues,
    sendInvite: boolean,
    cars: Car[],
    oldCars: Car[],
  ) => void;
  isLoading: boolean;
  departments: { id: string; name: string }[];
  initialValues?: crewListFormValues;
  mode: 'add' | 'edit';
  userRole: 'ADMIN' | 'CREW';
  cars: Car[] | null;
  projectCurrency: string;
  carStatements: CarStatement[];
};

const initialValues: crewListFormValues = {
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
  projectCurrency,
  cars,
  carStatements,
}: CrewListFormProps) {
  const [sendInvite, setSendInvite] = useState(false);

  const oldCars = cars;

  const [carData, setCarData] = useState<Car[]>([]);

  const handleCarCollectionChange = (cars: Car[]) => {
    setCarData(cars);
    console.log('Updated car collection in parent:', cars);
  };

  return (
    <Form
      onSubmit={(data) => {
        onSubmit(data, sendInvite, carData, oldCars ? oldCars : []);
        setSendInvite(false);
      }}
      defaultValues={formInitialValues}
      resolver={zodResolver(crewListFormSchema)}
      noValidate
    >
      <Stack justify="center" spacing="5">
        {errorMessage && <ErrorBanner title={errorMessage} />}

        <FormSection
          title="Personal Information"
          description="Fill in or verify the personal details."
          fontSize="1.7rem"
        >
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <InputField name="name" label="Name" isRequired />
            <InputField name="surname" label="Surname" isRequired />
            <InputField name="email" label="Email" isRequired />
            <InputField name="phone_number" label="Phone number" isRequired />
          </SimpleGrid>
        </FormSection>

        <FormSection
          title="Project Information"
          description="Ensure that the project and department information is accurate."
          fontSize="1.7rem"
        >
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
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
        </FormSection>

        <FormSection
          title="Rates & Compensation"
          description="Provide or confirm the standard rates and overtime compensations."
          fontSize="1.7rem"
        >
          <Divider
            orientation="vertical"
            display={{ base: 'none', lg: 'block' }}
          />
          <Divider
            orientation="horizontal"
            display={{ base: 'block', lg: 'none' }}
          />

          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
            <InputField
              name="standard_rate"
              label={`Standard rate (${projectCurrency})`}
              isRequired
            />
            <InputField
              name="compensation_rate"
              label={`Compensation rate (${projectCurrency})`}
              isRequired
              type="number"
            />
            <InputField
              name="overtime_hour1"
              label={`1. Overtime hour (${projectCurrency})`}
              isRequired
              type="number"
            />
            <InputField
              name="overtime_hour2"
              label={`2. Overtime hour (${projectCurrency})`}
              isRequired
              type="number"
            />
            <InputField
              name="overtime_hour3"
              label={`3. Overtime hour (${projectCurrency})`}
              isRequired
              type="number"
            />
            <InputField
              name="overtime_hour4"
              label={`4. Overtime hour (${projectCurrency})`}
              isRequired
              type="number"
            />
          </SimpleGrid>
        </FormSection>

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
              <FormSection
                title="Car Compensation"
                description="Details about car usage and related compensation rates."
                fontSize="1.7rem"
              >
                <Box position="relative" padding="2">
                  <Box p="4">
                    <CarFormWithTable
                      onCarCollectionChange={handleCarCollectionChange}
                      cars={cars}
                      carStatements={carStatements}
                      projectCurrency={projectCurrency}
                    />
                  </Box>
                </Box>
              </FormSection>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <Button
                  type="submit"
                  colorScheme="orange"
                  width={{ base: '100%', md: '20%' }}
                  isLoading={isLoading}
                >
                  Save Changes
                </Button>
              </Box>
            </>
          )}
        </Stack>
      </Stack>
    </Form>
  );
}
