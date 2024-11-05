import { Box, Button, Center, Heading, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';

import { FormValues } from '@frontend/modules/myprojects/organisms/CreateProjectForm';
import ProjectButtons from '@frontend/modules/myprojects/ProjectButtons';
import { route } from '@frontend/route';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';

import { EditProjectForm } from '../forms/EditProjectForm';
import { ProjectData } from '../pages/EditProjectPage';

export function EditProjectTemplate({
  project,
  projectId,
  onSubmit,
}: {
  project: ProjectData;
  projectId: string;
  onSubmit: (data: FormValues) => void;
}) {
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
        <ProjectButtons
          projectId={projectId}
          activePath={location.pathname}
          userRole="ADMIN"
        />
      </Navbar>
      <Box
        flex="1"
        p={{ base: 4, md: 6 }}
        width="100%"
        maxWidth="1200px"
        mx="auto"
        bg="white"
      >
        <Heading
          mb={6}
          textAlign="center"
          fontSize={{ base: '2xl', md: '3xl' }}
        >
          Edit Project:{' '}
          <Text as="span" color="gray.700">
            {project?.name}
          </Text>
        </Heading>

        <Center>
          <EditProjectForm
            projectId={projectId}
            project={project}
            onSubmit={onSubmit}
          />
        </Center>
      </Box>

      <Footer />
    </Box>
  );
}
