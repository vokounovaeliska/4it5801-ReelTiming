import { type ReactNode } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { addDays } from 'date-fns';

import RequiredInfo from '@frontend/modules/auth/organisms/RequiredInfo';
import { route } from '@frontend/route';
import {
  Box,
  Button,
  ErrorBanner,
  Heading,
  Stack,
} from '@frontend/shared/design-system';
import {
  DateInputField,
  Form,
  InputField,
  TextAreaField,
  zod,
  zodResolver,
} from '@frontend/shared/forms';
import { CurrencySelectField } from '@frontend/shared/forms/molecules/fields/CurrencySelectField';
import { RouterNavLink } from '@frontend/shared/navigation/atoms';

import { createProjectSchema } from '../schema/CreateProjecSchema';

export type FormValues = zod.infer<typeof createProjectSchema>;
const today = new Date();

const initialValues: FormValues = {
  name: '',
  description: '',
  productionCompany: '',
  startDate: today,
  endDate: addDays(today, 3),
  currency: 'CZK',
};

export type CreateProjectFormProps = {
  children?: ReactNode;
  isLoading: boolean;
  errorMessage?: string;
  onSubmit: (data: FormValues) => void;
};

export function CreateProjectForm({
  isLoading,
  errorMessage,
  onSubmit,
  children,
}: CreateProjectFormProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={2}
    >
      <Box
        width={{ base: '100%' }}
        p={{ base: 4, sm: 4, md: 4, lg: 6 }}
        borderRadius="md"
        boxShadow="lg"
        bg="white"
        border="2px"
        borderColor="gray.300"
        overflow="hidden"
      >
        <Heading as="h2" size="xl" textAlign="center" mb={4}>
          Create Project
        </Heading>
        <Form
          onSubmit={onSubmit}
          defaultValues={initialValues}
          resolver={zodResolver(createProjectSchema)}
          noValidate
        >
          <Stack py="0" justify="center">
            {errorMessage && <ErrorBanner title={errorMessage} />}
            <InputField
              name="name"
              label="Name"
              isRequired
              autoFocus
              autoComplete="on"
              autoCorrect="off"
              autoCapitalize="off"
              mb={2}
              width={'100%'}
            />
            <TextAreaField
              name="description"
              label="Description"
              isRequired
              autoFocus
              autoComplete="on"
              autoCorrect="off"
              autoCapitalize="off"
              mb={2}
            />
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <InputField
                name="productionCompany"
                label="Production company"
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
                label="Project currency"
                isRequired
              />
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <DateInputField
                name="startDate"
                label="Start date"
                isRequired
                autoFocus
              />

              <DateInputField
                name="endDate"
                label="End date"
                autoFocus
                autoComplete="on"
                autoCorrect="off"
                autoCapitalize="off"
              />
            </SimpleGrid>
            <Box textAlign="left">
              <RequiredInfo />
            </Box>
          </Stack>

          <SimpleGrid columns={2} spacing={6} pt={8} pb={3}>
            <Button
              as={RouterNavLink}
              to={route.myprojects()}
              size="md"
              type="submit"
              isLoading={isLoading}
              colorScheme="gray"
              bg="gray.400"
              textColor="white"
            >
              Cancel
            </Button>
            <Button
              w={'full'}
              size="md"
              type="submit"
              isLoading={isLoading}
              colorScheme="orange"
              bg="orange.500"
              _hover={{ bgColor: 'orange.600' }}
              textColor={'white'}
            >
              Save
            </Button>
          </SimpleGrid>
          {children}
        </Form>
      </Box>
    </Box>
  );
}
