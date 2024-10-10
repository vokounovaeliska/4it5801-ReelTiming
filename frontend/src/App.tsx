import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '@frontend/modules/auth';
import { Routes } from '@frontend/Routes';
import { ChakraProvider, Flex, theme } from '@frontend/shared/design-system';
import { ScrollToTop } from '@frontend/shared/navigation/atoms';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';
import { EnhancedApolloProvider } from '@frontend/utils/apollo.tsx';

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <EnhancedApolloProvider>
            <ScrollToTop />
            <Flex direction="column" minHeight="100vh">
              <Navbar />
              <Flex as="main" flex="1" direction="column">
                <Routes />
              </Flex>
              <Footer />
            </Flex>
          </EnhancedApolloProvider>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}
