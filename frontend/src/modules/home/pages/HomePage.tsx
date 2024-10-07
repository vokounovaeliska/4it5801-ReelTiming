import { useQuery } from '@apollo/client';

import { gql } from '@frontend/gql';
import { useAuth } from '@frontend/modules/auth';
import { Box } from '@frontend/shared/design-system';
import { TopNavigation } from '@frontend/shared/navigation/organisms/TopNavigation';

const EMPTY_QUERY = gql(/* GraphQL */ `
  query Quacks {
    _empty
  }
`);

export function HomePage() {
  const { user } = useAuth();
  const queryState = useQuery(EMPTY_QUERY);

  return (
    <Box>
      <TopNavigation />
      <Box p="8">
        <Box>Hello: {user ? user.name : '(not logged in)'}</Box>
        <Box pt="4">GraphQL query result:</Box>
        <Box as="pre" fontFamily="mono">
          {JSON.stringify(queryState.data)}
        </Box>
      </Box>
    </Box>
  );
}
