import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Heading,
  IconButton,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';

import CustomModal from '@frontend/shared/forms/molecules/CustomModal';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import ProjectNavbar from '@frontend/shared/navigation/components/navbar/ProjectNavbar';

import { CrewListForm } from '../forms/CrewListForm';
import { ProjectUser } from '../interfaces/interfaces';

import CrewAlertDialog from './CrewAlertDialog';
import { useCrewListPageUtils } from './CrewListPageLogic';
import CrewListTable from './CrewListTable';

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
  } = useCrewListPageUtils();

  const isDataAvailable = !!crewList && Object.keys(crewList).length > 0;

  if (!isDataAvailable && crewListLoading) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading project details...</Text>
      </Center>
    );
  }

  if (crewListError || !auth.user) {
    return (
      <Center minHeight="100vh">
        <Text color="red.500">
          Error loading project details: {crewListError?.message}
        </Text>
      </Center>
    );
  }

  const groupedByDepartment = crewList.projectUsers.reduce(
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

  const sortedDepartments = Object.keys(groupedByDepartment).sort();

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <ProjectNavbar
        projectId={projectId!}
        userRole={crewList.userRoleInProject}
      />
      <Box flex="1" p={0} width="100%">
        <Heading mb={4} mt={2} textAlign="center">
          Crew List for Project {crewList.project.name}
        </Heading>
        {crewList.userRoleInProject === 'ADMIN' && (
          <Center pb="1">
            <VStack spacing={3}>
              <IconButton
                aria-label="Add project"
                colorScheme="orange"
                bgColor={'orange.500'}
                onClick={handleAddMemberClick}
                size="lg"
                icon={<AddIcon />}
                borderRadius="full"
                boxShadow="md"
                _hover={{
                  bg: 'orange.500',
                  color: 'white',
                  transform: 'scale(1.2)',
                }}
                transition="all 0.3s ease"
              />
              <Box fontSize="sm">Add New Member</Box>
            </VStack>
          </Center>
        )}
        <CrewListTable
          sortedDepartments={sortedDepartments}
          groupedByDepartment={groupedByDepartment}
          handleEditMemberClick={handleEditMemberClick}
          handleRemoveButtonClick={handleRemoveButtonClick}
          sendInvitation={sendInvitation}
          userRoleInProject={crewList.userRoleInProject}
          authUserId={auth.user?.id}
          projectCurrency={crewList.project?.currency}
        ></CrewListTable>
      </Box>
      <Footer />
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={selectedCrewMember ? 'Edit Crew Member' : 'Add Crew Member'}
      >
        <CrewListForm
          projectId={projectId!}
          onSubmit={(data, sendInvite) => {
            if (selectedCrewMember) {
              handleUpdateCrewMember({
                ...data,
                id: selectedCrewMember.id,
                user_id: selectedCrewMember.user_id,
                rate_id: selectedCrewMember.rate_id,
              });
            } else {
              handleAddNewCrewMember(
                { ...data, id: '', user_id: null, rate_id: null },
                sendInvite,
                data.name,
                data.email,
              );
            }
          }}
          isLoading={isSubmitting}
          departments={crewList.departments}
          initialValues={selectedCrewMember || undefined}
          mode={selectedCrewMember ? 'edit' : 'add'}
          userRole={crewList.userRoleInProject}
          projectCurrency={crewList.project?.currency}
        />
      </CustomModal>
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
