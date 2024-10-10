import { Route, Routes as RouterRoutes } from 'react-router-dom';

import LoginPage from '@frontend/modules/auth/pages/LoginPage';
import { SignInPage } from '@frontend/modules/auth/pages/SignInPage';
import { SignUpPage } from '@frontend/modules/auth/pages/SignUpPage';
import { HelloPage } from '@frontend/modules/hello/pages/HelloPage';
import { HomePage } from '@frontend/modules/home/pages/HomePage';
import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage';

import { route } from './route';

export function Routes() {
  return (
    <RouterRoutes>
      <Route path={route.home()} element={<HomePage />} />
      <Route path={route.hello()} element={<HelloPage />} />
      <Route path={route.signIn()} element={<SignInPage />} />
      <Route path={route.signUp()} element={<SignUpPage />} />
      <Route path={route.login()} element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
}
