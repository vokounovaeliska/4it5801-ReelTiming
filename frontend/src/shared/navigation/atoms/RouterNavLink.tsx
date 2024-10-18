import { ElementRef, forwardRef } from 'react';
import {
  NavLink as ReactRouterNavLink,
  type NavLinkProps as ReactRouterNavLinkProps,
} from 'react-router-dom';

import { NavLink, type NavLinkProps } from '@frontend/shared/design-system';

type Props = Omit<NavLinkProps, 'as'> & ReactRouterNavLinkProps;

export const RouterNavLink = forwardRef<
  ElementRef<typeof ReactRouterNavLink>,
  Props
>(function RouterNavLink(props, ref) {
  return <NavLink {...props} ref={ref} as={ReactRouterNavLink} />;
});
