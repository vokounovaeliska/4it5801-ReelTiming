import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { Box, Button, Heading, Stack, VStack } from '@chakra-ui/react';

import { Department } from '@frontend/gql/graphql';
import { CREATE_DEPARTMENT } from '@frontend/graphql/mutations/CreateDepartment';
import { ErrorBanner } from '@frontend/shared/design-system';
import {
  showErrorToast,
  showSuccessToast,
} from '@frontend/shared/design-system/molecules/toastUtils';
import { Form, InputField, zodResolver } from '@frontend/shared/forms';
import { SwitchField } from '@frontend/shared/forms/molecules/SwitchField';
import {
  createDepartmentFormSchema,
  createDepartmentFormValues,
} from '@frontend/zod/schemas';

interface CreateDepartmentFormProps {
  projectId: string;
  onSave: (department: Department) => void;
  onCancel: () => void;
  errorMessage?: string;
}

export const CreateDepartmentForm = ({
  projectId,
  onSave,
  onCancel,
  errorMessage,
}: CreateDepartmentFormProps) => {
  const [addDepartment, { loading, error }] = useMutation(CREATE_DEPARTMENT);

  const handleSubmit = useCallback(
    async (variables: createDepartmentFormValues) => {
      try {
        const updatedVariables = {
          ...variables,
          orderIndex: 0,
          projectId,
        };

        const { data } = await addDepartment({
          variables: updatedVariables,
        });

        if (data) {
          const newDepartment = {
            id: data.addDepartment.id,
            name: data.addDepartment.name,
            is_visible: data.addDepartment.is_visible,
            order_index: 0,
            project_id: projectId,
          };

          onSave(newDepartment);
          showSuccessToast('Department created successfully.');
        }
      } catch (err) {
        console.error('Failed to create department:', err);
        showErrorToast('Failed to create department.');
      }
    },
    [addDepartment, projectId, onSave],
  );

  return (
    <Box maxW="md" mx="auto" bg="white" p={6} borderRadius="md" boxShadow="md">
      <VStack spacing={6} align="stretch">
        <Heading as="h3" size="lg" textAlign="center" mb={4}>
          Create Department
        </Heading>
        <Form
          onSubmit={handleSubmit}
          resolver={zodResolver(createDepartmentFormSchema)}
          defaultValues={{ name: '', isVisible: true }}
          mode="onChange"
          noValidate
        >
          <Stack spacing={4}>
            {(error || errorMessage) && <ErrorBanner title="Error" />}
            <InputField
              name="name"
              label="Name"
              isRequired
              autoFocus
              placeholder="Enter department name"
              autoComplete="on"
              autoCorrect="off"
              autoCapitalize="off"
              mb={2}
            />
            <SwitchField
              name="isVisible"
              label="Visibility"
              onLabel="Visible"
              offLabel="Hidden"
            />
            <Button
              type="submit"
              colorScheme="orange"
              size="lg"
              isLoading={loading}
            >
              Save
            </Button>
            <Button
              type="button"
              colorScheme="gray"
              size="lg"
              onClick={onCancel}
              isDisabled={loading}
            >
              Cancel
            </Button>
          </Stack>
        </Form>
      </VStack>
    </Box>
  );
};
