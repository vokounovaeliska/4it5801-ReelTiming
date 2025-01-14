import React from 'react';
import { Box, HStack, Progress, Text, Tooltip } from '@chakra-ui/react';

interface ProjectTimelineProps {
  startDate: string;
  endDate: string;
}

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({
  startDate,
  endDate,
}) => {
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

  const progressValue = calculateProgress(startDate, endDate);

  const resolveProgressString = (
    startDate: string,
    endDate: string,
  ): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const length = Math.floor(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );
    const today = new Date();
    const elapsedDays = Math.floor(
      (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );
    const realElapsed = Math.min(elapsedDays, length);

    return `${realElapsed} / ${length} days`;
  };

  const today = new Date();
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  let message = '';
  let daysLeft = 0;

  if (today < startDateObj) {
    daysLeft = Math.ceil(
      (startDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    message = `There ${daysLeft === 1 ? 'is' : 'are'} ${daysLeft} day${
      daysLeft === 1 ? '' : 's'
    } left until the start.`;
  } else if (today >= startDateObj && today < endDateObj) {
    daysLeft = Math.ceil(
      (endDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    message = `There ${daysLeft === 1 ? 'is' : 'are'} ${daysLeft} day${
      daysLeft === 1 ? '' : 's'
    } left until the end.`;
  } else {
    daysLeft = Math.ceil(
      (today.getTime() - endDateObj.getTime()) / (1000 * 60 * 60 * 24),
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
            {resolveProgressString(startDate, endDate)}
          </Text>
        </Box>
      </Tooltip>
      <HStack justify="space-between">
        <Text>Start date: {new Date(startDate).toLocaleDateString()}</Text>
        <Text>End date: {new Date(endDate).toLocaleDateString()}</Text>
      </HStack>
      <Text>{message}</Text>
    </Box>
  );
};

export default ProjectTimeline;
