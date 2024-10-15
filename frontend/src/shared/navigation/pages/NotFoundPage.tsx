import { route } from '@frontend/route';
import { Box } from '@frontend/shared/design-system';

import { RouterLink } from '../atoms';
import { TopNavigation } from '../organisms/TopNavigation';

export function NotFoundPage() {
  return (
    <Box>
      <TopNavigation />
      <Box p="8">
        <Box>
          Page not found, please return to{' '}
          <RouterLink to={route.landingPage()}>Home</RouterLink>.
        </Box>
      </Box>
    </Box>
  );
}
