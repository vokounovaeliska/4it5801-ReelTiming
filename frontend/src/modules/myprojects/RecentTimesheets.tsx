import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

import { GET_CREWUSERINFO_TIMESHEETS } from '@frontend/graphql/queries/GetCrewUserInfoTimesheets';
import { GET_CREW_STATEMENTS } from '@frontend/graphql/queries/GetStatements';

interface Timesheet {
  id: string;
  start_date: string;
  shift_lenght: number;
  from: string;
  to: string;
  claimed_overtime?: number | null;
  create_date: Date;
  projectUser: {
    id: string;
    name: string;
    surname: string;
  };
}

interface UserProjectInfo {
  project: {
    id: string;
    name: string;
  };
  id: string;
  name: string;
  surname: string;
  user?: {
    id: string;
    name: string;
    surname: string;
  } | null;
}

interface RecentTimesheetsProps {
  projectId: string;
  userId: string;
}

const formatTime = (dateTime: string) => {
  const date = new Date(dateTime);
  return date.toISOString().substring(11, 16);
};

const RecentTimesheets: React.FC<RecentTimesheetsProps> = ({
  projectId,
  userId,
}) => {
  const {
    loading: loadingUserInfo,
    error: errorUserInfo,
    data: dataUserInfo,
  } = useQuery(GET_CREWUSERINFO_TIMESHEETS, {
    variables: { userId, projectId },
    fetchPolicy: 'cache-and-network',
  });

  const {
    loading: loadingTimesheets,
    error: errorTimesheets,
    data: dataTimesheets,
  } = useQuery(GET_CREW_STATEMENTS, {
    skip: !dataUserInfo?.projectUserDetails?.id, // Skip this query until projectUserId is available
    variables: { projectUserId: dataUserInfo?.projectUserDetails?.id! },
    fetchPolicy: 'cache-and-network',
  });

  // Check if the required data is available before rendering
  if (loadingUserInfo || loadingTimesheets) {
    return <Text>Loading...</Text>;
  }

  if (errorUserInfo || errorTimesheets) {
    return <Text>Error loading data!</Text>;
  }

  // Handle if data is not available
  const userProjectInfo: UserProjectInfo | null =
    dataUserInfo?.projectUserDetails!;

  if (!userProjectInfo) {
    return <Text>No user project info available!</Text>;
  }

  const timesheets: Timesheet[] =
    dataTimesheets?.statementsByProjectUserId || [];

  const userTimesheets = timesheets.filter(
    (timesheet) => timesheet.projectUser.id === userProjectInfo?.id,
  );

  const recentTimesheets = userTimesheets
    .sort(
      (a, b) =>
        new Date(b.create_date).getTime() - new Date(a.create_date).getTime(),
    )
    .slice(0, 5);

  if (recentTimesheets.length === 0) {
    return <Text>No shifts found for this user in this project.</Text>;
  }

  return (
    <>
      <Text fontSize="lg" mb={4}>
        Recently reported shifts for {userProjectInfo.name}{' '}
        {userProjectInfo.surname}
      </Text>

      <Box overflowX="auto">
        <Table variant="simple" size={{ base: 'sm', 'dash-break': 'md' }}>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Shift Type</Th>
              <Th>Time (From-To)</Th>
              <Th>Claimed OT</Th>
            </Tr>
          </Thead>
          <Tbody>
            {recentTimesheets.map((timesheet) => (
              <Tr key={timesheet.id}>
                <Td whiteSpace="nowrap">
                  {new Date(timesheet.start_date).toLocaleDateString()}
                </Td>
                <Td>{timesheet.shift_lenght}</Td>
                <Td whiteSpace={{ base: 'nowrap', md: 'normal' }}>
                  {formatTime(timesheet.from)} - {formatTime(timesheet.to)}
                </Td>
                <Td>{timesheet.claimed_overtime}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default RecentTimesheets;
