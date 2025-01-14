import { Center, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { ShootingDay } from '@frontend/gql/graphql';
import { useProjectConfigOperations } from '@frontend/graphql/mutations/editProjects';
import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';
import { LoadingSpinner } from '@frontend/shared/design-system/atoms/LoadingSpinner';

import { EditProjectTemplate } from '../templates/EditProjectTemplate';

export function EditProjectPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const {
    projectData,
    shootingDaysData,
    roleData,
    loading,
    errorMessage,
    handleEditProject,
  } = useProjectConfigOperations(projectId!, auth.user?.id!);

  const project = projectData?.project;

  if (loading || !project) {
    return <LoadingSpinner title="project details" />;
  }

  if (errorMessage || !auth.user) {
    return (
      <Center minHeight="100vh">
        <Text color="red.500">{errorMessage}</Text>
      </Center>
    );
  }

  const shootingDays: ShootingDay[] = shootingDaysData?.shootingDaysByProject!;

  if (roleData?.userRoleInProject !== 'ADMIN') {
    navigate(route.myprojects());
    return null;
  }

  return (
    <EditProjectTemplate
      project={project}
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
  is_active: boolean;
  logo?: string | null;
}
