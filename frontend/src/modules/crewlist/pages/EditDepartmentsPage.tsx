import { useMutation, useQuery } from '@apollo/client';
import { Box, Center, Spinner, Text } from '@chakra-ui/react';


import { Heading } from '@frontend/shared/design-system';
import ProjectNavbar from '@frontend/shared/navigation/components/navbar/ProjectNavbar';
import { GET_DEPARTMENTS } from '@frontend/graphql/queries/GetDepartments';
import { DepartmentTable } from '@frontend/modules/crewlist/table/DepartmentTable';
import { useAuth } from '@frontend/modules/auth';
import { useProjectDetails, useUserRoleInProject } from '@frontend/modules/timesheets/pages/queryHooks';
import { route } from '@frontend/route';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Department } from '@frontend/gql/graphql';
import { UPDATE_DEPARTMENT_ORDER } from '@frontend/graphql/mutations/UpdateDepartmentOrder';
import { DepartmentProps } from '../interfaces/interfaces';
import CustomModal from '@frontend/shared/forms/molecules/CustomModal';
import { CreateDepartmentForm } from '@frontend/modules/crewlist/forms/DepartmentForm';

export function EditDepartmentsPage() {
   const auth = useAuth();
   const navigate = useNavigate();
   const { projectId } = useParams<{ projectId: string }>();

   const [userRole, setUserRole] = useState<string | null>(null);
   const [departments, setDepartments] = useState<Department[]>([]);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const [updateDepartment] = useMutation(UPDATE_DEPARTMENT_ORDER);

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

   useEffect(() => {
      if (roleData && roleData.userRoleInProject !== 'ADMIN') {
         navigate(route.myprojects());
      }
   }, [roleData, navigate]);

   useEffect(() => {
      if (roleData) {
         setUserRole(roleData.userRoleInProject);
      }
   }, [roleData]);

   useEffect(() => {
      if (departmentsData?.departments) {
         setDepartments(
            [...departmentsData.departments].sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
         );
      }
   }, [departmentsData]);


   const moveDepartment = useCallback(
      async (dragIndex: number, hoverIndex: number, isDragging: boolean) => {
         const updatedDepartments = [...departments];
         const [removed] = updatedDepartments.splice(dragIndex, 1);
         updatedDepartments.splice(hoverIndex, 0, removed);

         // Update local state
         setDepartments(updatedDepartments);
         console.log('Local update')
      },
      [departments]
   );

   if (roleLoading || !auth.user || projectLoading || departmentsLoading) {
      return (
         <Center minHeight="100vh">
            <Spinner size="xl" color="orange.500" />
            <Text ml={4}>Loading departments...</Text>
         </Center>
      );
   }

   const handleUpdateDepartmentOrder = async (id: string, data: DepartmentProps) => {
      try {
         await updateDepartment({
            variables: {
               id,
               data
            },
         });
      } catch (err) {
         console.error('Failed to update department:', err);
         throw err;
      }
   };


   const handleDragEnd = async () => {
      console.log('Calling DB')
      try {
         await Promise.all(
            departments.map((department, index) =>
               handleUpdateDepartmentOrder(
                  department.id,
                  {
                     name: department.name,
                     order_index: index,
                     is_visible: department.is_visible ?? false,
                     project_id: projectId ?? "",
                  }
               )
            )
         );
      } catch (err) {
         console.error('Failed to update department order:', err);
      }
   };

   const handleModalClose = () => {
      setIsModalOpen(false);
   };

   const handleAddDepartment = (newDepartment: Department) => {
      setDepartments((prev) => [...prev, newDepartment]);
      setIsModalOpen(false);
   };

   return (
      <Box display="flex" flexDirection="column" minHeight="100vh">
         <ProjectNavbar
            projectId={projectId!}
            userRole={roleData.userRoleInProject}
         />
         <Box mb={4} p={0} width="100%">
            <Heading mb={4} mt={2} textAlign="center">
               Edit departments for Project {projectData?.project?.name}
            </Heading>
         </Box>
         <button onClick={() => setIsModalOpen(true)}>Add Department</button>
         <DepartmentTable
            departments={departments ?? []}
            projectId={projectId ?? ''}
            handleMoveDepartment={moveDepartment}
            handleUpdateDepartmentOrder={handleUpdateDepartmentOrder}
            handleDragEnd={handleDragEnd}
         />
         <CustomModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            title={"Add new department"}
            size="6xl"
         >
            <CreateDepartmentForm
               projectId={projectId ?? ""}
               onSave={handleAddDepartment}
               onCancel={handleModalClose}
            />
         </CustomModal>
      </Box >
   );
}
