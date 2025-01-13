import { Route, Routes as RouterRoutes } from 'react-router-dom';

import { LogInPage } from '@frontend/modules/auth/pages/LoginPage';
import { RegistrationPage } from '@frontend/modules/auth/pages/RegistrationPage';
import { HelloPage } from '@frontend/modules/hello/pages/HelloPage';
import { HomePage } from '@frontend/modules/home/pages/HomePage';
import { MyProjectsPage } from '@frontend/modules/myprojects/pages/MyProjectsPage';
import { MyProjectDetailPage } from '@frontend/modules/myprojects/pages/ProjectsDetailPage';
import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage';

import { ForgotPasswordPage } from './modules/auth/pages/ForgotPasswordPage';
import { NewPasswordPage } from './modules/auth/pages/NewPasswordPage';
import AboutUsPage from './modules/contact/AboutUsPage';
import { AcceptInvitationPage } from './modules/crewlist/pages/AcceptInvitationPage';
import { CrewListPage } from './modules/crewlist/pages/CrewListPage';
import { EditDepartmentsPage } from './modules/crewlist/pages/EditDepartmentsPage';
import { MyProjectSettingPage } from './modules/crewlist/pages/MyProjectSettingsPage';
import { DailyReportPage } from './modules/dailyreport/pages/DailyReportPage';
// import { CrewListPage2 } from './modules/crewlist/pages/CrewListPage2';
import { EditProjectPage } from './modules/editproject/pages/EditProjectPage';
import { CreateProjectPage } from './modules/myprojects/pages/CreateProjectPage';
import ProfileSettingsPage from './modules/profilesettings/pages/ProfileSettingsPage';
import { TimesheetPage } from './modules/timesheets/pages/TimesheetsPage';
import { ToCPage } from './modules/toc/TocPage';
import { route } from './route';

function Routes() {
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
      <Route path={route.about()} element={<AboutUsPage />} />
      <Route path={route.crewList(':projectId')} element={<CrewListPage />} />
      <Route
        path={route.myProjectSettings(':projectId')}
        element={<MyProjectSettingPage />}
      />
      <Route
        path={route.timesheets(':projectId')}
        element={<TimesheetPage />}
      />
      <Route
        path={route.editprojectpage(':projectId')}
        element={<EditProjectPage />}
      />
      <Route
        path={route.projectDetail(':id')}
        element={<MyProjectDetailPage />}
      />
      <Route
        path={route.acceptInvitation()}
        element={<AcceptInvitationPage />}
      />
      <Route path={route.dailyReports()} element={<DailyReportPage />} />
      <Route path={route.profileSettings} element={<ProfileSettingsPage />} />
      <Route
        path={route.editDepartments(':projectId')}
        element={<EditDepartmentsPage />}
      />
    </RouterRoutes>
  );
}

export { Routes };
