import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Heading,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {
  Link as ReactRouterLink,
  useLocation,
  useParams,
} from 'react-router-dom';

import { useCrewMemberMutations } from '@frontend/gql/mutations/addCrewMember';
import { GET_CREWLIST_INFO } from '@frontend/gql/queries/GetCrewListInfo';
import { useAuth } from '@frontend/modules/auth';
import ProjectButtons from '@frontend/modules/myprojects/ProjectButtons';
import { route } from '@frontend/route';
import CustomModal from '@frontend/shared/forms/molecules/CustomModal';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';

import { DELETE_PROJECT_USER } from '../../../gql/queries/DeleteProjectUser';
import { CrewListForm } from '../forms/CrewListForm';

import CrewAlertDialog from './CrewAlertDialog';

export function CrewListPage() {
  const auth = useAuth();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [userIdToRemove, setUserIdToRemove] = useState<string | null>(null);
  const [selectedCrewMember, setSelectedCrewMember] =
    useState<CrewMemberData | null>(null);
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const tableSize = useBreakpointValue({ base: 'xl', md: 'md' });

  const sanitizeCrewMemberData = (data: CrewMemberData): CrewMemberData => ({
    ...data,
    standard_rate: data.standard_rate || 0,
    compensation_rate: data.compensation_rate || 0,
    overtime_hour1: data.overtime_hour1 || 0,
    overtime_hour2: data.overtime_hour2 || 0,
    overtime_hour3: data.overtime_hour3 || 0,
    overtime_hour4: data.overtime_hour4 || 0,
  });

  const {
    data: crewListData,
    loading: crewListLoading,
    error: crewListError,
    refetch: refetchProjectUsers,
  } = useQuery(GET_CREWLIST_INFO, {
    variables: { projectId, userId: auth.user?.id },
  });

  const crewList = crewListData || [];

  // GQL MUTATIONS CALLS
  const { addCrewMember, sendEmailInvitation, editCrewMember } =
    useCrewMemberMutations();
  const [deleteProjectUser] = useMutation(DELETE_PROJECT_USER);

  if (crewListLoading) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading project details...</Text>
      </Center>
    );
  }

  // Error handling
  if (crewListError || !auth.user || !crewListData) {
    return (
      <Center minHeight="100vh">
        <Text color="red.500">
          Error loading project details: {crewListError?.message}
        </Text>
      </Center>
    );
  }
  interface CrewMemberData {
    id: string;
    name: string;
    surname: string;
    department: string;
    position: string;
    phone_number: string;
    email: string;
    standard_rate: number;
    compensation_rate: number;
    overtime_hour1: number;
    overtime_hour2: number;
    overtime_hour3: number;
    overtime_hour4: number;
    role: string;
    user_id: string | null;
    rate_id: string | null;
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCrewMember(null); // clear selected crew member on close
  };

  const handleAddMemberClick = () => {
    setSelectedCrewMember(null); // clear selected crew member for adding new
    setIsModalOpen(true);
  };

  const handleAddNewCrewMember = async (
    data: CrewMemberData,
    sendInvite: boolean,
  ) => {
    setIsSubmitting(true);
    try {
      const { userId } = await addCrewMember(data, projectId!);

      // Step 2: Only send the invitation if sendInvite is true
      if (sendInvite) {
        await sendEmailInvitation(projectId!, userId);
      }

      toast({
        title: 'Success',
        description: `Crew member added${sendInvite ? ' and invitation sent' : ''} successfully.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      handleModalClose();
      refetchProjectUsers();
    } catch (error) {
      console.error('Error adding new crew member:', error);
      toast({
        title: 'Error',
        description: 'Failed to add crew member. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendEmail = async (userId: string) => {
    try {
      await sendEmailInvitation(projectId!, userId);
      toast({
        title: 'Success',
        description: 'Invitation email sent successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error sending invitation email:', error);
      toast({
        title: 'Error',
        description: 'Failed to send invitation email. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleRemoveButtonClick = (userId: string) => {
    setUserIdToRemove(userId);
    setIsAlertOpen(true);
  };

  const handleRemoveUser = async (userId: string) => {
    try {
      await deleteProjectUser({
        variables: { userId, projectId },
      });
      toast({
        title: 'Success',
        description: 'User removed from the project successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      refetchProjectUsers();
    } catch (error) {
      console.error('Error removing user from project:', error);
      toast({
        title: 'Error',
        description:
          'Failed to remove user from the project. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEditMemberClick = (crewMember: CrewMemberData) => {
    setSelectedCrewMember(sanitizeCrewMemberData(crewMember)); // TODO - user sanitize to try unfuck zod or just fix zod
    // setSelectedCrewMember(crewMember); // set selected crew member for editing
    setIsModalOpen(true);
  };

  const handleUpdateCrewMember = async (data: CrewMemberData) => {
    setIsSubmitting(true);
    try {
      console.log('Edit crew member:', data);
      await editCrewMember(data, projectId!);

      toast({
        title: 'Success',
        description: 'Crew member updated successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      handleModalClose();
      refetchProjectUsers();
    } catch (error) {
      console.error('Error updating crew member:', error);
      toast({
        title: 'Error',
        description: 'Failed to update crew member. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredUsers =
    crewList.userRoleInProject === 'ADMIN'
      ? crewList.projectUsers
      : crewList.projectUsers.filter(
          (projectUser: { user: { id: string } }) =>
            projectUser.user.id === auth.user?.id,
        );

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar>
        <Button
          as={ReactRouterLink}
          to={route.myprojects()}
          variant="ghost"
          colorScheme="orange"
          textColor="white"
          aria-label="Button going to My Projects page"
          bg={
            location.pathname === route.myprojects()
              ? 'orange.500'
              : 'transparent'
          }
          color="white"
          _hover={{
            bg: 'orange.700',
            color: 'white',
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)',
          }}
          _active={{
            bg: 'orange.500',
            color: 'white',
            boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.3)',
          }}
        >
          My Projects
        </Button>
        <ProjectButtons
          projectId={projectId!}
          activePath={location.pathname}
          userRole={crewList.userRoleInProject}
        />
      </Navbar>
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
        <Box overflowX="auto">
          <Table variant="simple" size={tableSize}>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Surname</Th>
                <Th>Department</Th>
                <Th>Position</Th>
                <Th>Role</Th>
                <Th>Email</Th>
                <Th>Phone number</Th>
                <Th>Standard rate</Th>
                <Th>Compensation rate</Th>
                <Th>Overtime hour 1</Th>
                <Th>Overtime hour 2</Th>
                <Th>Overtime hour 3</Th>
                <Th>Overtime hour 4</Th>
                <Th>Invitation</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredUsers.map(
                (user: {
                  id: string;
                  user: {
                    id: string;
                    name: string;
                    surname: string;
                    email: string;
                    standard_rate: number;
                    compensation_rate: number;
                    overtime_hour1: number;
                    overtime_hour2: number;
                    overtime_hour3: number;
                    overtime_hour4: number;
                  };
                  department: { name: string; id: string } | null;
                  role: string;
                  position: string;
                  phone_number: string;
                  is_active: boolean;
                  invitation: string;
                  rate: { id: string };
                }) => (
                  <Tr
                    key={user.id}
                    onClick={() =>
                      handleEditMemberClick({
                        id: user.id,
                        name: user.user.name,
                        surname: user.user.surname,
                        department: user.department?.id || 'N/A',
                        position: user.position,
                        phone_number: user.phone_number,
                        email: user.user.email,
                        standard_rate: user.user.standard_rate,
                        compensation_rate: user.user.compensation_rate,
                        overtime_hour1: user.user.overtime_hour1,
                        overtime_hour2: user.user.overtime_hour2,
                        overtime_hour3: user.user.overtime_hour3,
                        overtime_hour4: user.user.overtime_hour4,
                        role: user.role,
                        user_id: user.user.id,
                        rate_id: user.rate?.id,
                      })
                    }
                    _hover={{ cursor: 'pointer', backgroundColor: 'gray.100' }}
                  >
                    <Td>{user.user.name}</Td>
                    <Td>{user.user.surname}</Td>
                    <Td>{String(user.department?.name) || 'N/A'}</Td>
                    <Td>{user.role}</Td>
                    <Td>{user.position}</Td>
                    <Td>
                      <a href={`mailto:${user?.user?.email || ''}`}>
                        {user.user.email}
                      </a>
                    </Td>
                    <Td>{user.phone_number}</Td>
                    <Td>{user.user.standard_rate}</Td>
                    <Td>{user.user.compensation_rate}</Td>
                    <Td>{user.user.overtime_hour1}</Td>
                    <Td>{user.user.overtime_hour2}</Td>
                    <Td>{user.user.overtime_hour3}</Td>
                    <Td>{user.user.overtime_hour4}</Td>
                    <Td>
                      <Button
                        colorScheme="orange"
                        isDisabled={user.is_active && user.invitation != null}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSendEmail(user.user.id);
                        }}
                      >
                        {user.is_active && user.invitation != null
                          ? 'Joined'
                          : !user.is_active && user.invitation != null
                            ? 'Resend invitation'
                            : 'Send invitation'}
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        colorScheme="red"
                        ml={2}
                        onClick={(e) => {
                          e.stopPropagation(); // prevent row click
                          handleRemoveButtonClick(user.user.id);
                        }}
                      >
                        Remove
                      </Button>
                    </Td>
                  </Tr>
                ),
              )}
            </Tbody>
          </Table>
        </Box>
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
              // handleUpdateCrewMember({ ...data, id: selectedCrewMember.id });
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
              ); // Pass sendInvite boolean
            }
          }}
          isLoading={isSubmitting}
          departments={crewList.departments}
          initialValues={selectedCrewMember || undefined}
          mode={selectedCrewMember ? 'edit' : 'add'}
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
