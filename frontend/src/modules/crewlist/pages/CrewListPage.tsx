import { Box, Button, Center, Spinner, Text } from '@chakra-ui/react';

import { EditDepartmentsModal } from '@frontend/modules/departments/modals/EditDepartmentsModal';
import {
  useAllCarsOnProjectByProjectUserId,
  useCarStatementsByProjectId,
} from '@frontend/modules/timesheets/pages/queryHooks';
import { Heading } from '@frontend/shared/design-system';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import ProjectNavbar from '@frontend/shared/navigation/components/navbar/ProjectNavbar';

import { AddCrewMemberButton } from '../atoms/AddCrewMemberButton';
import CrewListModal from '../atoms/CrewListModal';
import { ProjectUser } from '../interfaces/interfaces';
import CrewListTable from '../table/CrewListTable';

import CrewAlertDialog from './CrewAlertDialog';
import { useCrewListPageUtils } from './CrewListPageLogic';

export function CrewListPage() {
  const {
    auth,
    isSubmitting,
    isModalOpen,
    isAlertOpen,
    setIsAlertOpen,
    userIdToRemove,
    selectedCrewMember,
    projectId,
    crewListLoading,
    crewListError,
    crewList,
    handleModalClose,
    handleAddMemberClick,
    handleAddNewCrewMember,
    handleEditMemberClick,
    handleUpdateCrewMember,
    handleRemoveButtonClick,
    handleRemoveUser,
    sendInvitation,
    isEditDepartmentsModalOpen,
    setIsEditDepartmentsModalOpen,
    refetchCrew,
  } = useCrewListPageUtils();

  const isDataAvailable = !!crewList && Object.keys(crewList).length > 0;
  const {
    allCarsOnProjectData,
    refetch: refetchAllCarsOnProjectData,
    allCarsOnProjectLoading,
  } = useAllCarsOnProjectByProjectUserId(projectId ?? '');

  const { projectCarStatements } = useCarStatementsByProjectId(projectId ?? '');

  if ((!isDataAvailable && crewListLoading) || allCarsOnProjectLoading) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading project details...</Text>
      </Center>
    );
  }

  if (crewListError || !auth.user || !crewList?.project) {
    return (
      <Center minHeight="100vh">
        <Text color="red.500">
          Error loading project details: {crewListError?.message}
        </Text>
      </Center>
    );
  }

  const groupedByDepartment = crewList?.projectUsers.reduce(
    (acc: Record<string, ProjectUser[]>, user: ProjectUser) => {
      if (
        crewList.userRoleInProject === 'ADMIN' ||
        (user.user && user.user.id === auth.user?.id)
      ) {
        const departmentName = user.department?.name || 'No Department';
        if (!acc[departmentName]) {
          acc[departmentName] = [];
        }
        acc[departmentName].push(user);
      }
      return acc;
    },
    {} as Record<string, ProjectUser[]>,
  );

  const sortedDepartments = Object.keys(groupedByDepartment);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <ProjectNavbar
        projectId={projectId!}
        userRole={crewList?.userRoleInProject}
      />
      <Box flex="1" p={0} width="100%">
        <Heading mb={4} mt={2} textAlign="center">
          Crew List for Project {crewList?.project?.name}
        </Heading>
        {crewList?.userRoleInProject === 'ADMIN' && (
          <Box
            display={{ base: 'grid', md: 'flex' }}
            justifyContent={{ base: 'center', md: 'space-between' }}
            textAlign="center"
            alignItems="flex-end"
            mb={4}
            px={10}
          >
            <AddCrewMemberButton
              handleAddMemberClick={handleAddMemberClick}
              isShown={crewList.project?.is_active}
            />
            <Button
              onClick={() => setIsEditDepartmentsModalOpen(true)}
              colorScheme="orange"
            >
              Edit Departments
            </Button>
            <EditDepartmentsModal
              isOpen={isEditDepartmentsModalOpen}
              onClose={() => {
                setIsEditDepartmentsModalOpen(false);
                refetchCrew();
              }}
              projectId={projectId}
              userRole={crewList.userRoleInProject}
              projectName={crewList.project?.name}
            />
          </Box>
        )}
        <CrewListTable
          sortedDepartments={sortedDepartments}
          groupedByDepartment={groupedByDepartment!}
          handleEditMemberClick={handleEditMemberClick}
          handleRemoveButtonClick={handleRemoveButtonClick}
          sendInvitation={sendInvitation}
          userRoleInProject={crewList?.userRoleInProject!}
          project={crewList?.project!}
        ></CrewListTable>
      </Box>
      <Footer />
      <CrewListModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        isSubmitting={isSubmitting}
        allCarsOnProjectLoading={allCarsOnProjectLoading}
        selectedCrewMember={selectedCrewMember}
        projectId={projectId!}
        crewList={{
          ...crewList,
          userRoleInProject: crewList?.userRoleInProject ?? '',
          project: crewList?.project ?? { currency: '' },
        }}
        allCarsOnProjectData={allCarsOnProjectData!}
        projectCarStatements={projectCarStatements!}
        handleUpdateCrewMember={handleUpdateCrewMember}
        handleAddNewCrewMember={handleAddNewCrewMember}
        refetchAllCarsOnProjectData={refetchAllCarsOnProjectData}
      />
      <CrewAlertDialog
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={() => {
          if (userIdToRemove) {
            handleRemoveUser(userIdToRemove);
          }
          setIsAlertOpen(false);
        }}
      />
    </Box>
  );
}
