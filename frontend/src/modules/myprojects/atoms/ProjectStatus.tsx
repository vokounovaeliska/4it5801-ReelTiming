import React from 'react';
import { AbsoluteCenter, Box, Divider, Text } from '@chakra-ui/react';

interface ProjectStatusProps {
  isActive: boolean;
}

const ProjectStatus: React.FC<ProjectStatusProps> = ({ isActive }) => {
  return (
    <>
      <Box position="relative" padding-bottom="10">
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          Status
        </AbsoluteCenter>
      </Box>
      <Text
        justifyContent="center"
        display="flex"
        mt={4}
        fontSize="md"
        color={isActive ? 'green.500' : 'red.500'}
      >
        <Box as="span" mr={2}>
          {isActive ? '✅' : '❌'}
        </Box>
        <Text>
          <strong>Is Active: </strong> {isActive ? 'Yes' : 'No'}
        </Text>
      </Text>
    </>
  );
};

export default ProjectStatus;
