import { useEffect, useState } from 'react';
import { Box, Center, Spinner, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import ProjectNavbar from '@frontend/shared/navigation/components/navbar/ProjectNavbar';

import { useProjectDetails, useUserRoleInProject } from '../hooks/queryHooks';
import DailyReportTemplate from '../templates/DailyReportTemplate';

export function DailyReportPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const [userRole, setUserRole] = useState<string | null>(null);
  const { roleData, roleLoading, roleError } = useUserRoleInProject(
    auth.user?.id ?? '',
    projectId ?? '',
  );

  const { projectData, projectLoading, projectError } = useProjectDetails(
    projectId ?? '',
  );

  useEffect(() => {
    if (roleData) {
      setUserRole(roleData.userRoleInProject);
    }
  }, [roleData]);

  if (roleLoading || projectLoading) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading daily reports...</Text>
      </Center>
    );
  }

  if (
    roleError ||
    !auth.user?.id ||
    !roleData ||
    projectError ||
    roleData.userRoleInProject !== 'ADMIN'
  ) {
    navigate(route.myprojects());
    return null;
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <ProjectNavbar projectId={projectId!} userRole={userRole} />
      <DailyReportTemplate
        projectId={projectId!}
        projectData={projectData?.project}
      />
      <Footer />
    </Box>
  );
}
