import React from 'react';
import { Box, Button, SimpleGrid, Text } from '@chakra-ui/react';

import RequiredInfo from '@frontend/modules/auth/organisms/RequiredInfo';
import { FormValues } from '@frontend/modules/myprojects/organisms/CreateProjectForm';
import { createProjectSchema } from '@frontend/modules/myprojects/schema/CreateProjecSchema';
import {
  DateInputField,
  Form,
  InputField,
  TextAreaField,
  zodResolver,
} from '@frontend/shared/forms';
import { CurrencySelectField } from '@frontend/shared/forms/molecules/fields/CurrencySelectField';

import { ProjectData } from '../pages/EditProjectPage';

type EditProjectFormProps = {
  projectId: string | undefined;
  project: ProjectData;
  onSubmit: (data: FormValues) => void;
};

export function EditProjectForm({
  projectId: _projectId,
  project,
  onSubmit,
}: EditProjectFormProps) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const initialValues: FormValues = {
    name: project.name,
    description: project.description,
    productionCompany: project.production_company,
    startDate: new Date(project?.start_date),
    endDate: new Date(project?.end_date),
    currency: project.currency,
  };

  return (
    <Box
      onSubmit={handleSubmit}
      mb={6}
      width="100%"
      maxWidth="600px"
      mx="auto"
      p={4}
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      boxShadow="sm"
    >
      <Text fontSize="lg" fontWeight="bold" mb={4} textAlign="center">
        Project Details
      </Text>

      <Form
        onSubmit={onSubmit}
        resolver={zodResolver(createProjectSchema)}
        defaultValues={initialValues}
        noValidate
      >
        <Box mb={4}>
          <InputField
            name="name"
            label="Project Name"
            isRequired
            autoComplete="on"
            autoCorrect="off"
            autoCapitalize="off"
            mb={2}
            width="100%"
          />
        </Box>

        <Box mb={4}>
          <TextAreaField
            name="description"
            label="Project Description"
            isRequired
            autoComplete="on"
            autoCorrect="off"
            autoCapitalize="off"
            mb={2}
            width="100%"
          />
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <InputField
            name="productionCompany"
            label="Production company"
            autoFocus
            autoComplete="on"
            autoCorrect="off"
            autoCapitalize="off"
            isRequired
            mb={2}
          />
          <CurrencySelectField
            id="currency"
            name="currency"
            label="Project currency"
            isRequired
          />
        </SimpleGrid>

        <Text fontSize="md" fontWeight="semibold" mt={6} mb={2}>
          Project Dates
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
          <DateInputField name="startDate" label="Start Date" isRequired />
          <DateInputField
            name="endDate"
            label="End Date"
            autoComplete="on"
            autoCorrect="off"
            autoCapitalize="off"
          />
          <Box textAlign="left">
            <RequiredInfo />
          </Box>
        </SimpleGrid>

        <Button
          type="submit"
          colorScheme="orange"
          width="100%"
          mt={4}
          size="lg"
        >
          Save Changes
        </Button>
      </Form>
    </Box>
  );
}
