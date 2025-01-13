import React, { useState } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  IconButton,
  Input,
  SimpleGrid,
  Tooltip,
} from '@chakra-ui/react';

import { ShootingDay } from '@frontend/gql/graphql';
import { showSuccessToast } from '@frontend/shared/design-system/molecules/toastUtils';
import { projectFormValues } from '@frontend/zod/schemas';

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
  shootingDays,
}: EditProjectFormProps) {
  const initialValues: projectFormValues = {
    name: project.name,
    description: project.description,
    productionCompany: project.production_company,
    startDate: project?.start_date ? new Date(project.start_date) : new Date(),
    endDate: project?.end_date ? new Date(project.end_date) : null,
    currency: project.currency!,
    logo: project?.logo ?? undefined,
  };

  const [formData, setFormData] = useState(initialValues);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleInputChange = (name: keyof projectFormValues, value: unknown) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width <= 400 && img.height <= 100) {
          setLogoFile(file);
        } else {
          alert('Image dimensions should be 400x100 pixels or smaller.');
        }
      };
    } else {
      alert('Please upload a valid .png or .jpg file');
    }
  };

  const handleRemoveLogo = () => {
    setFormData((prev) => ({ ...prev, logo: null }));
    setLogoFile(null);
    showSuccessToast('Logo successfully removed');
  };

  const handleSaveChanges = async () => {
    if (logoFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1];
        if (base64String) {
          const updatedFormData = { ...formData, logo: base64String };
          onSubmit(updatedFormData, shootingDays, shootingDaysCollection);
        }
      };
      reader.readAsDataURL(logoFile);
    } else {
      onSubmit(formData, shootingDays, shootingDaysCollection);
    }
  };

  const [shootingDaysCollection, setShootingDaysCollection] = useState<
    ShootingDay[]
  >(shootingDays || []);

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
          shootingDays={shootingDaysCollection}
          handleShootingDaysChange={handleShootingDaysChange}
        />
        <Box pl={5}>
          <Input
            alignContent={'center'}
            w={'max-content'}
            type="file"
            accept=".png, .jpeg"
            onChange={handleFileChange}
          />
          <Tooltip
            label="Remove logo"
            aria-label="Remove logo"
            placement="top"
            bg="red.600"
            rounded={'lg'}
          >
            <IconButton
              ml={5}
              aria-label="Remove logo"
              icon={<DeleteIcon />}
              colorScheme="red"
              size="sm"
              w={10}
              h={10}
              onClick={() => handleRemoveLogo()}
            />
          </Tooltip>
        </Box>
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
