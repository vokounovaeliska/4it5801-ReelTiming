import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Center, Spinner, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { Department } from '@frontend/gql/graphql';
import { UPDATE_DEPARTMENT_ORDER } from '@frontend/graphql/mutations/UpdateDepartmentOrder';
import { GET_DEPARTMENTS } from '@frontend/graphql/queries/GetDepartments';
import { useAuth } from '@frontend/modules/auth';
import { DepartmentProps } from '@frontend/modules/crewlist/interfaces/interfaces';
import { route } from '@frontend/route';
import { useUserRoleInProject } from '@frontend/shared/design-system/hooks/queryHooks';
import CustomModal from '@frontend/shared/forms/molecules/CustomModal';

import { AddDepartmentButton } from '../atoms/AddDepartmentButton';
import { DepartmentTable } from '../atoms/DepartmentTable';
import { CreateDepartmentForm } from '../forms/CreateDepartmentForm';

interface EditDepartmentsTemplateProps {
  projectId?: string;
  userRole: string | null | undefined;
}

export function EditDepartmentsTemplate({
  projectId,
  userRole,
}: EditDepartmentsTemplateProps) {
  const auth = useAuth();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updateDepartment] = useMutation(UPDATE_DEPARTMENT_ORDER);

  const { roleData, roleLoading, roleError } = useUserRoleInProject(
    auth.user?.id ?? '',
    projectId ?? '',
  );

  const {
    data: departmentsData,
    loading: departmentsLoading,
    error: departmentsError,
  } = useQuery(GET_DEPARTMENTS, {
    variables: { projectId: projectId ?? '' },
    fetchPolicy: 'cache-and-network',
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

      setDepartments(updatedDepartments);
      console.log('Local update');
    },
    [departments],
  );

  if (roleLoading || !auth.user || departmentsLoading) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading departments...</Text>
      </Center>
    );
  }

  if (roleError || departmentsError || !auth.user) {
    return (
      <Center minHeight="100vh">
        <Text color="red.500">
          Error loading project details:{' '}
          {roleError?.message ?? departmentsError?.message}
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
        fetchPolicy: 'network-only',
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
    console.log(newDepartment);
    setDepartments((prev) => [...prev, newDepartment]);
    setIsModalOpen(false);
  };

  if (roleLoading || departmentsLoading) {
    return (
      <Center>
        <Spinner />
        <Text ml={4}>Loading departments...</Text>
      </Center>
    );
  }

  if (roleError || departmentsError || !projectId) {
    return (
      <Center>
        <Text color="red.500">
          Error loading departments:{' '}
          {roleError ?? departmentsError ?? 'ProjectID not provided.'}
        </Text>
      </Center>
    );
  }

  return (
    <Box>
      {userRole === 'ADMIN' && (
        <Box mb={4}>
          <AddDepartmentButton
            handleAddDepartmentClick={() => setIsModalOpen(true)}
          />
        </Box>
      )}
      <DepartmentTable
        departments={departments}
        projectId={projectId}
        handleMoveDepartment={moveDepartment}
        handleDragEnd={handleDragEnd}
      />
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={'Add new department'}
        size="md"
      >
        <CreateDepartmentForm
          projectId={projectId ?? ''}
          onSave={handleAddDepartment}
          onCancel={handleModalClose}
        />
      </CustomModal>

      {isModalOpen && (
        <CreateDepartmentForm
          projectId={projectId}
          onSave={handleAddDepartment}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </Box>
  );
}
