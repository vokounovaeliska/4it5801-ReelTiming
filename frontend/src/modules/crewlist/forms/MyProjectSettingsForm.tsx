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
import { Project } from '../interfaces/interfaces';

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
  userRole: string;
  project?: Project | null;
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
  project,
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
      <Stack justify="center" spacing="5" p={{ base: '5', md: '50' }}>
        {errorMessage && <ErrorBanner title={errorMessage} />}

        <PersonalInformationSection />

        <ProjectInformationSection
          userRole={userRole}
          departments={departments}
        />

        <RatesAndCompensationSection
          projectCurrency={project?.currency ?? 'CZK'}
        />

        <CarCompensationSection
          cars={carData}
          onCarCollectionChange={handleCarCollectionChange}
          projectCurrency={project?.currency ?? 'CZK'}
          carStatements={carStatements}
        />
        <Button
          type="submit"
          colorScheme="orange"
          width={{ base: '100%', md: 'md' }}
          placeSelf={{ md: 'end' }}
          isLoading={isLoading}
          isDisabled={!project?.is_active}
        >
          Save Changes
        </Button>
      </Stack>
    </Form>
  );
}
