import React from 'react';
import { Divider, SimpleGrid } from '@chakra-ui/react';

import { InputField } from '@frontend/shared/forms';
import { FormSection } from '@frontend/shared/forms/molecules/FormSection';

interface RatesAndCompensationSectionProps {
  projectCurrency: string;
}

export const RatesAndCompensationSection: React.FC<
  RatesAndCompensationSectionProps
> = ({ projectCurrency }) => (
  <FormSection
    title="Rates & Compensation"
    description="Provide or confirm the standard rates and overtime compensations."
    fontSize="1.7rem"
  >
    <Divider orientation="vertical" display={{ base: 'none', lg: 'block' }} />
    <Divider orientation="horizontal" display={{ base: 'block', lg: 'none' }} />

    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
      <InputField
        name="standard_rate"
        label={`Standard rate (${projectCurrency})`}
        isRequired
      />
      <InputField
        name="compensation_rate"
        label={`Compensation rate (${projectCurrency})`}
        isRequired
        type="number"
      />
      <InputField
        name="overtime_hour1"
        label={`1. Overtime hour (${projectCurrency})`}
        isRequired
        type="number"
      />
      <InputField
        name="overtime_hour2"
        label={`2. Overtime hour (${projectCurrency})`}
        isRequired
        type="number"
      />
      <InputField
        name="overtime_hour3"
        label={`3. Overtime hour (${projectCurrency})`}
        isRequired
        type="number"
      />
      <InputField
        name="overtime_hour4"
        label={`4. Overtime hour (${projectCurrency})`}
        isRequired
        type="number"
      />
    </SimpleGrid>
  </FormSection>
);
