import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(
    function scrollToTopOnPathnameChange() {
      if (import.meta.env.NODE_ENV === 'test') {
        return;
      }
      window.scrollTo(0, 0);
    },
    [pathname],
  );

  return null;
}
