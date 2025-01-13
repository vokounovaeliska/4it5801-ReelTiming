import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Center, Spinner, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { GET_USER_PROJECTS } from '@frontend/graphql/queries/GetUserProjects';
import { useAuth } from '@frontend/modules/auth';
import { MyProjectsTemplate } from '@frontend/modules/auth/templates/MyProjectsTemplate';
import { route } from '@frontend/route';

import ErrorMyProjectPage from './ErrorMyProjectPage';

export function MyProjectsPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useQuery(GET_USER_PROJECTS, {
    variables: { userId: auth.user?.id! },
    skip: !auth.user?.id,
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (!auth.user) {
      navigate(route.landingPage());
    }
  }, [auth.user, navigate]);

  const isDataAvailable = !!data && Object.keys(data).length > 0;

  if (!isDataAvailable && loading) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading project details...</Text>
      </Center>
    );
  }

  if (error || !auth.user) {
    return (
      <ErrorMyProjectPage
        errorMessage={error?.message ?? ''}
        onRetry={refetch}
      />
    );
  }

  const projects =
    data?.userProjects?.map(
      (project: {
        id: string;
        name: string;
        description: string;
        logo?: string | null;
      }) => ({
        id: project.id,
        name: project.name,
        description: project.description,
        logo: project.logo,
      }),
    ) || [];

  const handleAddProject = () => {
    navigate(route.createProject());
  };

  return (
    <MyProjectsTemplate projects={projects} onAddProject={handleAddProject} />
  );
}
