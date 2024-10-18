import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { MyProjectsTemplate } from '@frontend/modules/auth/templates/MyProjectsTemplate';
import { route } from '@frontend/route';

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
    }
  }
`;

export function MyProjectsPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_PROJECTS);

  useEffect(() => {
    if (!auth.user) {
      navigate(route.landingPage());
    }
  }, [auth.user, navigate]);

  if (!auth.user) {
    return null;
  }

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>Error fetching projects: {error.message}</p>;
  }

  const projects =
    data?.projects?.map((project: { id: string; name: string }) => project) || [];

  const handleAddProject = () => {
    navigate(route.createProject());
  };

  return (
    <MyProjectsTemplate projects={projects} onAddProject={handleAddProject} />
  );
}
