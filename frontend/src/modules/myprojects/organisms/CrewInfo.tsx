import React from 'react';
import { Box, HStack, Text } from '@chakra-ui/react';
import { FaUsers } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';

import { route } from '@frontend/route';

import DashButton from '../atoms/DashButton';
import RecentCrewMembers from '../molecules/RecentCrewMembers';

interface CrewInfoProps {
  projectId: string;
  userId: string;
  projectUsers: { id: string }[];
}

const CrewInfo: React.FC<CrewInfoProps> = ({
  projectId,
  userId,
  projectUsers,
}) => {
  const crewMemberCount = projectUsers.length || 0;
  return (
    <>
      <Text fontSize="lg">Number of crew members</Text>
      <HStack spacing={2} align="center" mb={4}>
        <IoPerson size="64px" />
        <Box as="span" fontSize="6xl">
          {crewMemberCount}
        </Box>
      </HStack>
      <RecentCrewMembers projectId={projectId} userId={userId} />
      <Box
        display="flex"
        justifyContent={{ base: 'center', 'dash-break1': 'flex-start' }} //PŮVODNĚ TU BYLO md
        mt={4}
      >
        <DashButton
          text="Crew List"
          icon={<FaUsers />}
          ariaLabel="View Crew List"
          to={route.crewList(projectId)}
        />
      </Box>
    </>
  );
};

export default CrewInfo;
