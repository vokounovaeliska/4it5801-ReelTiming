import React from 'react';
import { Image } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';

import defaultLogo from './logopng.png';

interface LogoProps {
  size?: string;
  projectLogo?: string;
}

const Logo: React.FC<LogoProps> = ({ size = '50px', projectLogo }) => {
  const { user } = useAuth();

  return (
    <ReactRouterLink to={user ? route.myprojects() : route.landingPage()}>
      <Image
        src={projectLogo ? `data:image/png;base64,${projectLogo}` : defaultLogo}
        alt="Logo"
        boxSize={size}
        mr={2}
      />
    </ReactRouterLink>
  );
};

export default Logo;
