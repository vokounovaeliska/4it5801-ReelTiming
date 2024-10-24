import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Button,
  Collapse,
  Divider,
  Flex,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';

const UserMenuMobile: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false);

  const toggleUserSettings = () => {
    setIsUserSettingsOpen((prev) => !prev);
  };

  if (!user) return null;

  return (
    <Flex flexDirection="column" mt="auto">
      <Button
        onClick={toggleUserSettings}
        width="full"
        variant="ghost"
        rightIcon={
          isUserSettingsOpen ? (
            <ChevronUpIcon color={'orange'} />
          ) : (
            <ChevronDownIcon color={'orange'} />
          )
        }
        colorScheme="orange"
        _hover={{
          bg: 'orange.700',
          color: 'white',
        }}
      >
        <Flex align="center">
          <Avatar
            src={user.profileImageUrl || ''}
            name={user.name || 'User'}
            size="30px"
            boxSize={25}
            bg={'orange.500'}
            mr={2}
          />
          <Text fontSize="sm" fontWeight="bold" color="white">
            {user.name}
          </Text>
        </Flex>
      </Button>

      <Collapse in={isUserSettingsOpen}>
        <VStack spacing={2} mt={2} align="stretch">
          <Button
            as={ReactRouterLink}
            to={route.myprojects()}
            colorScheme="orange"
            onClick={() => navigate(route.myprojects())}
          >
            Settings
          </Button>
          <Button
            as={ReactRouterLink}
            to={route.myprojects()}
            colorScheme="orange"
            onClick={() => navigate(route.myprojects())}
          >
            Some other option
          </Button>
          <Divider />
          <Button
            colorScheme="orange"
            bgColor={'orange.700'}
            _hover={{ bg: 'orange.800' }}
            onClick={() => {
              signOut();
              navigate(route.login());
            }}
          >
            Logout
          </Button>
        </VStack>
      </Collapse>
    </Flex>
  );
};

export default UserMenuMobile;
