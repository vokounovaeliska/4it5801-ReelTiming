import React from 'react';
import { Heading } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';

const AppHeading: React.FC = () => {
  const { user } = useAuth();
  return (
    <ReactRouterLink to={user ? route.myprojects() : route.landingPage()}>
      <Heading as="h1" size="md" color="white" mr={4}>
        ReelTiming
      </Heading>
    </ReactRouterLink>
  );
};

export default AppHeading;
