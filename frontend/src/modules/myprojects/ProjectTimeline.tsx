import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, HStack, Progress, Text, Tooltip } from '@chakra-ui/react';

import { GET_PROJECT_DETAILS } from '@frontend/graphql/queries/GetProjectDetails';

interface ProjectTimelineProps {
  projectId: string;
}

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ projectId }) => {
  const { data, loading, error } = useQuery(GET_PROJECT_DETAILS, {
    variables: { id: projectId },
    fetchPolicy: 'cache-and-network',
  });

  const isDataAvailable = !!data && Object.keys(data).length > 0;

  if (!isDataAvailable && loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const project = data?.project;

  if (!project) return <Text>No project found.</Text>;

  const calculateProgress = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();

    const totalDays = Math.floor(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );
    const elapsedDays = Math.floor(
      (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );

    const progressValue = Math.max(
      0,
      Math.min(100, (elapsedDays / totalDays) * 100),
    );
    return progressValue;
  };

  const progressValue = calculateProgress(
    project.start_date!,
    project.end_date!,
  );

  const resolveProgressString = (
    startDate: string,
    endDate: string,
  ): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const lenght = Math.floor(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );
    const elapsedDays = Math.floor(
      (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );
    var realElapsed = elapsedDays > lenght ? lenght : elapsedDays;

    return `${realElapsed} / ${lenght} days`;
  };

  // Determine the message to display
  const today = new Date();
  const startDate = new Date(project.start_date!);
  const endDate = new Date(project.end_date!);

  let message = '';
  let daysLeft = 0;

  if (today < startDate) {
    daysLeft = Math.ceil(
      (startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    message = `There ${daysLeft === 1 ? 'is' : 'are'} ${daysLeft} day${
      daysLeft === 1 ? '' : 's'
    } left until the start.`;
  } else if (today >= startDate && today < endDate) {
    daysLeft = Math.ceil(
      (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    message = `There ${daysLeft === 1 ? 'is' : 'are'} ${daysLeft} day${
      daysLeft === 1 ? '' : 's'
    } left until the end.`;
  } else {
    daysLeft = Math.ceil(
      (today.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    message = `The project ended ${daysLeft} day${
      daysLeft === 1 ? '' : 's'
    } ago.`;
  }

  return (
    <Box>
      <Text>Project timeline</Text>
      <Tooltip
        label={`Today's date: ${new Date().toLocaleDateString()}`}
        //hasArrow
        placement="top"
      >
        <Box position="relative" width="100%">
          <Progress
            colorScheme="orange"
            height="25px"
            mt={6}
            mb={2}
            value={progressValue}
          />
          <Text
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            color="black"
            fontWeight="bold"
          >
            {resolveProgressString(project.start_date!, project.end_date!)}
          </Text>
        </Box>
      </Tooltip>
      <HStack justify="space-between">
        <Text>
          Start date: {new Date(project.start_date!).toLocaleDateString()}
        </Text>
        <Text>
          End date: {new Date(project.end_date!).toLocaleDateString()}
        </Text>
      </HStack>
      <Text>{message}</Text>
    </Box>
  );
};

export default ProjectTimeline;
