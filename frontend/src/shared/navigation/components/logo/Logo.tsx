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

const decodeBase64 = (str: string) => {
  try {
    return decodeURIComponent(
      atob(str)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
  } catch (e) {
    console.error('Failed to decode base64 string', e);
    return str;
  }
};

const Logo: React.FC<LogoProps> = ({ size = '50px', projectLogo }) => {
  const { user } = useAuth();
  const decodedLogo = projectLogo ? decodeBase64(projectLogo) : null;

  return (
    <ReactRouterLink to={user ? route.myprojects() : route.landingPage()}>
      <Image
        src={
          decodedLogo ? `data:image/jpeg;base64,${decodedLogo}` : defaultLogo
        }
        alt="Logo"
        boxSize={projectLogo ? 'auto' : size}
        mr={2}
      />
    </ReactRouterLink>
  );
};

export default Logo;
