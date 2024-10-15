import { Route, Routes as RouterRoutes } from 'react-router-dom';

import { LogInPage } from '@frontend/modules/auth/pages/LoginPage';
import { RegistrationPage } from '@frontend/modules/auth/pages/RegistrationPage';
// import { SignUpPage } from '@frontend/modules/auth/pages/SignUpPage';
import { HelloPage } from '@frontend/modules/hello/pages/HelloPage';
import { HomePage } from '@frontend/modules/home/pages/HomePage';
import MyProjectsPage from '@frontend/modules/myprojects/MyProjectsPage';
import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage';

import { ForgotPasswordPage } from './modules/auth/pages/ForgotPasswordPage';
import { ToCPage } from './modules/toc/TocPage';
import { route } from './route';

export function Routes() {
  return (
    <RouterRoutes>
      <Route path={route.home()} element={<HomePage />} />
      <Route path={route.hello()} element={<HelloPage />} />
      <Route path={route.login()} element={<LogInPage />} />
      <Route path={route.register()} element={<RegistrationPage />} />
      <Route path={route.forgotPassword()} element={<ForgotPasswordPage />} />
      <Route path={route.myprojects()} element={<MyProjectsPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path={route.terms()} element={<ToCPage />} />
    </RouterRoutes>
  );
}
