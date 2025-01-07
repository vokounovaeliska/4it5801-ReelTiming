import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Text,
  Textarea,
} from '@chakra-ui/react';

import RequiredInfo from '@frontend/modules/auth/organisms/RequiredInfo';
import { currencies } from '@frontend/shared/forms/molecules/fields/CurrencySelectField';
import { projectFormValues } from '@frontend/zod/schemas';

import { ProjectData } from '../pages/EditProjectPage';

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
        <Box p={4}>
          <Text fontSize="lg" fontWeight="bold" mb={4} textAlign="center">
            Project Details
          </Text>

          <Box>
            <Box mb={4}>
              <FormControl isRequired>
                <FormLabel>Project Name</FormLabel>
                <Input
                  name="name"
                  autoComplete="on"
                  autoCorrect="off"
                  autoCapitalize="off"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </FormControl>
            </Box>

            <Box mb={4}>
              <FormControl isRequired>
                <FormLabel>Project Description</FormLabel>
                <Textarea
                  name="description"
                  autoComplete="on"
                  autoCorrect="off"
                  autoCapitalize="off"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange('description', e.target.value)
                  }
                />
              </FormControl>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <FormControl isRequired>
                <FormLabel>Production Company</FormLabel>
                <Input
                  name="productionCompany"
                  autoFocus
                  autoComplete="on"
                  autoCorrect="off"
                  autoCapitalize="off"
                  value={formData.productionCompany}
                  onChange={(e) =>
                    handleInputChange('productionCompany', e.target.value)
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Project Currency</FormLabel>
                <Select
                  name="currency"
                  value={formData.currency}
                  onChange={(e) =>
                    handleInputChange('currency', e.target.value)
                  }
                  placeholder="Select Currency"
                >
                  {currencies.map((currency) => (
                    <option key={currency.label} value={currency.value}>
                      {currency.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </SimpleGrid>

            <Text fontSize="md" fontWeight="semibold" mt={6} mb={2}>
              Project Dates
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
              <FormControl isRequired>
                <FormLabel>Start Date</FormLabel>
                <Input
                  name="startDate"
                  type="date"
                  value={
                    formData.startDate
                      ? formData.startDate.toISOString().split('T')[0]
                      : ''
                  }
                  onChange={(e) =>
                    handleInputChange('startDate', new Date(e.target.value))
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>End Date</FormLabel>
                <Input
                  name="endDate"
                  type="date"
                  value={
                    formData.endDate
                      ? formData.endDate.toISOString().split('T')[0]
                      : ''
                  }
                  onChange={(e) =>
                    handleInputChange('endDate', new Date(e.target.value))
                  }
                />
              </FormControl>
              <Box textAlign="left">
                <RequiredInfo />
              </Box>
            </SimpleGrid>
          </Box>
        </Box>
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
