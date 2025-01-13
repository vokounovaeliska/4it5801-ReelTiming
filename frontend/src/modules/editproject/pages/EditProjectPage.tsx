import { Center, Spinner, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { ShootingDay } from '@frontend/gql/graphql';
import { useProjectConfigOperations } from '@frontend/graphql/mutations/editProjects';
import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';

import { EditProjectTemplate } from '../templates/EditProjectTemplate';

export function EditProjectPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const {
    projectData,
    shootingDaysData,
    roleData,
    roleLoading,
    roleError,
    handleEditProject,
  } = useProjectConfigOperations(projectId!, auth.user?.id!);

  if (roleLoading) {
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

  const project = projectData?.project!;

  const shootingDays: ShootingDay[] = shootingDaysData?.shootingDaysByProject!;

  if (roleData?.userRoleInProject !== 'ADMIN') {
    navigate(route.myprojects());
    return null;
  }

  return (
    <EditProjectTemplate
      project={project!}
      projectId={String(projectId).trim()}
      onSubmit={handleEditProject}
      shootingDays={shootingDays}
    />
  );
}

export interface ProjectData {
  name: string;
  description: string;
  production_company: string;
  start_date?: string | null;
  end_date?: string | null;
  currency: string;
  logo?: string | null;
}
