import { Route, Routes as RouterRoutes } from 'react-router-dom';

import { LogInPage } from '@frontend/modules/auth/pages/LoginPage';
import { RegistrationPage } from '@frontend/modules/auth/pages/RegistrationPage';
import { HelloPage } from '@frontend/modules/hello/pages/HelloPage';
import { HomePage } from '@frontend/modules/home/pages/HomePage';
import { MyProjectsPage } from '@frontend/modules/myprojects/MyProjectsPage';
import { MyProjectDetailPage } from '@frontend/modules/myprojects/pages/ProjectsDetailPage';
import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage';

import { ForgotPasswordPage } from './modules/auth/pages/ForgotPasswordPage';
import { NewPasswordPage } from './modules/auth/pages/NewPasswordPage';
import { CreateProjectPage } from './modules/myprojects/pages/CreateProjectPage';
import { ToCPage } from './modules/toc/TocPage';
import { route } from './route';

export function Routes() {
  return (
    <RouterRoutes>
      <Route path={route.landingPage()} element={<HomePage />} />
      <Route path={route.hello()} element={<HelloPage />} />
      <Route path={route.login()} element={<LogInPage />} />
      <Route path={route.register()} element={<RegistrationPage />} />
      <Route path={route.forgotPassword()} element={<ForgotPasswordPage />} />
      <Route path={route.myprojects()} element={<MyProjectsPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path={route.terms()} element={<ToCPage />} />
      <Route path={route.newPassword()} element={<NewPasswordPage />} />
      <Route path={route.createProject()} element={<CreateProjectPage />} />
      <Route
        path={route.projectDetail(':id')}
        element={<MyProjectDetailPage />}
      />
    </RouterRoutes>
  );
}
