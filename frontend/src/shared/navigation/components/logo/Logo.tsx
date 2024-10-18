import React from 'react';
import { Image } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';

import logo from './logopng.png';

const Logo: React.FC = () => {
  const { user } = useAuth();
  return (
    <ReactRouterLink to={user ? route.myprojects() : route.landingPage()}>
      <Image src={logo} alt="Logo" boxSize="50px" mr={2} />
    </ReactRouterLink>
  );
};

export default Logo;
