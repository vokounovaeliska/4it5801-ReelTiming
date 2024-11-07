import React, { useEffect, useRef, useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import {
  AddIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  DeleteIcon,
} from '@chakra-ui/icons';
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
import { GET_CREWLIST_INFO } from '@frontend/gql/queries/GetCrewListInfo';
import { useAuth } from '@frontend/modules/auth';
import ProjectButtons from '@frontend/modules/myprojects/ProjectButtons';
import { route } from '@frontend/route';
import { TextPhoneNumber } from '@frontend/shared/design-system/atoms/TextPhoneNumber';
import { TooltipHeader } from '@frontend/shared/design-system/atoms/Tooltip';
import CustomModal from '@frontend/shared/forms/molecules/CustomModal';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';

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

  const tableRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const target = event.target as HTMLDivElement;
      const scrollLeft = target.scrollLeft;
      Object.values(tableRefs.current).forEach((ref) => {
        if (ref && ref !== target) {
          ref.scrollLeft = scrollLeft;
        }
      });
    };

    Object.values(tableRefs.current).forEach((ref) => {
      if (ref) {
        ref.addEventListener('scroll', handleScroll);
      }
    });

    return () => {
      Object.values(tableRefs.current).forEach((ref) => {
        if (ref) {
          ref.removeEventListener('scroll', handleScroll);
        }
      });
    };
  }, []);

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
  const {
    addCrewMember,
    sendEmailInvitation,
    editCrewMember,
    deleteCrewMember,
    deleteCrewMemberInvitation,
  } = useCrewMemberMutations();

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
      const { responseId } = await addCrewMember(data, projectId!);

      const cacheData = client.readQuery({
        query: GET_CREWLIST_INFO,
        variables: { projectId, userId: auth.user?.id },
      });

      const newUser = {
        ...data,
        id: responseId.data.addProjectUser.id,
        invitation: sendInvite ? true : null,
        rate_id: responseId.data.addProjectUser.rate,
        user: null,
        is_active: false,
      };

      console.log(newUser);

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
          responseId.data.addProjectUser.id,
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
    name: string,
    email: string,
    resending: boolean,
  ) => {
    try {
      if (resending) {
        await deleteCrewMemberInvitation(projectUserId!);
      }
      await sendEmailInvitation(projectUserId, name, email);

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
      // refetchProjectUsers();
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

  const handleRemoveButtonClick = (projectUserId: string) => {
    setUserIdToRemove(projectUserId);
    setIsAlertOpen(true);
  };

  const handleRemoveUser = async (projectUserId: string) => {
    try {
      await deleteCrewMember(projectUserId);
      const data = client.readQuery({
        query: GET_CREWLIST_INFO,
        variables: { projectId, userId: auth.user?.id },
      });

      const updatedUsers = data.projectUsers.filter(
        (user: ProjectUser) => user.id !== projectUserId,
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
    const sanitizedCrewMember = sanitizeCrewMemberData(crewMember);
    setSelectedCrewMember({
      ...sanitizedCrewMember,
      department: sanitizedCrewMember.department || 'No Department',
    });
    setIsModalOpen(true);
  };
  const handleUpdateCrewMember = async (data: CrewMemberData) => {
    setIsSubmitting(true);
    try {
      console.log('Updating crew member:', data);
      console.log('Available departments:', crewList.departments);

      let departmentId = data.department;
      if (
        !crewList.departments.some(
          (dept: { id: string }) => dept.id === departmentId,
        )
      ) {
        departmentId =
          departmentNameToId(data.department, crewList.departments) || '';
      }

      if (!departmentId) {
        throw new Error('Invalid department ID');
      }

      const updatedData = {
        ...data,
        department: data.department,
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
    };
    department: { name: string; id: string } | null;
    role: string;
    position: string;
    phone_number: string;
    is_active: boolean;
    invitation: string;
    name: string;
    surname: string;
    email: string;
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
                  ref={(el) => (tableRefs.current[departmentName] = el)}
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
                    <Table variant="simple" size="sm">
                      <Thead>
                        <Tr bg="#2D3748" textColor="white">
                          <Th textColor={'white'}>Name</Th>
                          <Th textColor={'white'}>Surname</Th>
                          <Th textColor={'white'}>Position</Th>
                          <Th textColor={'white'}>Role</Th>
                          <Th textColor={'white'}>Email</Th>
                          <Th textColor={'white'}>Phone number</Th>
                          <Th textColor={'white'}>Standard rate</Th>
                          <TooltipHeader
                            label="Compensation rate"
                            textColor="white"
                          >
                            Compensation
                          </TooltipHeader>
                          <TooltipHeader
                            label="Overtime hour1"
                            textColor="white"
                          >
                            OH 1
                          </TooltipHeader>
                          <TooltipHeader
                            label="Overtime hour2"
                            textColor="white"
                          >
                            OH 2
                          </TooltipHeader>
                          <TooltipHeader
                            label="Overtime hour3"
                            textColor="white"
                          >
                            OH 3
                          </TooltipHeader>
                          <TooltipHeader
                            label="Overtime hour4"
                            textColor="white"
                          >
                            OH 4
                          </TooltipHeader>
                          <Th textColor={'white'}>Invitation</Th>
                          {/*redo to remove gap if we keep this after table change */}
                          {crewList.userRoleInProject === 'ADMIN' && (
                            <Th textColor={'white'}>Delete</Th>
                          )}
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
                                  name: user?.name,
                                  surname: user?.surname,
                                  department:
                                    user.department?.id || 'No Department',
                                  position: user.position,
                                  phone_number: user.phone_number,
                                  email: user?.email,
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
                                  user_id: user.user?.id,
                                  rate_id: user.rate?.id || null,
                                })
                              }
                              _hover={{
                                cursor: 'pointer',
                                backgroundColor: 'gray.100',
                              }}
                            >
                              <Td>{user?.name}</Td>
                              <Td>{user?.surname}</Td>
                              <Td>{user.position}</Td>
                              <Td>{user.role}</Td>
                              <Td>
                                <Link
                                  href={`mailto:${user?.email}`}
                                  color="blue.500"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                >
                                  {user?.email}
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
                                  <TextPhoneNumber
                                    phoneNumber={user.phone_number}
                                  ></TextPhoneNumber>
                                </Link>
                              </Td>
                              <Td>
                                {user.rate?.standard_rate !== 0
                                  ? user.rate?.standard_rate
                                  : ''}
                              </Td>
                              <Td>
                                {user.rate?.compensation_rate !== 0
                                  ? user.rate?.compensation_rate
                                  : ''}
                              </Td>
                              <Td>
                                {user.rate?.overtime_hour1 !== 0
                                  ? user.rate?.overtime_hour1
                                  : ''}
                              </Td>
                              <Td>
                                {user.rate?.overtime_hour2 !== 0
                                  ? user.rate?.overtime_hour2
                                  : ''}
                              </Td>
                              <Td>
                                {user.rate?.overtime_hour3 !== 0
                                  ? user.rate?.overtime_hour3
                                  : ''}
                              </Td>
                              <Td>
                                {user.rate?.overtime_hour4 !== 0
                                  ? user.rate?.overtime_hour4
                                  : ''}
                              </Td>
                              <Td>
                                <Button
                                  colorScheme="orange"
                                  size={'sm'}
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
                                        user?.name,
                                        user?.email,
                                        false,
                                      );
                                    } else if (
                                      user.invitation != null &&
                                      !user.is_active
                                    ) {
                                      sendInvitation(
                                        user.id,
                                        user?.name,
                                        user?.email,
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
                              {crewList.userRoleInProject === 'ADMIN' &&
                                user.user?.id !== auth.user?.id && (
                                  <Td>
                                    <IconButton
                                      aria-label="Remove record"
                                      icon={<DeleteIcon />}
                                      colorScheme="red"
                                      size={'sm'}
                                      onClick={(e) => {
                                        e.stopPropagation(); // prevent row click
                                        handleRemoveButtonClick(user.id);
                                      }}
                                    />
                                  </Td>
                                )}
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
