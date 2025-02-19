import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';
import { Button, Stack } from '@frontend/shared/design-system';

import { RouterNavLink } from '../atoms';

export function TopNavigation() {
  const { user, signOut } = useAuth();
  return (
    <Stack bg="gray.200" p="4" direction="row" spacing="0" alignItems="center">
      <RouterNavLink to={route.landingPage()}>Home</RouterNavLink>
      {user === null ? (
        <>
          <RouterNavLink to={route.hello()}>HelloWorld</RouterNavLink>
          <RouterNavLink to={route.login()}>Login</RouterNavLink>
          <RouterNavLink to={route.register()}>Register</RouterNavLink>
        </>
      ) : (
        <Button ml="2" onClick={() => signOut()}>
          Sign Out
        </Button>
      )}
    </Stack>
  );
}
