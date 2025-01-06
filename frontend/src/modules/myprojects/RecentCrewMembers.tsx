import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

import { GET_CREWLIST_INFO } from '@frontend/graphql/queries/GetCrewListInfo';

import { ProjectUser } from '../crewlist/interfaces/interfaces';

interface RecentCrewMembersProps {
  projectId: string;
  userId: string;
}

const RecentCrewMembers: React.FC<RecentCrewMembersProps> = ({
  projectId,
  userId,
}) => {
  const { loading, error, data } = useQuery(GET_CREWLIST_INFO, {
    variables: { projectId, userId },
    fetchPolicy: 'cache-and-network',
  });

  const isDataAvailable = !!data && Object.keys(data).length > 0;

  if (!isDataAvailable && loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const crewMembers: ProjectUser[] = data?.projectUsers || [];

  const membersWithDate = crewMembers.map((member) => ({
    ...member,
    rate: {
      ...member.rate,
      create_date: new Date(member?.rate?.create_date!),
    },
  }));

  const sortedMembers = membersWithDate
    .sort((a, b) => {
      const dateA = a.rate.create_date!.getTime();
      const dateB = b.rate.create_date!.getTime();
      return dateB - dateA;
    })
    .slice(0, 3);

  return (
    <>
      <Text>Recently added crew members</Text>
      <Box overflowX="hidden">
        <Table variant="simple" size={{ base: 'sm', md: 'md' }}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Surname</Th>
              <Th>Department</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedMembers.length > 0 ? (
              sortedMembers.map((member) => (
                <Tr key={member.id}>
                  <Td>{member?.name}</Td>
                  <Td>{member?.surname}</Td>
                  <Td>
                    {member.department
                      ? member.department.name
                      : 'Assistant Director'}
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={3}>No recent members found.</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default RecentCrewMembers;
