import React from 'react';
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  SimpleGrid,
  Tooltip,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

import { InputField } from '@frontend/shared/forms';
import { FormSection } from '@frontend/shared/forms/molecules/FormSection';

interface ProjectInformationSectionProps {
  userRole: string;
  departments: { id: string; name: string }[];
}

export const ProjectInformationSection: React.FC<
  ProjectInformationSectionProps
> = ({ userRole, departments }) => (
  <FormSection
    title="Project Information"
    description="Ensure that the project and department information is accurate."
    fontSize="1.7rem"
  >
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
      <Tooltip
        label="Department to which you belong."
        bg={'#2D3748'}
        fontSize="sm"
        placement="top"
        hasArrow
      >
        <Box>
          <Controller
            name="department"
            render={({ field, fieldState }) => (
              <FormControl
                isRequired={userRole === 'ADMIN'}
                isInvalid={!!fieldState.error}
              >
                <FormLabel>Department</FormLabel>
                <Select
                  {...field}
                  placeholder="Select Department"
                  borderColor="gray.400"
                  borderWidth={1}
                  isDisabled={userRole !== 'ADMIN'}
                >
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
              </FormControl>
            )}
          />
        </Box>
      </Tooltip>

      <Tooltip
        label="Your position in the project."
        bg={'#2D3748'}
        fontSize="sm"
        placement="top"
        hasArrow
      >
        <Box>
          <InputField
            name="position"
            label="Position"
            isRequired
            isDisabled={userRole !== 'ADMIN'}
          />
        </Box>
      </Tooltip>

      <Tooltip
        label="Your role in the project (CREW or ADMIN)."
        bg={'#2D3748'}
        fontSize="sm"
        placement="top"
        hasArrow
      >
        <Box>
          <Controller
            name="role"
            render={({ field }) => (
              <FormControl isRequired isDisabled={userRole !== 'ADMIN'}>
                <FormLabel>Role</FormLabel>
                <Select {...field} borderColor={'gray.400'} borderWidth={1}>
                  <option value="CREW">CREW</option>
                  <option value="ADMIN">ADMIN</option>
                </Select>
              </FormControl>
            )}
          />
        </Box>
      </Tooltip>
    </SimpleGrid>
  </FormSection>
);
