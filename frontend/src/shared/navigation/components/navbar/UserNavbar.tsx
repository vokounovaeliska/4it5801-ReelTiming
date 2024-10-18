import React from 'react';
import { Flex, Link, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';

import UserMenu from './UserMenu';

const UserNavbar: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {user ? (
        <UserMenu />
      ) : (
        <Flex direction="column" align="center" color={'white'}>
          <Link
            fontSize="sm"
            onClick={() => {
              navigate(route.login());
              window.location.reload();
            }}
            aria-label="Login"
            color="white"
          >
            Login
          </Link>
          <Text fontSize="sm">or</Text>
          <Link
            fontSize="sm"
            onClick={() => {
              navigate(route.register());
              window.location.reload();
            }}
            aria-label="Register"
            color="white"
          >
            Register
          </Link>
        </Flex>
      )}
    </>
  );
};

export default UserNavbar;
