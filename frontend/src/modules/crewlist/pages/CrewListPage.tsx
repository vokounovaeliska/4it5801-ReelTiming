import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Center,
  Heading,
  Spinner,
  Table,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';
import {
  Link as ReactRouterLink,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import ProjectButtons from '@frontend/modules/myprojects/ProjectButtons';
import { route } from '@frontend/route';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';

import { GET_PROJECT_DETAILS } from '../../../gql/queries/GetProjectDetails';
import { GET_USER_ROLE_IN_PROJECT } from '../../../gql/queries/GetUserRoleInProject';
import { CrewListForm } from '../forms/CrewListForm';

export function CrewListPage() {
  const auth = useAuth();
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const tableSize = useBreakpointValue({ base: 'sm', md: 'md' });
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

  if (loading || roleLoading) {
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

  const handleAddMemberClick = () => {
    setIsFormVisible(!isFormVisible);
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
          {isFormVisible ? 'Hide Form' : 'Add New Member'}
        </Button>
        {isFormVisible && <CrewListForm projectId={projectId!} />}
        <Table variant="simple" size={tableSize}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Position</Th>
              <Th>Email</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          {/* <Tbody>
            {crewMembers.map((member, index) => (
              <Tr key={index}>
                <Td>{member.name}</Td>
                <Td>{member.position}</Td>
                <Td>{member.email}</Td>
                <Td>
                  <Button size="sm" colorScheme="blue" mr={2}>
                    Send Invitation
                  </Button>
                  <Button size="sm" colorScheme="green" mr={2}>
                    Edit
                  </Button>
                  <Button size="sm" colorScheme="red">
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody> */}
        </Table>
      </Box>
      <Footer />
    </Box>
  );
}
