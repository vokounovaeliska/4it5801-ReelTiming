import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Box, Heading, Spinner, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const GET_PROJECT_DETAIL = gql`
  query GetProjectDetail($id: String!) {
    project(id: $id) {
      id
      name
      description
      production_company
      start_date
      end_date
      create_date
      create_user_id
      last_update_date
      last_update_user_id
      is_active
    }
  }
`;

export function MyProjectDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery(GET_PROJECT_DETAIL, {
    variables: { id },
  });

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return <p>Error loading project details: {error.message}</p>;
  }

  const project = data?.project;

  return (
    <Box p={6}>
      <Heading as="h2" size="xl" mb={4}>
        {project?.name}
      </Heading>
      <Text fontSize="lg" mb={6}>
        {project?.description || 'No description available'}
      </Text>
      <Text fontSize="md" mb={2}>
        <strong>Production Company:</strong> {project?.production_company}
      </Text>
      <Text fontSize="md" mb={2}>
        <strong>Start Date:</strong>{' '}
        {new Date(project?.start_date).toLocaleDateString() || 'N/A'}
      </Text>
      <Text fontSize="md" mb={2}>
        <strong>End Date:</strong>{' '}
        {project?.end_date
          ? new Date(project?.end_date).toLocaleDateString()
          : 'N/A'}
      </Text>
      <Text fontSize="md" mb={2}>
        <strong>Created On:</strong>{' '}
        {new Date(project?.create_date).toLocaleDateString()}
      </Text>
      <Text fontSize="md" mb={2}>
        <strong>Created By:</strong> {project?.create_user_id}
      </Text>
      <Text fontSize="md" mb={2}>
        <strong>Last Updated On:</strong>{' '}
        {new Date(project?.last_update_date).toLocaleDateString()}
      </Text>
      <Text fontSize="md" mb={2}>
        <strong>Last Updated By:</strong> {project?.last_update_user_id}
      </Text>
      <Text fontSize="md" mb={6}>
        <strong>Is Active:</strong> {project?.is_active ? 'Yes' : 'No'}
      </Text>
    </Box>
  );
}
