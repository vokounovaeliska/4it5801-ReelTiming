import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';

import { AuthUser } from '@frontend/modules/auth/auth-core';
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

export type AcceptInvitationFormProps = {
  errorMessage?: string;
  onCarCollectionChange: (cars: Car[]) => void;
  onSubmit: (data: crewListFormValues, cars: Car[]) => void;
  isLoading: boolean;
  projectUserData: ProjectUserData;
  departments: { id: string; name: string }[];
  authUser: AuthUser;
  cars: Car[];
  carStatements: CarStatement[];
};

export type ProjectUserData = {
  id: string;
  project: {
    id: string;
    name: string;
    description: string;
    currency: string;
  };
  department: { id: string; name: string };
  position: string;
  phone_number: string;
  email: string;
  role: 'ADMIN' | 'CREW';
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

export function AcceptInvitationForm({
  errorMessage,
  onCarCollectionChange,
  onSubmit,
  isLoading,
  departments,
  projectUserData,
  cars,
  carStatements,
}: AcceptInvitationFormProps) {
  const initialValues: crewListFormValues = {
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
        onSubmit={(data) => {
          onSubmit(data, cars);
        }}
        defaultValues={initialValues}
        resolver={zodResolver(crewListFormSchema)}
        noValidate
      >
        <Stack spacing={5}>
          <PersonalInformationSection />
          <ProjectInformationSection
            userRole={projectUserData?.role || 'CREW'}
            departments={departments}
          />
          <RatesAndCompensationSection
            projectCurrency={projectUserData.project.currency}
          />
          <CarCompensationSection
            cars={[]}
            carStatements={carStatements}
            onCarCollectionChange={onCarCollectionChange}
            projectCurrency={projectUserData.project.currency}
          />
          <Stack align="flex-end">
            <Button
              type="submit"
              colorScheme="orange"
              isLoading={isLoading}
              width={{ base: '100%', md: '50%' }}
              maxWidth="200px"
              size="lg"
            >
              Join the Project
            </Button>
          </Stack>
        </Stack>
      </Form>
    </>
  );
}
