import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Center, Spinner, Text } from '@chakra-ui/react';

import { GetShiftOverviewPageDataQuery, Project } from '@frontend/gql/graphql';
import { GET_SHIFT_OVERVIEW_PAGE_DATA } from '@frontend/graphql/queries/GetShiftOverviewPageData';
import { Heading } from '@frontend/shared/design-system';

import { ShiftOverviewTable } from '../atoms/ShiftOverviewTable';

interface ShiftOverviewTemplateProps {
  projectData?: Project;
}

export const ShiftOverviewTemplate: React.FC<ShiftOverviewTemplateProps> = ({
  projectData,
}) => {
  const { data, loading, error } = useQuery<GetShiftOverviewPageDataQuery>(
    GET_SHIFT_OVERVIEW_PAGE_DATA,
    {
      variables: { projectId: projectData?.id },
      skip: !projectData?.id,
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    },
  );

  if (loading)
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Loading shooting days...</Text>
      </Center>
    );

  if (error) return <Text color="red.500">Error: {error.message}</Text>;
  return (
    <Box flex="1" width="100%" p={1} alignSelf="center">
      <Box
        justifyItems={{ base: 'center', sm: 'flex-start' }}
        py={{ base: '4', sm: '0' }}
      >
        <Heading mb={4} textAlign="center">
          Shift overview for Project {projectData?.name}
        </Heading>
        <ShiftOverviewTable data={data} />
      </Box>
    </Box>
  );
};
