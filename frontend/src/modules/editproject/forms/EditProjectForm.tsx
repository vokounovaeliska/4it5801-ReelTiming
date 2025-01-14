import { useState } from 'react';
import { Box, Button, SimpleGrid } from '@chakra-ui/react';

import { ShootingDay } from '@frontend/gql/graphql';
import { projectFormValues } from '@frontend/zod/schemas';

import LogoUploader from '../atoms/LogoUploader';
import { ProjectData } from '../pages/EditProjectPage';

import { ProjectDetailsForm } from './ProjectDetailsForm';
import { ShootingDaysConfigForm } from './ShootingDaysConfigForm';

type EditProjectFormProps = {
  projectId: string | undefined;
  project: ProjectData;
  onSubmit: (
    data: projectFormValues,
    alreadyStoredShootingDays: ShootingDay[],
    shootingDays: ShootingDay[],
  ) => void;
  shootingDays: ShootingDay[];
};

export function EditProjectForm({
  projectId: _projectId,
  project,
  onSubmit,
  shootingDays: loadedShootingDays,
}: EditProjectFormProps) {
  const initialValues: projectFormValues = {
    name: project?.name,
    description: project?.description,
    productionCompany: project?.production_company,
    startDate: project?.start_date ? new Date(project?.start_date) : new Date(),
    endDate: project?.end_date ? new Date(project?.end_date) : null,
    currency: project?.currency!,
    logo: project?.logo ?? undefined,
    isActive: project?.is_active,
  };

  const [formData, setFormData] = useState(initialValues);

  const handleLogoChange = (newLogo: string | null) => {
    setFormData((prev) => ({ ...prev, logo: newLogo }));
  };

  const handleInputChange = (name: keyof projectFormValues, value: unknown) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    onSubmit(formData, loadedShootingDays, updatedShootingDays);
  };

  const [updatedShootingDays, setShootingDaysCollection] = useState<
    ShootingDay[]
  >(loadedShootingDays || []);

  const handleShootingDaysChange = (days: ShootingDay[]) => {
    setShootingDaysCollection(days);
    console.log('Updated shooting days collection in parent:', days);
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
        columns={{ base: 1, md: 2 }}
        spacing={4}
        justifyContent="space-between"
        pb={4}
      >
        <ProjectDetailsForm
          formData={formData}
          onInputChange={handleInputChange}
        />
        <ShootingDaysConfigForm
          shootingDays={updatedShootingDays}
          handleShootingDaysChange={handleShootingDaysChange}
          projectData={project}
        />
        <LogoUploader
          initialLogo={
            formData.logo ? `data:image/png;base64,${formData.logo}` : ''
          }
          onLogoChange={handleLogoChange}
        />
      </SimpleGrid>

      <Button
        colorScheme="orange"
        width="100%"
        size="lg"
        onClick={handleSaveChanges}
      >
        Save Changes
      </Button>
    </Box>
  );
}
