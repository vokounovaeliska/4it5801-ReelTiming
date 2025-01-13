import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { useProjectDetails } from '@frontend/modules/timesheets/pages/queryHooks';
import { route } from '@frontend/route';
import { Heading } from '@frontend/shared/design-system';
import { useUserRoleInProject } from '@frontend/shared/design-system/hooks/queryHooks';
import ProjectNavbar from '@frontend/shared/navigation/components/navbar/ProjectNavbar';

import { EditDepartmentsTemplate } from '../templates/EditDepartmentsTemplate';

export function EditDepartmentsPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const { projectId } = useParams<{ projectId: string }>();

  const { roleData } = useUserRoleInProject(auth.user?.id!, projectId!);
  const { projectData } = useProjectDetails(projectId!);
  useEffect(() => {
    if (roleData && roleData.userRoleInProject !== 'ADMIN') {
      navigate(route.myprojects());
    }
  }, [roleData, navigate]);

  return (
    <>
      <ProjectNavbar
        projectId={projectId}
        userRole={roleData?.userRoleInProject}
      />
      <Heading mb={4} textAlign="center">
        Edit departments for Project {projectData?.project?.name}
      </Heading>
      <EditDepartmentsTemplate
        projectId={projectId}
        userRole={roleData?.userRoleInProject}
      />
    </>
  );
}
