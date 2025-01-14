import React from 'react';
import { Box } from '@chakra-ui/react';
import { FaCirclePlus } from 'react-icons/fa6';

import { route } from '@frontend/route';

import DashButton from './buttons/DashButton';
import RecentTimesheets from './RecentTimesheets';

interface ShiftInfoProps {
  projectId: string;
  userId: string;
}

const ShiftInfo: React.FC<ShiftInfoProps> = ({ projectId, userId }) => {
  return (
    <>
      <RecentTimesheets projectId={projectId} userId={userId} />
      <Box
        display="flex"
        justifyContent={{ base: 'center', 'dash-break1': 'flex-start' }}
        mt={4}
      >
        <DashButton
          text="Report Shift"
          icon={<FaCirclePlus />}
          ariaLabel="Submit shift times"
          to={route.timesheets(projectId)}
        />
      </Box>
    </>
  );
};

export default ShiftInfo;
