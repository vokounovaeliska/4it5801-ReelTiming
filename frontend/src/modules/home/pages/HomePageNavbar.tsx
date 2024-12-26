import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  Image,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import { route } from '@frontend/route';
import { ReactRouterLink } from '@frontend/shared/navigation/atoms';

export default function HomePageNavbar() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        justify={'space-between'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex
          align="center"
          justify="center"
          display="flex"
          flexDirection="row"
        >
          <Box display="flex" alignItems="center">
            <Image
              src="/faviconlogo.png"
              alt="ReelTiming Logo"
              boxSize="30px"
              mr={2}
            />
            <Text
              fontSize={{ base: 'lg', md: 'xl' }} // Zvýšení velikosti písma pro název
              fontWeight="800"
              color="gray.600"
            >
              ReelTiming
            </Text>
          </Box>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          {/* Na mobilu se "Sign In" skryje a "Sign Up" zobrazuje */}
          <Button
            as={ReactRouterLink}
            to={route.register()} // změněno na 'Sign Up'
            display={{ base: 'inline-flex', md: 'none' }} // Zobrazí na mobilu
            fontSize={'md'}
            fontWeight={600}
            color={'white'}
            colorScheme="orange"
            bg="orange.500"
          >
            Sign Up
          </Button>

          {/* Na desktopu zůstává 'Sign In' s odpovídajícím vzhledem jako odkazy */}
          <Button
            as={ReactRouterLink}
            to={route.login()}
            display={{ base: 'none', md: 'inline-flex' }} // Zobrazí se pouze na desktopu
            fontSize={'md'}
            fontWeight={500} // Vypadá stejně jako položky v DesktopNav
            color={useColorModeValue('gray.600', 'gray.200')}
            _hover={{
              textDecoration: 'none',
              color: useColorModeValue('gray.800', 'white'),
            }}
            variant="link" // Stejný vzhled jako pro navigační odkazy
          >
            Sign In
          </Button>

          <Button
            as={ReactRouterLink}
            to={route.register()}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'md'}
            fontWeight={600}
            color={'white'}
            colorScheme="orange"
            bg="orange.500"
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Stack direction={'row'} spacing={6}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Box
            as="a"
            p={2}
            href={navItem.href ?? '#'}
            fontSize={'md'}
            fontWeight={500}
            color={linkColor}
            _hover={{
              textDecoration: 'none',
              color: linkHoverColor,
            }}
          >
            {navItem.label}
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, href }: NavItem) => {
  return (
    <Stack spacing={4}>
      <Box
        py={2}
        as="a"
        href={href ?? '#'}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
          fontSize="lg"
        >
          {label}
        </Text>
      </Box>
    </Stack>
  );
};

interface NavItem {
  label: string;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Features',
    href: '#features',
  },
  {
    label: 'Description',
    href: '#description',
  },
  {
    label: 'Get in Touch',
    href: '#get-in-touch',
  },
];
