import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Button, Center, Heading, Spinner, Text } from '@chakra-ui/react';
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

export function EditProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const { data, loading, error } = useQuery(GET_PROJECT_DETAILS, {
    variables: { id: projectId },
  });

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
          Edit Project for Project {project.name}
        </Heading>
      </Box>
      <Footer />
    </Box>
  );
}
