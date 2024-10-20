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
};
