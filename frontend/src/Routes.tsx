import { Route, Routes as RouterRoutes } from 'react-router-dom';

import { LogInPage } from '@frontend/modules/auth/pages/LoginPage';
import { RegistrationPage } from '@frontend/modules/auth/pages/RegistrationPage';
import { HomePage } from '@frontend/modules/landingPage/pages/HomePage';
import { MyProjectsPage } from '@frontend/modules/myprojects/pages/MyProjectsPage';
import { MyProjectDetailPage } from '@frontend/modules/myprojects/pages/ProjectsDetailPage';
import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage';

import { ForgotPasswordPage } from './modules/auth/pages/ForgotPasswordPage';
import { NewPasswordPage } from './modules/auth/pages/NewPasswordPage';
import AboutUsPage from './modules/contact/AboutUsPage';
import { AcceptInvitationPage } from './modules/crewlist/pages/AcceptInvitationPage';
import { CrewListPage } from './modules/crewlist/pages/CrewListPage';
import { MyProjectSettingPage } from './modules/crewlist/pages/MyProjectSettingsPage';
import { DailyReportPage } from './modules/dailyreport/pages/DailyReportPage';
import { EditDepartmentsPage } from './modules/departments/pages/EditDepartmentsPage';
import { EditProjectPage } from './modules/editproject/pages/EditProjectPage';
import { CreateProjectPage } from './modules/myprojects/pages/CreateProjectPage';
import ProfileSettingsPage from './modules/profilesettings/pages/ProfileSettingsPage';
import { ShiftOverviewPage } from './modules/shiftoverview/pages/ShiftOverviewPage';
import { TimesheetPage } from './modules/timesheets/pages/TimesheetsPage';
import { ToCPage } from './modules/toc/TocPage';
import { route } from './route';

function Routes() {
  return (
    <RouterRoutes>
      <Route path={route.landingPage()} element={<HomePage />} />
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
      <Route
        path={route.dailyReports(':projectId')}
        element={<DailyReportPage />}
      />
      <Route
        path={route.dailyReports(':projectId', ':shootingDayId')}
        element={<DailyReportPage />}
      />
      <Route path={route.profileSettings()} element={<ProfileSettingsPage />} />
      <Route
        path={route.editDepartments(':projectId')}
        element={<EditDepartmentsPage />}
      />
      <Route
        path={route.shiftOverview(':projectId')}
        element={<ShiftOverviewPage />}
      />
    </RouterRoutes>
  );
}

export { Routes };
