import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

import RequiredInfo from '@frontend/modules/auth/organisms/RequiredInfo';
import {
  DateInputField,
  Form,
  InputField,
  TextAreaField,
} from '@frontend/shared/forms';
import { CurrencySelectField } from '@frontend/shared/forms/molecules/fields/CurrencySelectField';
import {
  projectFormSchema,
  projectFormValues,
  zodResolver,
} from '@frontend/zod/schemas';

type ProjectDetailsConfigFormProps = {
  initialValues: projectFormValues;
  onSubmit: (data: projectFormValues) => void;
};

export const ProjectDetailsConfigForm: React.FC<
  ProjectDetailsConfigFormProps
> = ({ initialValues, onSubmit }) => (
  <Box flex="1" p={6}>
    <Text fontSize="lg" fontWeight="bold" mb={4} textAlign="center">
      Project Details
    </Text>

    <Form
      onSubmit={onSubmit}
      resolver={zodResolver(projectFormSchema)}
      defaultValues={initialValues}
      noValidate
    >
      <Box mb={6}>
        <InputField
          name="name"
          label="Project Name"
          isRequired
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
          mb={2}
          width="100%"
        />
      </Box>

      <Box mb={6}>
        <TextAreaField
          name="description"
          label="Project Description"
          isRequired
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
          mb={2}
          width="100%"
        />
      </Box>

      <Flex gap={6} mb={8}>
        <InputField
          name="productionCompany"
          label="Production Company"
          autoFocus
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
          isRequired
          mb={2}
        />
        <CurrencySelectField
          id="currency"
          name="currency"
          label="Project Currency"
          isRequired
        />
      </Flex>

      <Text fontSize="md" fontWeight="semibold" mt={6} mb={2}>
        Project Dates
      </Text>
      <Flex gap={4} wrap="wrap">
        <DateInputField name="startDate" label="Start Date" isRequired />
        <DateInputField
          name="endDate"
          label="End Date"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <Box textAlign="left">
          <RequiredInfo />
        </Box>
      </Flex>
    </Form>
  </Box>
);
