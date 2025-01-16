import React, { useState } from 'react';
import { Button, Stack } from '@chakra-ui/react';

import { Car, CarStatement } from '@frontend/modules/timesheets/interfaces';
import { ErrorBanner } from '@frontend/shared/design-system';
import { Form } from '@frontend/shared/forms';
import {
  crewListFormSchema,
  crewListFormValues,
  zodResolver,
} from '@frontend/zod/schemas';

import { CarCompensationSection } from '../atoms/CarCompensationSection';
import { PersonalInformationSection } from '../atoms/PersonalInformationSection';
import { ProjectInformationSection } from '../atoms/ProjectInformationSection';
import { RatesAndCompensationSection } from '../atoms/RatesAndCompensationSection';

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
  userRole: string;
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
  const [carData, setCarData] = useState<Car[]>(cars || []);

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

        <PersonalInformationSection />

        <ProjectInformationSection
          userRole={userRole}
          departments={departments}
        />

        <RatesAndCompensationSection projectCurrency={projectCurrency} />

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
              <CarCompensationSection
                cars={cars}
                onCarCollectionChange={handleCarCollectionChange}
                projectCurrency={projectCurrency}
                carStatements={carStatements}
              />
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
      </Stack>
    </Form>
  );
}
