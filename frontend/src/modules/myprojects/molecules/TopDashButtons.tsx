import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { FaClock, FaUsers } from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';

import { route } from '@frontend/route';

import TopDashButton from '../atoms/TopDashButton';

interface TopDashButtonsProps {
  userRole: string;
  projectId: string;
}

const TopDashButtons: React.FC<TopDashButtonsProps> = ({
  userRole,
  projectId,
}) => {
  return (
    <Box mt={5} justifyContent="space-between" width="100%">
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        {userRole === 'CREW' && (
          <TopDashButton
            text="Report shift"
            icon={<FaCirclePlus />}
            ariaLabel="Submit shift times"
            to={route.timesheets(projectId)}
          />
        )}
        <TopDashButton
          text={userRole === 'CREW' ? 'Personal Pay Rates' : 'Crew List'}
          icon={<FaUsers />}
          to={route.crewList(projectId)}
          ariaLabel={
            userRole === 'CREW'
              ? 'View and edit Personal Pay Rates'
              : 'View Crew List'
          }
        />

        <TopDashButton
          text="Shifts"
          icon={<FaClock />}
          ariaLabel="Shifts"
          to={route.timesheets(projectId)}
        />
      </SimpleGrid>
    </Box>
  );
};

export default TopDashButtons;
