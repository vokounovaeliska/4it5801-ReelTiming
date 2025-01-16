import { useEffect } from 'react';
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
  // TODO - userrole deadlocks navbar buttons rending making it look slow, hardcoding ADMIN role,
  // projectId is taken from url - not needed in query, if CREW user somehow comes to shiftoverview they will see
  // navbar as if they were ADMIN - filters on other pages like editproject should redirect them to myprojects anyways
  // but far from ideal

  // const [userRole, setUserRole] = useState<string | null>(null);
  const { roleData, roleLoading, roleError } = useUserRoleInProject(
    auth.user?.id,
    projectId,
  );

  const { projectData, projectLoading, projectError } = useProjectDetails(
    projectId ?? '',
  );

  // useEffect(() => {
  //   if (roleData) {
  //     setUserRole(roleData.userRoleInProject);
  //   }
  // }, [roleData]);

  useEffect(() => {
    if (
      roleError ||
      !roleData ||
      projectError ||
      roleData.userRoleInProject !== 'ADMIN'
    ) {
      navigate(route.myprojects());
    }
  }, [roleError, roleData, projectError, navigate]);

  if (roleLoading || !auth.user || projectLoading) {
    return <LoadingSpinner title="shift overview" />;
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <ProjectNavbar projectId={projectId!} userRole={'ADMIN'} />
      <ShiftOverviewTemplate projectData={projectData?.project} />
      <Footer />
    </Box>
  );
}
