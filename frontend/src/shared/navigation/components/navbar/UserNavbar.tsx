import React from 'react';
import { Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';
import { AvatarPhoto, Link } from '@frontend/shared/design-system';

import { RouterNavLink } from '../../atoms';

const UserNavbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {user ? (
        <>
          <RouterNavLink
            rounded={'md'}
            to={route.hello()}
            py="2" //Todo route to user detail
          >
            <Stack direction="column" align="center" spacing={1}>
              {
                //user.profileImageUrl &&
                <AvatarPhoto
                  src={
                    user?.profileImageUrl === null ? '' : user?.profileImageUrl
                  }
                  size="32px"
                />
              }
              <Text fontSize="sm" fontWeight="bold">
                {user.name}
              </Text>
              <Link
                rounded={'md'}
                size={'sm'}
                onClick={() => {
                  signOut();
                  navigate(route.login());
                  window.location.reload();
                }}
                aria-label="Logout"
                textColor={'white'}
              >
                Logout
              </Link>
            </Stack>
          </RouterNavLink>
        </>
      ) : (
        <>
          <Stack direction="column" align="center" spacing={0} color={'white'}>
            <Link
              rounded={'md'}
              size={'sm'}
              onClick={() => {
                navigate(route.login());
                window.location.reload();
              }}
              aria-label="Login"
              textColor={'white'}
            >
              Login
            </Link>
            <Text>or</Text>
            <Link
              rounded={'md'}
              size={'sm'}
              onClick={() => {
                navigate(route.register());
                window.location.reload();
              }}
              aria-label="Register"
              textColor={'white'}
            >
              Register
            </Link>
          </Stack>
        </>
      )}
    </>
  );
};

export default UserNavbar;
