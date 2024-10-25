import { useQuery } from '@apollo/client';

import { useAuth } from '@frontend/modules/auth';
import { Box } from '@frontend/shared/design-system';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';

import { EMPTY_QUERY } from '../../../gql/queries/EmptyQuery';

export function HelloPage() {
  const { user } = useAuth();
  const queryState = useQuery(EMPTY_QUERY);

  return (
    <Box>
      <Navbar children={undefined} />
      <Box p="8">
        <Box>HelloWorld: {user ? user.name : '(not logged in)'}</Box>
        <Box pt="4">GraphQL query result:</Box>
        <Box as="pre" fontFamily="mono">
          {JSON.stringify(queryState.data)}
        </Box>
      </Box>
    </Box>
  );
}
