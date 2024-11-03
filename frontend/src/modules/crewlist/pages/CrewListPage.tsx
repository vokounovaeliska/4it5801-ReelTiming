import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Heading,
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
} from '@chakra-ui/react';
import {
  Link as ReactRouterLink,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import { useCrewMemberMutations } from '@frontend/gql/mutations/addCrewMember';
import { useAuth } from '@frontend/modules/auth';
import ProjectButtons from '@frontend/modules/myprojects/ProjectButtons';
import { route } from '@frontend/route';
import CustomModal from '@frontend/shared/forms/molecules/CustomModal';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';

import { DELETE_PROJECT_USER } from '../../../gql/queries/DeleteProjectUser';
import { GET_DEPARTMENTS } from '../../../gql/queries/GetDepartments';
import { GET_PROJECT_DETAILS } from '../../../gql/queries/GetProjectDetails';
import { GET_PROJECT_USERS } from '../../../gql/queries/GetProjectUsers';
import { GET_USER_ROLE_IN_PROJECT } from '../../../gql/queries/GetUserRoleInProject';
import { CrewListForm } from '../forms/CrewListForm';

export function CrewListPage() {
  const auth = useAuth();
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [userIdToRemove, setUserIdToRemove] = useState<string | null>(null);
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const [selectedCrewMember, setSelectedCrewMember] =
    useState<CrewMemberData | null>(null);
  const sanitizeCrewMemberData = (data: CrewMemberData): CrewMemberData => ({
    ...data,
    standard_rate: data.standard_rate || 0,
    compensation_rate: data.compensation_rate || 0,
    overtime_hour1: data.overtime_hour1 || 0,
    overtime_hour2: data.overtime_hour2 || 0,
    overtime_hour3: data.overtime_hour3 || 0,
    overtime_hour4: data.overtime_hour4 || 0,
  });

  const { data, loading, error } = useQuery(GET_PROJECT_DETAILS, {
    variables: { id: projectId },
  });

  const {
    data: roleData,
    loading: roleLoading,
    error: roleError,
  } = useQuery(GET_USER_ROLE_IN_PROJECT, {
    skip: !auth.user,
    variables: { userId: auth.user?.id, projectId },
  });

  const {
    data: departmentsData,
    loading: departmentsLoading,
    error: departmentsError,
  } = useQuery(GET_DEPARTMENTS);
  const {
    data: projectUsersData,
    loading: projectUsersLoading,
    error: projectUsersError,
    refetch: refetchProjectUsers,
  } = useQuery(GET_PROJECT_USERS, {
    variables: { projectId },
  });
  const { addCrewMember, sendEmailInvitation, editCrewMember } =
    useCrewMemberMutations();
  const [deleteProjectUser] = useMutation(DELETE_PROJECT_USER);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  if (loading || roleLoading || departmentsLoading || projectUsersLoading) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading project details...</Text>
      </Center>
    );
  }

  if (
    error ||
    roleError ||
    departmentsError ||
    projectUsersError ||
    !auth.user ||
    !data?.project ||
    !roleData?.userRoleInProject
  ) {
    return (
      <Center minHeight="100vh">
        <Text color="red.500">
          Error loading project details: {error?.message}
        </Text>
      </Center>
    );
  }

  const userRole = roleData.userRoleInProject;

  if (userRole !== 'ADMIN') {
    navigate(route.myprojects());
    return null;
  }

  const project = data?.project;
  const departments = departmentsData?.departments || [];
  const projectUsers = projectUsersData?.projectUsers || [];

  const handleAddMemberClick = () => {
    setSelectedCrewMember(null); // clear selected crew member for adding new
    setIsModalOpen(true);
  };

  const handleEditMemberClick = (crewMember: CrewMemberData) => {
    setSelectedCrewMember(sanitizeCrewMemberData(crewMember)); // TODO - user sanitize to try unfuck zod or just fix zod
    // setSelectedCrewMember(crewMember); // set selected crew member for editing
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCrewMember(null); // clear selected crew member on close
  };

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

  const handleAddNewCrewMember = async (data: CrewMemberData) => {
    setIsSubmitting(true);
    try {
      const { userId } = await addCrewMember(data, projectId!);
      // TODO - sendemail isnt sending after creation
      await sendEmailInvitation(projectId!, userId, data.name, data.email); // Send invitation after adding member
      // handleSendInvitation(projectId!, userId)
      console.log('New crew member added and invitation sent:', userId);
      toast({
        title: 'Success',
        description: 'Crew member added and invitation sent successfully.',
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
      setIsSubmitting(false); // Reset button state
      // refetchProjectUsers();
      // uncomment if we wanna refetch always - even after bad addition to db, fails rn thanks to no mail send
    }
  };

  const handleSendEmail = async (userId: string) => {
    try {
      await sendEmailInvitation(projectId!, userId, data.name, data.email);
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

  const handleRemoveButtonClick = (userId: string) => {
    setUserIdToRemove(userId);
    setIsAlertOpen(true);
  };

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
          userRole={userRole}
        />
      </Navbar>
      <Box flex="1" p={4} width="100%" maxWidth="1200px" mx="auto">
        <Heading mb={4} textAlign="center">
          Crew List for Project {project.name}
        </Heading>
        <Button colorScheme="orange" onClick={handleAddMemberClick} mb={4}>
          Add New Member
        </Button>
        <Table variant="simple" size={tableSize}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Surname</Th>
              <Th>Department</Th>
              <Th>Role</Th>
              <Th>Position</Th>
              <Th>Email</Th>
              <Th>Invitation</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projectUsers.map(
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
                        ? `Joined`
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
      <Footer />
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={selectedCrewMember ? 'Edit Crew Member' : 'Add Crew Member'}
      >
        <CrewListForm
          projectId={projectId!}
          onSubmit={(data) => {
            if (selectedCrewMember) {
              // TODO - implement to actually do stuff
              handleUpdateCrewMember({
                ...data,
                id: selectedCrewMember.id,
                user_id: selectedCrewMember.user_id,
                rate_id: selectedCrewMember.rate_id,
              });
              console.log('Edit crew member:', data);
            } else {
              handleAddNewCrewMember({
                ...data,
                id: '',
                user_id: null,
                rate_id: null,
              });
            }
          }}
          isLoading={isSubmitting}
          departments={departments}
          initialValues={selectedCrewMember || undefined}
          mode={selectedCrewMember ? 'edit' : 'add'}
        />
      </CustomModal>
      {/* TODO: Refactor to individual component ? cleaner code */}
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remove User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to remove from the project?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsAlertOpen(false)}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  if (userIdToRemove) {
                    handleRemoveUser(userIdToRemove);
                  }
                  setIsAlertOpen(false);
                }}
                ml={3}
              >
                Remove
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
