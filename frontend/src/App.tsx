import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '@frontend/modules/auth';
import { Routes } from '@frontend/Routes';
import { ChakraProvider, theme } from '@frontend/shared/design-system';
import { ScrollToTop } from '@frontend/shared/navigation/atoms';
import { EnhancedApolloProvider } from '@frontend/utils/apollo.tsx';

export function App() {
  useEffect(() => {
    document.title = 'ReelTiming';
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <EnhancedApolloProvider>
            <ScrollToTop />
            <Routes />
          </EnhancedApolloProvider>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}
