import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

import { GET_CREWUSERINFO_TIMESHEETS } from '@frontend/graphql/queries/GetCrewUserInfoTimesheets';
import { GET_CREW_STATEMENTS } from '@frontend/graphql/queries/GetStatements';

import { Timesheet, UserProjectInfo } from '../interface';

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
    nextFetchPolicy: 'cache-first',
  });

  const {
    loading: loadingTimesheets,
    error: errorTimesheets,
    data: dataTimesheets,
  } = useQuery(GET_CREW_STATEMENTS, {
    skip: !dataUserInfo?.projectUserDetails?.id,
    variables: { projectUserId: dataUserInfo?.projectUserDetails?.id! },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  if (loadingUserInfo || loadingTimesheets) {
    return <Text>Loading...</Text>;
  }

  if (errorUserInfo || errorTimesheets) {
    return <Text>Error loading data!</Text>;
  }

  const userProjectInfo: UserProjectInfo | undefined =
    dataUserInfo?.projectUserDetails || undefined;

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
    return <Text>No shifts found.</Text>;
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
              <Th>Call - wrap</Th>
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
