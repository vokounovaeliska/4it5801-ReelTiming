import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';

import { InputField } from '@frontend/shared/forms';
import { FormSection } from '@frontend/shared/forms/molecules/FormSection';

export const PersonalInformationSection: React.FC = () => (
  <FormSection
    title="Personal Information"
    description="Fill in or verify the personal details."
    fontSize="1.7rem"
  >
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
      <InputField name="name" label="Name" isRequired />
      <InputField name="surname" label="Surname" isRequired />
      <InputField name="email" label="Email" isRequired />
      <InputField name="phone_number" label="Phone number" isRequired />
    </SimpleGrid>
  </FormSection>
);
