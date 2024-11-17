import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

import { GET_CREWUSERINFO_TIMESHEETS } from '@frontend/gql/queries/GetCrewUserInfoTimesheets';
import { GET_CREW_STATEMENTS } from '@frontend/gql/queries/GetStatements';

interface Timesheet {
  id: string;
  start_date: string;
  shift_lenght: string;
  from: string;
  to: string;
  claimed_overtime: string;
  create_date: string;
  projectUser: {
    id: string;
    user: {
      id: string;
      name: string;
      surname: string;
    };
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
  user: {
    id: string;
    name: string;
    surname: string;
  };
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
    loading: loadingTimesheets,
    error: errorTimesheets,
    data: dataTimesheets,
  } = useQuery(GET_CREW_STATEMENTS, {
    variables: { userId },
  });

  const {
    loading: loadingUserInfo,
    error: errorUserInfo,
    data: dataUserInfo,
  } = useQuery(GET_CREWUSERINFO_TIMESHEETS, {
    variables: { userId, projectId },
  });

  if (loadingTimesheets || loadingUserInfo) return <Text>Loading...</Text>;
  if (errorTimesheets || errorUserInfo) return <Text>Error loading data!</Text>;

  const timesheets: Timesheet[] = dataTimesheets?.statementsByUserId || [];

  const userProjectInfo: UserProjectInfo =
    dataUserInfo?.projectUserDetails || {};

  const userTimesheets = timesheets.filter(
    (timesheet) => timesheet.projectUser.user.id === userId,
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
        {userProjectInfo.surname}{' '}
        {/* in project "{userProjectInfo.project.name}" */}
      </Text>

      <Box overflowX="auto">
        <Table variant="simple" size={{ base: 'sm', md: 'md' }}>
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
                <Td whiteSpace="nowrap">
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
