import React, { useState } from 'react';
import { Box, Button, SimpleGrid } from '@chakra-ui/react';

import { projectFormValues } from '@frontend/zod/schemas';

import { ProjectData } from '../pages/EditProjectPage';

import { ProjectDetailsForm } from './ProjectDetailsForm';
import { ShootingDaysConfigForm } from './ShootingDaysConfigForm';
import { ShootingDay } from './ShootingDaysInputForm';

type EditProjectFormProps = {
  projectId: string | undefined;
  project: ProjectData;
  onSubmit: (data: projectFormValues, shootingDays: ShootingDay[]) => void;
};

export function EditProjectForm({
  projectId: _projectId,
  project,
  onSubmit,
}: EditProjectFormProps) {
  const initialValues: projectFormValues = {
    name: project.name,
    description: project.description,
    productionCompany: project.production_company,
    startDate: new Date(project?.start_date),
    endDate: new Date(project?.end_date),
    currency: project.currency,
  };

  const [formData, setFormData] = useState(initialValues);
  const [shootingDays] = useState<ShootingDay[]>([]);

  const handleInputChange = (name: keyof projectFormValues, value: unknown) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    onSubmit(formData, shootingDays);
  };

  return (
    <Box
      mb={6}
      width="100%"
      maxWidth="1600px"
      mx="auto"
      p={4}
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      boxShadow="sm"
    >
      <SimpleGrid
        columns={{ base: 1, sm: 2 }}
        spacing={4}
        justifyContent="space-between"
        pb={4}
      >
        <ProjectDetailsForm
          formData={formData}
          onInputChange={handleInputChange}
        />
        <ShootingDaysConfigForm shootingDays={shootingDays} />
      </SimpleGrid>
      <Button
        colorScheme="orange"
        width="100%"
        mt={4}
        size="lg"
        onClick={handleSaveChanges}
      >
        Save Changes
      </Button>
    </Box>
  );
}
