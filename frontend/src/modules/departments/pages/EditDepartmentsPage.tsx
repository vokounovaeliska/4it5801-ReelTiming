import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Center, Spinner, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { Department } from '@frontend/gql/graphql';
import { UPDATE_DEPARTMENT_ORDER } from '@frontend/graphql/mutations/UpdateDepartmentOrder';
import { GET_DEPARTMENTS } from '@frontend/graphql/queries/GetDepartments';
import { useAuth } from '@frontend/modules/auth';
import { useProjectDetails } from '@frontend/modules/timesheets/pages/queryHooks';
import { route } from '@frontend/route';
import { Heading } from '@frontend/shared/design-system';
import { useUserRoleInProject } from '@frontend/shared/design-system/hooks/queryHooks';
import CustomModal from '@frontend/shared/forms/molecules/CustomModal';
import ProjectNavbar from '@frontend/shared/navigation/components/navbar/ProjectNavbar';
import { createDepartmentFormValues } from '@frontend/zod/schemas';

import { DepartmentProps } from '../../crewlist/interfaces/interfaces';
import { AddDepartmentButton } from '../atoms/AddDepartmentButton';
import { DepartmentTable } from '../atoms/DepartmentTable';
import { CreateDepartmentForm } from '../forms/DepartmentForm';

export function EditDepartmentsPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const [departments, setDepartments] = useState<Department[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updateDepartment] = useMutation(UPDATE_DEPARTMENT_ORDER);
  const initialValues: createDepartmentFormValues = {
    name: '',
    isVisible: true,
  };

  const [formData, setFormData] = useState(initialValues);
  const handleInputChange = (
    name: keyof createDepartmentFormValues,
    value: unknown,
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { roleData, roleLoading, roleError } = useUserRoleInProject(
    auth.user?.id ?? '',
    projectId ?? '',
  );

  const { projectData, projectLoading, projectError } = useProjectDetails(
    projectId ?? '',
  );

  const {
    data: departmentsData,
    loading: departmentsLoading,
    error: departmentsError,
  } = useQuery(GET_DEPARTMENTS, {
    variables: { projectId: projectId ?? '' },
  });

  useEffect(() => {
    if (roleData && roleData.userRoleInProject !== 'ADMIN') {
      navigate(route.myprojects());
    }
  }, [roleData, navigate]);

  useEffect(() => {
    if (departmentsData?.departments) {
      setDepartments(
        [...departmentsData.departments].sort(
          (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0),
        ),
      );
    }
  }, [departmentsData]);

  const moveDepartment = useCallback(
    async (dragIndex: number, hoverIndex: number) => {
      const updatedDepartments = [...departments];
      const [removed] = updatedDepartments.splice(dragIndex, 1);
      updatedDepartments.splice(hoverIndex, 0, removed);

      // Update local state
      setDepartments(updatedDepartments);
      console.log('Local update');
    },
    [departments],
  );

  if (roleLoading || !auth.user || projectLoading || departmentsLoading) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading departments...</Text>
      </Center>
    );
  }

  if (roleError || projectError || departmentsError || !auth.user) {
    return (
      <Center minHeight="100vh">
        <Text color="red.500">
          Error loading project details:{' '}
          {roleError?.message ??
            projectError?.message ??
            departmentsError?.message}
        </Text>
      </Center>
    );
  }

  const handleUpdateDepartmentOrder = async (
    id: string,
    data: DepartmentProps,
  ) => {
    try {
      await updateDepartment({
        variables: {
          id,
          data,
        },
      });
    } catch (err) {
      console.error('Failed to update department:', err);
      throw err;
    }
  };

  const handleDragEnd = async () => {
    console.log('Calling DB');
    try {
      await Promise.all(
        departments.map((department, index) =>
          handleUpdateDepartmentOrder(department.id, {
            name: department.name,
            order_index: index,
            is_visible: department.is_visible ?? false,
            project_id: projectId ?? '',
          }),
        ),
      );
    } catch (err) {
      console.error('Failed to update department order:', err);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddDepartment = (newDepartment: Department) => {
    setDepartments((prev) => [...prev, newDepartment]);
    setIsModalOpen(false);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <ProjectNavbar
        projectId={projectId!}
        userRole={roleData?.userRoleInProject}
      />
      <Box mb={4} p={0}>
        <Heading mb={4} mt={2} textAlign="center">
          Edit departments for Project {projectData?.project?.name}
        </Heading>
        {roleData?.userRoleInProject &&
          roleData.userRoleInProject === 'ADMIN' && (
            <Box
              display={{ base: 'grid', md: 'flex' }}
              justifyContent={{ base: 'center', md: 'space-between' }}
              textAlign="center"
              alignItems="flex-end"
              mb={4}
              px={10}
            >
              <AddDepartmentButton
                handleAddDepartmentClick={() => setIsModalOpen(true)}
              />
            </Box>
          )}
      </Box>
      <DepartmentTable
        departments={departments ?? []}
        projectId={projectId ?? ''}
        handleMoveDepartment={moveDepartment}
        handleDragEnd={handleDragEnd}
      />
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={'Add new department'}
        size="6xl"
      >
        <CreateDepartmentForm
          projectId={projectId ?? ''}
          onSave={handleAddDepartment}
          onCancel={handleModalClose}
          formData={formData}
          onInputChange={handleInputChange}
        />
      </CustomModal>
    </Box>
  );
}
