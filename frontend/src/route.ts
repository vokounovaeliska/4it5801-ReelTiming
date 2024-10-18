export const route = {
  landingPage: () => `/`,
  hello: () => `/helloworld`,
  signUp: () => `/auth/signup`,
  login: () => `/auth/login`,
  register: () => `/auth/register`,
  forgotPassword: () => `/auth/forgot-password`,
  newPassword: () => `/auth/new-password`, //TODO, mozna tento odkaz nepotrebujeme, bude se generovat jen do emailu
  terms: () => `/term`,
  myprojects: () => `/myprojects`,
  createProject: () => `/create-project`,
};
