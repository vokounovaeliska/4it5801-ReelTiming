// 2024-tym4-film-crew-app/frontend/src/modules/timesheets/pages/TimesheetsPage.tsx

import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Button, Center, Heading, Spinner, Text } from '@chakra-ui/react';
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

// import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage';
import { GET_PROJECT_DETAILS } from '../../../gql/queries/GetProjectDetails';
import { GET_USER_ROLE_IN_PROJECT } from '../../../gql/queries/GetUserRoleInProject';
import { TimesheetsForm } from '../forms/TimesheetsForm';

export function TimesheetPage() {
  const auth = useAuth();
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
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
          Timesheets for Project {project.name}
        </Heading>
        <Center>
          <TimesheetsForm projectId={projectId!} />
        </Center>
      </Box>
      <Footer />
    </Box>
  );
}
