import React from 'react';
import { useQuery } from '@apollo/client';
import { Alert, AlertIcon, Spinner } from '@chakra-ui/react';

import { GET_CREWLIST_INFO } from '@frontend/graphql/queries/GetCrewListInfo';

interface CrewMemberCountProps {
  projectId: string;
  userId: string;
}

const CrewMemberCount: React.FC<CrewMemberCountProps> = ({
  projectId,
  userId,
}) => {
  const { loading, error, data } = useQuery(GET_CREWLIST_INFO, {
    variables: { projectId, userId },
    fetchPolicy: 'cache-and-network',
  });

  const isDataAvailable = !!data && Object.keys(data).length > 0;

  if (!isDataAvailable && loading) {
    return <Spinner size="lg" />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error loading crew information.
      </Alert>
    );
  }

  const crewMemberCount = data?.projectUsers?.length || 0;

  return <>{crewMemberCount}</>;
};

export default CrewMemberCount;
