import { useQuery } from '@apollo/client';
import { Box, Center, Spinner, Text } from '@chakra-ui/react';

import { Heading } from '@frontend/shared/design-system';
import ProjectNavbar from '@frontend/shared/navigation/components/navbar/ProjectNavbar';
import { EMPTY_QUERY } from '@frontend/graphql/queries/EmptyQuery';
import { GET_DEPARTMENTS } from '@frontend/graphql/queries/GetDepartments';
import { EditDepartmentForm } from '@frontend/modules/crewlist/forms/EditDepartmentForm';
import { useAuth } from '@frontend/modules/auth';
import { useProjectDetails, useUserRoleInProject } from '@frontend/modules/timesheets/pages/queryHooks';
import { route } from '@frontend/route';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { id } from 'date-fns/locale';

export function EditDepartmentsPage() {
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

   const {
      data: departmentsData,
      loading: departmentsLoading,
      error: departmentsError,
   } = useQuery(GET_DEPARTMENTS, {
      variables: { projectId: projectId ?? '' },
   });

   const [departments, setDepartments] = useState(departmentsData?.departments);


   useEffect(() => {
      if (roleData) {
         setUserRole(roleData.userRoleInProject);
      }
   }, [roleData]);

   if (roleLoading || !auth.user || projectLoading) {
      return (
         <Center minHeight="100vh">
            <Spinner size="xl" color="orange.500" />
            <Text ml={4}>Loading daily reports...</Text>
         </Center>
      );
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
         <ProjectNavbar
            projectId={projectId!}
            userRole={roleData.userRoleInProject}
         />
         <Box flex="1" p={0} width="100%">
            <Heading mb={4} mt={2} textAlign="center">
               Edit departments for Project {projectData?.project?.name}
            </Heading>
         </Box>
         {departmentsData?.departments.map((department) =>
            <EditDepartmentForm
               department={department}
               projectId={projectId!}
               departmentId={department.id}
               onSave={(updatedDepartment) => {
                  setDepartments((prev) =>
                     prev.map((d) => (d.id === updatedDepartment.id ? updatedDepartment : d)),
                  );
               }}
            />
         )}
      </Box >
   );
}
