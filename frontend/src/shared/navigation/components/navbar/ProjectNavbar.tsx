import React from 'react';
import { Button } from '@chakra-ui/react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';

import ProjectButtons from '@frontend/modules/myprojects/molecules/ProjectButtons';
import { route } from '@frontend/route';

import Navbar from './Navbar';

interface ProjectNavbarProps {
  projectId?: string;
  userRole?: string | null;
}

const CustomNavbar: React.FC<ProjectNavbarProps> = ({
  projectId,
  userRole,
}) => {
  const location = useLocation();

  return (
    <Navbar>
      <Button
        as={ReactRouterLink}
        to={route.myprojects()}
        variant="ghost"
        colorScheme="orange"
        textColor="white"
        aria-label="Button going to My Projects page"
        bg={
          location.pathname === route.myprojects()
            ? 'orange.600'
            : 'transparent'
        }
        color="white"
        _hover={{
          bg: 'orange.700',
          color: 'white',
          boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)',
        }}
        _active={{
          bg: 'orange.600',
          color: 'white',
          boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.3)',
        }}
      >
        My Projects
      </Button>
      {projectId && userRole && (
        <ProjectButtons
          projectId={projectId}
          activePath={location.pathname}
          userRole={userRole}
        />
      )}
    </Navbar>
  );
};

export default CustomNavbar;
