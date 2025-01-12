import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  SimpleGrid,
  Switch,
  Text,
  Textarea,
} from '@chakra-ui/react';

import RequiredInfo from '@frontend/modules/auth/organisms/RequiredInfo';
import { currencies } from '@frontend/shared/forms/molecules/fields/utils/currenciesUtils';
import { projectFormValues } from '@frontend/zod/schemas';

type ProjectDetailsFormProps = {
  formData: projectFormValues;
  onInputChange: (name: keyof projectFormValues, value: unknown) => void;
};

export const ProjectDetailsForm: React.FC<ProjectDetailsFormProps> = ({
  formData,
  onInputChange,
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(formData.isActive);
  }, [formData.isActive]);

  const handleSwitchChange = () => {
    const newValue = !isActive;
    setIsActive(newValue);
    onInputChange('isActive', newValue);
  };

  return (
    <Box p={4}>
      <Text fontSize="lg" fontWeight="bold" mb={4} textAlign="center">
        Project Details
      </Text>
      <Box>
        <Box mb={6}>
          <FormControl isRequired>
            <FormLabel>Project Name</FormLabel>
            <Input
              name="name"
              autoComplete="on"
              autoCorrect="off"
              autoCapitalize="off"
              value={formData.name}
              onChange={(e) => onInputChange('name', e.target.value)}
            />
          </FormControl>
        </Box>

        <Box mb={6}>
          <FormControl isRequired>
            <FormLabel>Project Description</FormLabel>
            <Textarea
              name="description"
              autoComplete="on"
              autoCorrect="off"
              autoCapitalize="off"
              value={formData.description}
              onChange={(e) => onInputChange('description', e.target.value)}
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
                onInputChange('productionCompany', e.target.value)
              }
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Project Currency</FormLabel>
            <Select
              name="currency"
              value={formData.currency}
              onChange={(e) => onInputChange('currency', e.target.value)}
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
                onInputChange('startDate', new Date(e.target.value))
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
                onInputChange('endDate', new Date(e.target.value))
              }
            />
          </FormControl>
        </SimpleGrid>

        <FormControl isRequired>
          <FormLabel>Project Status</FormLabel>
          <HStack align="center">
            <Switch
              size="lg"
              colorScheme="orange"
              isChecked={isActive}
              onChange={handleSwitchChange}
            />
            <Text>{isActive ? 'Active' : 'Inactive'}</Text>
          </HStack>
        </FormControl>

        <Box textAlign="left" mt={4}>
          <RequiredInfo />
        </Box>
      </Box>
    </Box>
  );
};
