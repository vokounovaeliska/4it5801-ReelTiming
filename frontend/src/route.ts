export const route = {
  landingPage: () => `/`,
  hello: () => `/helloworld`,
  signUp: () => `/auth/signup`,
  login: () => `/auth/login`,
  register: () => `/auth/register`,
  forgotPassword: () => `/auth/forgot-password`,
  newPassword: () => `/auth/new-password`,
  terms: () => `/term`,
  myprojects: () => `/myprojects`,
  createProject: () => `/create-project`,
  about: () => `/about`,
  projectDetail: (id: string = ':id') => `/projects/${id}`,
  crewList: (projectId: string = ':projectId') =>
    `/projects/${projectId}/crewlist`,
  myProjectSettings: (projectId: string = ':projectId') =>
    `/projects/${projectId}/myProjectSettings`,
  timesheets: (projectId: string = ':projectId') =>
    `/projects/${projectId}/timesheets`,
  editprojectpage: (projectId: string = ':projectId') =>
    `/projects/${projectId}/edit`,
  acceptInvitation: () => `/accept-invitation`,
  profileSettings: '/profile-settings',
};
