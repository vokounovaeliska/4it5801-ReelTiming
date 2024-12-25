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
  userRole: 'ADMIN' | 'CREW';
  projectCurrency: string;
  cars: Car[] | null;
  carStatements: CarStatement[];
};

export function MyProjectSettingsForm({
  errorMessage,
  onSubmit,
  isLoading,
  departments,
  initialValues,
  userRole,
  projectCurrency,
  cars,
  carStatements,
}: CrewListFormProps) {
  const [sendInvite, setSendInvite] = useState(false);

  const oldCars = cars ?? [];

  const [carData, setCarData] = useState<Car[]>(oldCars);

  const handleCarCollectionChange = (updatedCars: Car[]) => {
    setCarData(updatedCars);
  };

  return (
    <Form
      onSubmit={(data) => {
        onSubmit(data, sendInvite, carData, oldCars);
        setSendInvite(false);
      }}
      defaultValues={initialValues}
      resolver={zodResolver(crewListFormSchema)}
      noValidate
    >
      <Stack justify="center" spacing="5" p="50">
        {errorMessage && <ErrorBanner title={errorMessage} />}

        <PersonalInformationSection />

        <ProjectInformationSection
          userRole={userRole}
          departments={departments}
        />

        <RatesAndCompensationSection projectCurrency={projectCurrency} />

        <CarCompensationSection
          cars={carData}
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
      </Stack>
    </Form>
  );
}
