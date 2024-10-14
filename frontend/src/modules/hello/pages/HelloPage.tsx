import { useQuery } from '@apollo/client';

import { gql } from '@frontend/gql';
import { useAuth } from '@frontend/modules/auth';
import { Box } from '@frontend/shared/design-system';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';
import UserNavbar from '@frontend/shared/navigation/components/navbar/UserNavbar';

const EMPTY_QUERY = gql(/* GraphQL */ `
  query Quacks {
    _empty
  }
`);

export function HelloPage() {
  const { user } = useAuth();
  const queryState = useQuery(EMPTY_QUERY);

  return (
    <Box>
      <Navbar>
        <UserNavbar />
      </Navbar>
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
