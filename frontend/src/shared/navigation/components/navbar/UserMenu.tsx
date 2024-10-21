import React from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';

const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <Menu>
      <MenuButton
        as={Button}
        colorScheme="orange"
        variant="ghost"
        px={4}
        py={2}
        transition="all 0.2s"
        _hover={{ bg: 'orange.700' }}
        _expanded={{ bg: 'orange.700' }}
        // _focus={{ boxShadow: 'outline' }}
      >
        <Flex align="center">
          <Avatar
            src={user?.profileImageUrl || ''}
            name={user?.name || 'Guest'}
            size="30px"
            boxSize={25}
            colorScheme="orange"
            bg={'orange.500'}
            mr={2}
          />
          <Text
            fontSize="sm"
            fontWeight="bold"
            color="white"
            mr={2}
            _hover={{ bg: 'orange.700', borderRadius: 'md', p: 1 }}
          >
            {user?.name || 'Guest'}
          </Text>
          <ChevronDownIcon color="white" />
        </Flex>
      </MenuButton>
      <MenuList bg="orange.600" borderColor="orange.600" color="white">
        {/*change when settings implemented */}
        <RouterLink to={route.myprojects()}>
          <MenuItem
            _hover={{ bg: 'orange.700' }}
            bgColor={'orange.600'}
            fontWeight="bold"
          >
            Settings
          </MenuItem>
        </RouterLink>
        {/*change when options implemented */}
        <RouterLink to={route.myprojects()}>
          <MenuItem
            _hover={{ bg: 'orange.700' }}
            bgColor={'orange.600'}
            fontWeight="bold"
          >
            Some Other Option
          </MenuItem>
        </RouterLink>
        <MenuDivider borderColor="white" />
        <RouterLink to={route.login()}>
          <MenuItem
            onClick={() => {
              signOut();
              navigate(route.login());
              //   window.location.reload();
            }}
            _hover={{ bg: 'orange.700' }}
            bgColor={'orange.600'}
            fontWeight="bold"
          >
            Logout
          </MenuItem>
        </RouterLink>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
