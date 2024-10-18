import { ElementRef, forwardRef } from 'react';
import {
  Link as ChakraLink,
  type LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';

export type NavLinkProps = ChakraLinkProps;

export const NavLink = forwardRef<ElementRef<typeof ChakraLink>, NavLinkProps>(
  function NavLink(props, ref) {
    return (
      <ChakraLink
        ref={ref}
        fontSize="sm"
        px="4"
        py="3"
        display="flex"
        alignItems="center"
        _hover={{
          bg: 'blackAlpha.400',
        }}
        _activeLink={{
          bg: 'blackAlpha.300',
          _hover: {
            bg: 'blackAlpha.400',
          },
        }}
        {...props}
      />
    );
  },
);
