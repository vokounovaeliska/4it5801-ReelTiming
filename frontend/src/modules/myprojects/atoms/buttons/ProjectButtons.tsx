import React from 'react';
import { AttachmentIcon, RepeatClockIcon } from '@chakra-ui/icons';
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

import { ReactRouterLink } from '@frontend/shared/navigation/atoms';

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
  const dailyReport = `/projects/${projectId}/daily-reports`;
  const shiftsOverview = `/projects/${projectId}/shift-overview`;

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const StackComponent =
    useBreakpointValue({ base: VStack, 'admin-nav': HStack }) || VStack;

  return (
    <Box>
      <StackComponent>
        <Button
          {...buttonStyle}
          as={ReactRouterLink}
          leftIcon={<MdOutlineSummarize />}
          bg={activePath === dashboardPath ? 'orange.600' : 'transparent'}
          onClick={() => handleNavigation(dashboardPath)}
        >
          Dashboard
        </Button>
        <Button
          {...buttonStyle}
          as={ReactRouterLink}
          leftIcon={<CiViewTimeline />}
          bg={activePath === timesheetsPath ? 'orange.600' : 'transparent'}
          onClick={() => handleNavigation(timesheetsPath)}
        >
          Shifts
        </Button>
        {userRole === 'ADMIN' && (
          <>
            <Button
              {...buttonStyle}
              as={ReactRouterLink}
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
          as={ReactRouterLink}
          bg={activePath === myProjectSettings ? 'orange.600' : 'transparent'}
          onClick={() => handleNavigation(myProjectSettings)}
        >
          My project settings
        </Button>
        {userRole === 'ADMIN' && (
          <>
            <Button
              {...buttonStyle}
              as={ReactRouterLink}
              leftIcon={<AttachmentIcon />}
              bg={activePath === dailyReport ? 'orange.600' : 'transparent'}
              onClick={() => handleNavigation(dailyReport)}
            >
              Daily report
            </Button>
            <Button
              {...buttonStyle}
              as={ReactRouterLink}
              leftIcon={<RepeatClockIcon />}
              bg={activePath === shiftsOverview ? 'orange.600' : 'transparent'}
              onClick={() => handleNavigation(shiftsOverview)}
            >
              Shifts overview
            </Button>
            <Button
              {...buttonStyle}
              as={ReactRouterLink}
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
