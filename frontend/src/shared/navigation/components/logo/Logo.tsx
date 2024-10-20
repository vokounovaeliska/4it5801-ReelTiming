import React from 'react';
import { Image } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';

import logo from './logopng.png';

interface LogoProps {
  size?: string; // Optional size prop
}

const Logo: React.FC<LogoProps> = ({ size = '50px' }) => {
  const { user } = useAuth();

  return (
    <ReactRouterLink to={user ? route.myprojects() : route.landingPage()}>
      <Image src={logo} alt="Logo" boxSize={size} mr={2} />
    </ReactRouterLink>
  );
};

export default Logo;
