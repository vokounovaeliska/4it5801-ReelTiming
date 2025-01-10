import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  breakpoints: {
    sm: '30em', // 480px
    md: '48em', // 768px
    lg: '62em', // 992px
    xl: '80em', // 1280px
    //'crew-nav': '58.25em', // 932px (vlastní breakpoint pro uživatelovu navigaci) ZATÍM V PROJEKTU NEPOUŽITO, ALE MŮŽE BÝT
    'dash-break': '55.56em', // Pro použití na dashboardu, aby se tabulka příliš neroztahovala
    'dash-break1': '50.31em', // Pro použití na dashboardu, aby se tam boxy nevystrkovaly
    'admin-nav': '79em', // 1092px (vlastní breakpoint pro adminovu navigaci)
  },
  styles: {
    global: {},
  },
  components: {},
});
