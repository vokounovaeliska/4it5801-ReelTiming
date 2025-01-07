import React from 'react';
import { Box, Divider, SimpleGrid, Tooltip } from '@chakra-ui/react';

import { InputField } from '@frontend/shared/forms';
import { FormSection } from '@frontend/shared/forms/molecules/FormSection';

interface RatesAndCompensationSectionProps {
  projectCurrency?: string;
}

export const RatesAndCompensationSection: React.FC<
  RatesAndCompensationSectionProps
> = ({ projectCurrency }) => (
  <FormSection
    title="Rates & Compensation"
    description="Provide or confirm the standard rates and overtime compensations."
    fontSize="1.6rem"
  >
    <Divider orientation="vertical" display={{ base: 'none', lg: 'block' }} />
    <Divider orientation="horizontal" display={{ base: 'block', lg: 'none' }} />

    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
      <Tooltip
        label="Enter the standard day rate for the project."
        bg={'#2D3748'}
        fontSize="sm"
        placement="top"
        hasArrow
      >
        <Box>
          <InputField
            name="standard_rate"
            label={`Standard rate (${projectCurrency})`}
            isRequired
          />
        </Box>
      </Tooltip>

      <Tooltip
        label="Rate for the first overtime hour."
        bg={'#2D3748'}
        fontSize="sm"
        placement="top"
        hasArrow
      >
        <Box>
          <InputField
            name="overtime_hour1"
            label={`1. Overtime hour (${projectCurrency})`}
            isRequired
            type="number"
          />
        </Box>
      </Tooltip>

      <Tooltip
        label="Rate for the second overtime hour."
        bg={'#2D3748'}
        fontSize="sm"
        placement="top"
        hasArrow
      >
        <Box>
          <InputField
            name="overtime_hour2"
            label={`2. Overtime hour (${projectCurrency})`}
            isRequired
            type="number"
          />
        </Box>
      </Tooltip>

      <Tooltip
        label="Rate for the third overtime hour."
        bg={'#2D3748'}
        fontSize="sm"
        placement="top"
        hasArrow
      >
        <Box>
          <InputField
            name="overtime_hour3"
            label={`3. Overtime hour (${projectCurrency})`}
            isRequired
            type="number"
          />
        </Box>
      </Tooltip>

      <Tooltip
        label="Rate for the fourth overtime hour."
        bg={'#2D3748'}
        fontSize="sm"
        placement="top"
        hasArrow
      >
        <Box>
          <InputField
            name="overtime_hour4"
            label={`4. Overtime hour (${projectCurrency})`}
            isRequired
            type="number"
          />
        </Box>
      </Tooltip>

      <Tooltip
        label="Compensation rate for special project tasks."
        bg={'#2D3748'}
        fontSize="sm"
        placement="top"
        hasArrow
      >
        <Box>
          <InputField
            name="compensation_rate"
            label={`Compensation rate (${projectCurrency})`}
            isRequired
            type="number"
          />
        </Box>
      </Tooltip>
    </SimpleGrid>
  </FormSection>
);
