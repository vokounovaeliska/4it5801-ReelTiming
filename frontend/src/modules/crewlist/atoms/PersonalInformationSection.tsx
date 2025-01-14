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
      <InputField name="name" label="Name" isRequired placeholder="John" />
      <InputField name="surname" label="Surname" isRequired placeholder="Doe" />
      <InputField name="email" label="Email" isRequired placeholder="@" />
      <InputField
        name="phone_number"
        label="Phone number"
        isRequired
        placeholder="+420"
      />
    </SimpleGrid>
  </FormSection>
);
