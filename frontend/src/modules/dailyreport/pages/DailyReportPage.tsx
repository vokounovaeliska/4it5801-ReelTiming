import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';
import { LoadingSpinner } from '@frontend/shared/design-system/atoms/LoadingSpinner';
import { useUserRoleInProject } from '@frontend/shared/design-system/hooks/queryHooks';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import ProjectNavbar from '@frontend/shared/navigation/components/navbar/ProjectNavbar';

import { useProjectDetails } from '../hooks/queryHooks';
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
    return <LoadingSpinner title="daily reports" />;
  }

  if (
    roleError ||
    !auth.user?.id ||
    !roleData ||
    projectError ||
    !projectData?.project ||
    roleData.userRoleInProject !== 'ADMIN'
  ) {
    navigate(route.myprojects());
    return null;
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <ProjectNavbar projectId={projectId!} userRole={userRole} />
      <DailyReportTemplate projectData={projectData?.project} />
      <Footer />
    </Box>
  );
}
