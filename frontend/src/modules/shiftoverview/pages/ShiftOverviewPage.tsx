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
import { ShiftOverviewTemplate } from '../templates/ShiftOverviewTemplate';

export function ShiftOverviewPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const [userRole, setUserRole] = useState<string | null>(null);
  const { roleData, roleLoading, roleError } = useUserRoleInProject(
    auth.user?.id,
    projectId,
  );

  const { projectData, projectLoading, projectError } = useProjectDetails(
    projectId ?? '',
  );

  useEffect(() => {
    if (roleData) {
      setUserRole(roleData.userRoleInProject);
    }
  }, [roleData]);

  if (roleLoading || !auth.user || projectLoading) {
    return <LoadingSpinner title="shift overview" />;
  }

  if (
    roleError ||
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
      <ShiftOverviewTemplate projectData={projectData?.project} />
      <Footer />
    </Box>
  );
}
