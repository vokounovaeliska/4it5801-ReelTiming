import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { FaClock, FaUsers } from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';
import { IoIosSettings } from 'react-icons/io';

import { route } from '@frontend/route';

import TopDashButton from './buttons/TopDashButton';

interface TopDashButtonsProps {
  userRole: string;
  projectId: string;
  isProjectActive?: boolean;
}

const TopDashButtons: React.FC<TopDashButtonsProps> = ({
  userRole,
  projectId,
  isProjectActive = true,
}) => {
  return (
    <Box mt={5} justifyContent="space-between" width="100%">
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        {userRole === 'CREW' && (
          <TopDashButton
            text="Report shift"
            icon={<FaCirclePlus />}
            ariaLabel="Submit shift times"
            to={`${route.timesheets(projectId)}?reportDirectly=${isProjectActive}`}
          />
        )}
        <TopDashButton
          text={userRole === 'CREW' ? 'My project settings' : 'Crew List'}
          icon={<FaUsers />}
          to={
            userRole === 'CREW'
              ? route.myProjectSettings(projectId)
              : route.crewList(projectId)
          }
          ariaLabel={
            userRole === 'CREW'
              ? 'View and edit My project settings'
              : 'View Crew List'
          }
        />
        <TopDashButton
          text="Shifts"
          icon={<FaClock />}
          ariaLabel="Shifts"
          to={route.timesheets(projectId)}
        />

        {userRole === 'ADMIN' && (
          <TopDashButton
            text="Edit departments"
            icon={<IoIosSettings />}
            ariaLabel="Edit departments"
            to={route.editDepartments(projectId)}
            isDisabled={!isProjectActive}
          />
        )}
      </SimpleGrid>
    </Box>
  );
};

export default TopDashButtons;
