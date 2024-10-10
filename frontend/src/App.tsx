import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '@frontend/modules/auth';
import { Routes } from '@frontend/Routes';
import { ChakraProvider, theme } from '@frontend/shared/design-system';
import { ScrollToTop } from '@frontend/shared/navigation/atoms';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar'; // Adjust path as necessary
import { EnhancedApolloProvider } from '@frontend/utils/apollo.tsx';

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <EnhancedApolloProvider>
            <ScrollToTop />
            <Navbar />
            <Routes />
          </EnhancedApolloProvider>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}
