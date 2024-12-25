import React from 'react';
import {
  Box,
  Button,
  HStack,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { BsPersonGear } from 'react-icons/bs';
import { CiViewTimeline } from 'react-icons/ci';
import { FaPeopleGroup } from 'react-icons/fa6';
import { MdBuild, MdOutlineSummarize } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface ProjectButtonsProps {
  activePath?: string;
  projectId: string;
  userRole: string;
}

const ProjectButtons: React.FC<ProjectButtonsProps> = ({
  projectId,
  activePath,
  userRole,
}) => {
  const navigate = useNavigate();
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
      bg: 'orange.600',
      color: 'white',
      boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.3)',
    },
  };
  const dashboardPath = `/projects/${projectId}`;
  const timesheetsPath = `/projects/${projectId}/timesheets`;
  const crewlistPath = `/projects/${projectId}/crewlist`;
  const myProjectSettings = `/projects/${projectId}/myProjectSettings`;
  const editPath = `/projects/${projectId}/edit`;
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const StackComponent =
    useBreakpointValue({ base: VStack, 'admin-nav': HStack }) || VStack;

  return (
    <Box>
      <StackComponent spacing={4}>
        <Button
          {...buttonStyle}
          leftIcon={<MdOutlineSummarize />}
          bg={activePath === dashboardPath ? 'orange.600' : 'transparent'}
          onClick={() => handleNavigation(dashboardPath)}
        >
          Dashboard
        </Button>
        <Button
          {...buttonStyle}
          leftIcon={<CiViewTimeline />}
          bg={activePath === timesheetsPath ? 'orange.600' : 'transparent'}
          onClick={() => handleNavigation(timesheetsPath)}
        >
          Timesheets
        </Button>
        {userRole === 'ADMIN' && (
          <>
            <Button
              {...buttonStyle}
              leftIcon={<FaPeopleGroup />}
              bg={activePath === crewlistPath ? 'orange.600' : 'transparent'}
              onClick={() => handleNavigation(crewlistPath)}
            >
              Crew List
            </Button>
          </>
        )}
        <Button
          {...buttonStyle}
          leftIcon={<BsPersonGear />}
          bg={activePath === myProjectSettings ? 'orange.600' : 'transparent'}
          onClick={() => handleNavigation(myProjectSettings)}
        >
          My project settings
        </Button>
        {userRole === 'ADMIN' && (
          <>
            <Button
              {...buttonStyle}
              leftIcon={<MdBuild />}
              bg={activePath === editPath ? 'orange.600' : 'transparent'}
              onClick={() => handleNavigation(editPath)}
            >
              Edit Project
            </Button>
          </>
        )}
      </StackComponent>
    </Box>
  );
};

export default ProjectButtons;
