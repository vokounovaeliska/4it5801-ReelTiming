import React from 'react';
import { Box, Button, HStack, VStack } from '@chakra-ui/react';
import { CiViewTimeline } from 'react-icons/ci';
import { FaPeopleGroup } from 'react-icons/fa6';
import { MdBuild, MdOutlineSummarize } from 'react-icons/md';

interface ProjectButtonsProps {
  activePath?: string;
  projectId: string;
}

const ProjectButtons: React.FC<ProjectButtonsProps> = ({
  projectId,
  activePath,
}) => {
  const buttonStyle = {
    colorScheme: 'orange',
    variant: 'ghost',
    textColor: 'white',
    _hover: {
      bg: 'orange.700',
      color: 'white',
      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)',
    },
    _active: {
      bg: 'orange.500',
      color: 'white',
      boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.3)',
    },
  };

  const dashboardPath = `/projects/${projectId}`;
  const timesheetsPath = `/projects/${projectId}/timesheets`;
  const crewlistPath = `/projects/${projectId}/crewlist`;
  const editPath = `/projects/${projectId}/edit`;

  return (
    <Box pb={0} bg="white.100">
      {/* Mobile buttons */}
      <VStack spacing={4} display={{ base: 'flex', md: 'none' }} width="full">
        <Button
          {...buttonStyle}
          width={'full'}
          leftIcon={<MdOutlineSummarize />}
          bg={activePath === dashboardPath ? 'orange.600' : 'transparent'}
        >
          Dashboard
        </Button>
        <Button
          {...buttonStyle}
          width={'full'}
          leftIcon={<CiViewTimeline />}
          bg={activePath === timesheetsPath ? 'orange.600' : 'transparent'}
        >
          Timesheets
        </Button>
        <Button
          {...buttonStyle}
          width={'full'}
          leftIcon={<FaPeopleGroup />}
          bg={activePath === crewlistPath ? 'orange.600' : 'transparent'}
        >
          Crewlist
        </Button>
        <Button
          {...buttonStyle}
          width={'full'}
          leftIcon={<MdBuild />}
          bg={activePath === editPath ? 'orange.600' : 'transparent'}
        >
          Edit
        </Button>
      </VStack>

      {/* Desktop buttons */}
      <HStack spacing={4} display={{ base: 'none', md: 'flex' }} width="full">
        <Button
          {...buttonStyle}
          leftIcon={<MdOutlineSummarize />}
          bg={activePath === dashboardPath ? 'orange.600' : 'transparent'}
        >
          Dashboard
        </Button>
        <Button
          {...buttonStyle}
          leftIcon={<CiViewTimeline />}
          bg={activePath === timesheetsPath ? 'orange.600' : 'transparent'}
        >
          Timesheets
        </Button>
        <Button
          {...buttonStyle}
          leftIcon={<FaPeopleGroup />}
          bg={activePath === crewlistPath ? 'orange.600' : 'transparent'}
        >
          Crewlist
        </Button>
        <Button
          {...buttonStyle}
          leftIcon={<MdBuild />}
          bg={activePath === editPath ? 'orange.600' : 'transparent'}
        >
          Edit
        </Button>
      </HStack>
    </Box>
  );
};

export default ProjectButtons;
