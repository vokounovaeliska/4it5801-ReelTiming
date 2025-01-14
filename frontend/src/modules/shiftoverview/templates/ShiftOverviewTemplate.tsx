import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Center, Spinner, Text } from '@chakra-ui/react';

import { GetShiftOverviewPageDataQuery, Project } from '@frontend/gql/graphql';
import { GET_SHIFT_OVERVIEW_PAGE_DATA } from '@frontend/graphql/queries/GetShiftOverviewPageData';
import { Heading } from '@frontend/shared/design-system';
import { LoadingSpinner } from '@frontend/shared/design-system/atoms/LoadingSpinner';

import { ShiftOverviewTable } from '../tables/ShiftOverviewTable';
import { getAllDatesBetween } from '../utils/shiftOverviewUtils';

interface ShiftOverviewTemplateProps {
  projectData?: Project;
}

export const ShiftOverviewTemplate: React.FC<ShiftOverviewTemplateProps> = ({
  projectData,
}) => {
  const { data, loading, error, refetch } =
    useQuery<GetShiftOverviewPageDataQuery>(GET_SHIFT_OVERVIEW_PAGE_DATA, {
      variables: { projectId: projectData?.id },
      skip: !projectData?.id,
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    });

  const days: Date[] = getAllDatesBetween(
    data?.project?.start_date,
    data?.project?.end_date,
  );

  const [notReportedByDate] = useState<
    Map<number, Set<GetShiftOverviewPageDataQuery['projectUsers'][number]>>
  >(() => new Map(days.map((date) => [date.getTime(), new Set()])));

  if (loading) return <LoadingSpinner title="shift overview" />;

  if (!projectData) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" color="orange.500" />
        <Text ml={4}>Error fetching project data...</Text>
      </Center>
    );
  }

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
        <ShiftOverviewTable
          data={data}
          refetch={refetch}
          workDays={days}
          notReportedByDate={notReportedByDate}
          project={projectData}
        />
      </Box>
    </Box>
  );
};
