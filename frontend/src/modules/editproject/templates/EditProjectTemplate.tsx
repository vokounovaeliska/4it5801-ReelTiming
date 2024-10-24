import React from 'react';
import { Box, Button, Center, Heading } from '@chakra-ui/react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';

import ProjectButtons from '@frontend/modules/myprojects/ProjectButtons';
import { route } from '@frontend/route';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';

import { EditProjectForm } from '../forms/EditProjectForm';

export function EditProjectTemplate({ projectId }: { projectId: string }) {
  const location = useLocation();

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
        <ProjectButtons projectId={projectId} activePath={location.pathname} />
      </Navbar>
      <Box flex="1" p={4} width="100%" maxWidth="1200px" mx="auto">
        <Heading mb={4} textAlign="center">
          Edit Project for Project {projectId}
        </Heading>
        <Center>
          <EditProjectForm projectId={projectId} />
        </Center>
      </Box>
      <Footer />
    </Box>
  );
}
