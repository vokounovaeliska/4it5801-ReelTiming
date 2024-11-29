import { useMutation, useQuery } from '@apollo/client';
import { Center, Spinner, Text, useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { EDIT_PROJECT } from '@frontend/gql/mutations/EditProject';
import { useAuth } from '@frontend/modules/auth';
import { FormValues } from '@frontend/modules/myprojects/organisms/CreateProjectForm';
import { route } from '@frontend/route';

// import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage';
import { GET_PROJECT_DETAILS } from '../../../gql/queries/GetProjectDetails';
import { GET_USER_ROLE_IN_PROJECT } from '../../../gql/queries/GetUserRoleInProject';
import { EditProjectTemplate } from '../templates/EditProjectTemplate';

export function EditProjectPage() {
  const auth = useAuth();
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { data } = useQuery(GET_PROJECT_DETAILS, {
    variables: { id: projectId },
    fetchPolicy: 'cache-and-network',
  });

  const [editproject] = useMutation(EDIT_PROJECT, {
    onCompleted: () => {
      navigate(`/projects/${projectId}`);
    },
  });
  const toast = useToast();

  const {
    data: roleData,
    loading: roleLoading,
    error: roleError,
  } = useQuery(GET_USER_ROLE_IN_PROJECT, {
    skip: !auth.user,
    variables: { userId: auth.user?.id, projectId },
    fetchPolicy: 'cache-and-network',
  });

  const isDataAvailable = !!roleData && Object.keys(roleData).length > 0;

  if (!isDataAvailable && roleLoading) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading project details...</Text>
      </Center>
    );
  }

  if (roleError || !auth.user) {
    return (
      <Center minHeight="100vh">
        <Text color="red.500">
          Error loading project details: {roleError?.message}
        </Text>
      </Center>
    );
  }

  const userRole = roleData.userRoleInProject;
  const userId = auth.user.id;

  const handleEditProject = async (data: FormValues) => {
    console.log(`Updating project info for project id: #${projectId}`);
    var startDate = data.startDate;
    var endDate = data.endDate ?? null;

    try {
      await editproject({
        variables: {
          projectId: projectId,
          data: {
            description: data.description,
            name: data.name,
            production_company: data.productionCompany,
            start_date: startDate,
            end_date: endDate,
            last_update_user_id: userId,
            currency: data.currency,
          },
        },
      });
      toast({
        title: 'Success',
        description: 'Project updated successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update project. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  if (userRole !== 'ADMIN') {
    navigate(route.myprojects());
    return null;
  }

  const project = data?.project;

  return (
    <EditProjectTemplate
      project={project}
      projectId={String(projectId).trim()}
      onSubmit={handleEditProject}
    />
  );
}

export interface ProjectData {
  name: string;
  description: string;
  production_company: string;
  start_date: Date;
  end_date: Date;
  currency: string;
}
