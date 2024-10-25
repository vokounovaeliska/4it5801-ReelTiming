import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Center,
  Heading,
  Spinner,
  Table,
  //   Tbody,
  //   Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';
import {
  Link as ReactRouterLink,
  useLocation,
  useParams,
} from 'react-router-dom';

import { GET_PROJECT_DETAILS } from '@frontend/gql/queries/GetProjectDetails';
import ProjectButtons from '@frontend/modules/myprojects/ProjectButtons';
import { route } from '@frontend/route';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';

import { CrewListForm } from '../forms/CrewListForm';

export function CrewListPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const [isFormVisible, setIsFormVisible] = useState(false);
  //   const [crewMembers, setCrewMembers] = useState([]);
  const tableSize = useBreakpointValue({ base: 'sm', md: 'md' });

  const { data, loading, error } = useQuery(GET_PROJECT_DETAILS, {
    variables: { id: projectId },
  });

  const handleAddMemberClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  if (loading) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading project details...</Text>
      </Center>
    );
  }

  if (error) {
    return (
      <Center minHeight="100vh">
        <Text color="red.500">
          Error loading project details: {error.message}
        </Text>
      </Center>
    );
  }

  const project = data?.project;

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
        <ProjectButtons projectId={projectId!} activePath={location.pathname} />
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
