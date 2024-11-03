import React, { useState } from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Collapse,
  Heading,
  IconButton,
  Link,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {
  Link as ReactRouterLink,
  useLocation,
  useParams,
} from 'react-router-dom';

import { useCrewMemberMutations } from '@frontend/gql/mutations/addCrewMember';
import { DELETE_INVITATION } from '@frontend/gql/mutations/DeleteInvitation';
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
  const client = useApolloClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [userIdToRemove, setUserIdToRemove] = useState<string | null>(null);
  const [selectedCrewMember, setSelectedCrewMember] =
    useState<CrewMemberData | null>(null);
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const [collapsedDepartments, setCollapsedDepartments] = useState<
    Record<string, boolean>
  >({});

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
  } = useQuery(GET_CREWLIST_INFO, {
    variables: { projectId, userId: auth.user?.id },
  });

  const crewList = crewListData || [];

  // GQL MUTATIONS CALLS
  const { addCrewMember, sendEmailInvitation, editCrewMember } =
    useCrewMemberMutations();
  const [deleteProjectUser] = useMutation(DELETE_PROJECT_USER);
  const [deleteProjectInvitation] = useMutation(DELETE_INVITATION);

  if (crewListLoading) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading project details...</Text>
      </Center>
    );
  }

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
    name: string,
    email: string,
  ) => {
    setIsSubmitting(true);
    try {
      const { responseUserId } = await addCrewMember(data, projectId!);

      const cacheData = client.readQuery({
        query: GET_CREWLIST_INFO,
        variables: { projectId, userId: auth.user?.id },
      });

      const newUser = {
        ...data,
        id: responseUserId.data.addProjectUser.id,
        user: {
          id: responseUserId.data.addProjectUser.user.id,
          name,
          email,
        },
        invitation: sendInvite ? true : null,
      };

      client.writeQuery({
        query: GET_CREWLIST_INFO,
        variables: { projectId, userId: auth.user?.id },
        data: {
          ...cacheData,
          projectUsers: [...cacheData.projectUsers, newUser],
        },
      });

      if (sendInvite) {
        await sendEmailInvitation(
          projectId!,
          responseUserId.data.addProjectUser.id,
          name,
          email,
        );
      }

      toast({
        title: 'Success',
        description: `Crew member added${
          sendInvite ? ' and invitation sent' : ''
        } successfully.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      handleModalClose();
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

  const sendInvitation = async (
    projectUserId: string,
    userId: string,
    name: string,
    email: string,
    resending: boolean,
  ) => {
    try {
      if (resending) {
        await deleteProjectInvitation({
          variables: { userId, projectId: projectId! },
        });
      }
      await sendEmailInvitation(projectId!, projectUserId, name, email);

      const data = client.readQuery({
        query: GET_CREWLIST_INFO,
        variables: { projectId, userId: auth.user?.id },
      });

      const updatedUsers = data.projectUsers.map((user: ProjectUser) => {
        if (user.id === projectUserId) {
          return {
            ...user,
            invitation: true,
          };
        }
        return user;
      });

      client.writeQuery({
        query: GET_CREWLIST_INFO,
        variables: { projectId, userId: auth.user?.id },
        data: {
          ...data,
          projectUsers: updatedUsers,
        },
      });

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

      // Update the cache directly
      const data = client.readQuery({
        query: GET_CREWLIST_INFO,
        variables: { projectId, userId: auth.user?.id },
      });

      const updatedUsers = data.projectUsers.filter(
        (user: ProjectUser) => user.user.id !== userId,
      );

      client.writeQuery({
        query: GET_CREWLIST_INFO,
        variables: { projectId, userId: auth.user?.id },
        data: {
          ...data,
          projectUsers: updatedUsers,
        },
      });

      toast({
        title: 'Success',
        description: 'User removed from the project successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
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

  const departmentNameToId = (
    name: string,
    departments: { name: string; id: string }[],
  ): string | null => {
    const department = departments.find((dept) => dept.name === name);
    return department ? department.id : null;
  };

  // TODO - replace this 12IQ solution - rip
  const handleEditMemberClick = (crewMember: CrewMemberData) => {
    setSelectedCrewMember(sanitizeCrewMemberData(crewMember));
    setIsModalOpen(true);
  };

  const handleUpdateCrewMember = async (data: CrewMemberData) => {
    setIsSubmitting(true);
    try {
      const departmentId = departmentNameToId(
        data.department,
        crewList.departments,
      );
      if (!departmentId) {
        throw new Error('Invalid department ID');
      }

      const updatedData = {
        ...data,
        department: departmentId,
      };

      console.log('Edit crew member:', updatedData);
      await editCrewMember(updatedData, projectId!);

      const cacheData = client.readQuery({
        query: GET_CREWLIST_INFO,
        variables: { projectId, userId: auth.user?.id },
      });

      const updatedUsers = cacheData.projectUsers.map((user: ProjectUser) => {
        if (user.id === data.id) {
          return {
            ...user,
            ...updatedData,
          };
        }
        return user;
      });

      client.writeQuery({
        query: GET_CREWLIST_INFO,
        variables: { projectId, userId: auth.user?.id },
        data: {
          ...cacheData,
          projectUsers: updatedUsers,
        },
      });

      toast({
        title: 'Success',
        description: 'Crew member updated successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      handleModalClose();
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

  interface ProjectUser {
    id: string;
    user: {
      id: string;
      name: string;
      surname: string;
      email: string;
    };
    department: { name: string; id: string } | null;
    role: string;
    position: string;
    phone_number: string;
    is_active: boolean;
    invitation: string;
    rate: {
      id: string;
      standard_rate: number;
      compensation_rate: number;
      overtime_hour1: number;
      overtime_hour2: number;
      overtime_hour3: number;
      overtime_hour4: number;
    } | null;
  }

  const groupedByDepartment = crewList.projectUsers.reduce(
    (acc: Record<string, ProjectUser[]>, user: ProjectUser) => {
      const departmentName = user.department?.name || 'No Department';
      if (!acc[departmentName]) {
        acc[departmentName] = [];
      }
      acc[departmentName].push(user);
      return acc;
    },
    {} as Record<string, ProjectUser[]>,
  );

  const toggleDepartmentCollapse = (departmentName: string) => {
    setCollapsedDepartments((prev) => ({
      ...prev,
      [departmentName]: !prev[departmentName],
    }));
  };

  const sortedDepartments = Object.keys(groupedByDepartment).sort();

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
        <Box
          overflowX="auto"
          h="100%"
          whiteSpace="nowrap"
          px="32px"
          sx={{
            '::-webkit-scrollbar': {
              display: 'block',
            },
          }}
        >
          {sortedDepartments.map((departmentName) => (
            <Box
              key={departmentName}
              mb={8}
              borderWidth="2px"
              borderRadius="lg"
              boxShadow="md"
              bg="white"
            >
              <Box
                display="flex"
                alignItems="center"
                bg="#2D3748"
                p={2}
                borderTopRadius="lg"
                cursor="pointer"
                onClick={() => toggleDepartmentCollapse(departmentName)}
              >
                <Box display="flex" alignItems="center">
                  <ChevronDownIcon
                    transform={
                      collapsedDepartments[departmentName]
                        ? 'rotate(0deg)'
                        : 'rotate(180deg)'
                    }
                    transition="transform 0.3s"
                    color="white"
                    mr={2}
                  />
                  <Box fontWeight="bold" fontSize="xl" textColor="white">
                    {departmentName}
                  </Box>
                </Box>
              </Box>
              <Collapse
                in={!collapsedDepartments[departmentName]}
                animateOpacity
              >
                <TableContainer className="custom-scrollbar">
                  <Box
                    overflowX="auto"
                    sx={{
                      '::-webkit-scrollbar': {
                        height: '12px',
                      },
                      '::-webkit-scrollbar-track': {
                        background: '#2D3748',
                      },
                      '::-webkit-scrollbar-thumb': {
                        background: '#888',
                        borderRadius: '6px',
                      },
                      '::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                      },
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#2D3748 white',
                    }}
                  >
                    <Table variant="simple" size="md">
                      <Thead>
                        <Tr bg="#2D3748" textColor="white">
                          <Th textColor={'white'}>Name</Th>
                          <Th textColor={'white'}>Surname</Th>
                          <Th textColor={'white'}>Position</Th>
                          <Th textColor={'white'}>Role</Th>
                          <Th textColor={'white'}>Email</Th>
                          <Th textColor={'white'}>Phone number</Th>
                          <Th textColor={'white'}>Standard rate</Th>
                          <Th textColor={'white'}>Compensation rate</Th>
                          <Th textColor={'white'}>Overtime hour 1</Th>
                          <Th textColor={'white'}>Overtime hour 2</Th>
                          <Th textColor={'white'}>Overtime hour 3</Th>
                          <Th textColor={'white'}>Overtime hour 4</Th>
                          <Th textColor={'white'}>Invitation</Th>
                          <Th textColor={'white'}>Delete</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {groupedByDepartment[departmentName].map(
                          (user: ProjectUser) => (
                            <Tr
                              key={user.id}
                              onClick={() =>
                                handleEditMemberClick({
                                  id: user.id,
                                  name: user.user.name,
                                  surname: user.user.surname,
                                  department:
                                    user.department?.name || 'No Department',
                                  position: user.position,
                                  phone_number: user.phone_number,
                                  email: user.user.email,
                                  standard_rate: user.rate?.standard_rate || 0,
                                  compensation_rate:
                                    user.rate?.compensation_rate || 0,
                                  overtime_hour1:
                                    user.rate?.overtime_hour1 || 0,
                                  overtime_hour2:
                                    user.rate?.overtime_hour2 || 0,
                                  overtime_hour3:
                                    user.rate?.overtime_hour3 || 0,
                                  overtime_hour4:
                                    user.rate?.overtime_hour4 || 0,
                                  role: user.role,
                                  user_id: user.user.id,
                                  rate_id: user.rate?.id || null,
                                })
                              }
                              _hover={{
                                cursor: 'pointer',
                                backgroundColor: 'gray.100',
                              }}
                            >
                              <Td>{user.user.name}</Td>
                              <Td>{user.user.surname}</Td>
                              <Td>{user.position}</Td>
                              <Td>{user.role}</Td>
                              <Td>
                                <Link
                                  href={`mailto:${user.user.email}`}
                                  color="blue.500"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                >
                                  {user.user.email}
                                </Link>
                              </Td>
                              <Td>
                                <Link
                                  href={`tel:${user.phone_number}`}
                                  color="blue.500"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                >
                                  {user.phone_number}
                                </Link>
                              </Td>
                              <Td>{user.rate?.standard_rate}</Td>
                              <Td>{user.rate?.compensation_rate}</Td>
                              <Td>{user.rate?.overtime_hour1}</Td>
                              <Td>{user.rate?.overtime_hour2}</Td>
                              <Td>{user.rate?.overtime_hour3}</Td>
                              <Td>{user.rate?.overtime_hour4}</Td>
                              <Td>
                                <Button
                                  colorScheme="orange"
                                  isDisabled={
                                    user.invitation != null && user.is_active
                                  }
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (
                                      user.invitation == null &&
                                      !user.is_active
                                    ) {
                                      sendInvitation(
                                        user.id,
                                        user.user.id,
                                        user.user.name,
                                        user.user.email,
                                        false,
                                      );
                                    } else if (
                                      user.invitation != null &&
                                      !user.is_active
                                    ) {
                                      sendInvitation(
                                        user.id,
                                        user.user.id,
                                        user.user.name,
                                        user.user.email,
                                        true,
                                      );
                                    }
                                  }}
                                >
                                  {user.invitation != null && user.is_active
                                    ? 'Joined'
                                    : user.invitation == null && !user.is_active
                                      ? 'Send invitation'
                                      : 'Resend invitation'}
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
                </TableContainer>
              </Collapse>
            </Box>
          ))}
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
