/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  mutation ActivateProjectUser($userId: String!, $token: String!) {\n    activateProjectUser(userId: $userId, token: $token)\n  }\n':
    types.ActivateProjectUserDocument,
  '\n  mutation AddCar(\n    $kilometerRate: Float!\n    $kilometerAllow: Float!\n    $name: String!\n    $projectUserId: String!\n  ) {\n    addCar(\n      kilometer_rate: $kilometerRate\n      kilometer_allow: $kilometerAllow\n      name: $name\n      project_user_id: $projectUserId\n    ) {\n      name\n      projectUser {\n        id\n      }\n    }\n  }\n':
    types.AddCarDocument,
  '\n  mutation DeleteCar($deleteCarId: String!) {\n    deleteCar(id: $deleteCarId)\n  }\n':
    types.DeleteCarDocument,
  '\n  mutation UpdateCar($data: CarInput!, $updateCarId: String!) {\n    updateCar(data: $data, id: $updateCarId) {\n      kilometer_allow\n      kilometer_rate\n      name\n      id\n    }\n  }\n':
    types.UpdateCarDocument,
  '\n  mutation AddDailyReport($footer: [ReportItemInput!]!, $shootingProgress: [ReportItemInput!]!, $intro: [ReportItemInput!]!, $projectId: String!, $shootingDayId: String!) {\n  addDailyReport(footer: $footer, shooting_progress: $shootingProgress, intro: $intro, projectId: $projectId, shooting_day_id: $shootingDayId) {\n    id\n    intro {\n      title\n      value\n    }\n    shooting_progress {\n            title\n      value\n    }\n    footer {\n            title\n      value\n    }\n    create_date\n    last_update_date\n    project {\n      id\n      name\n    }\n    shootingDay {\n      id\n      date\n      shooting_day_number\n    }\n  }\n}\n':
    types.AddDailyReportDocument,
  '\n  mutation AddProject(\n    $productionCompany: String!\n    $name: String!\n    $endDate: DateTimeISO\n    $startDate: DateTimeISO\n    $description: String\n    $create_user_id: String\n    $currency: String\n  ) {\n    addProject(\n      production_company: $productionCompany\n      name: $name\n      end_date: $endDate\n      start_date: $startDate\n      description: $description\n      create_user_id: $create_user_id\n      currency: $currency\n    ) {\n      id\n      name\n      production_company\n      description\n      start_date\n      end_date\n      create_date\n      create_user_id\n      last_update_user_id\n      last_update_date\n      is_active\n      currency\n      departments {\n        id\n        name\n      }\n    }\n  }\n':
    types.AddProjectDocument,
  '\n  mutation AddProjectUser(\n    $projectId: String!\n    $isTeamLeader: Boolean!\n    $rateId: String\n    $departmentId: String\n    $role: String!\n    $invitation: String\n    $phone_number: String\n    $email: String!\n    $name: String!\n    $surname: String!\n    $position: String\n  ) {\n    addProjectUser(\n      projectId: $projectId\n      isTeamLeader: $isTeamLeader\n      rateId: $rateId\n      departmentId: $departmentId\n      role: $role\n      invitation: $invitation\n      phone_number: $phone_number\n      email: $email\n      name: $name\n      surname: $surname\n      position: $position\n    ) {\n      id\n      project {\n        id\n      }\n      is_team_leader\n      role\n      rate{\n        id\n      }\n    }\n  }\n':
    types.AddProjectUserDocument,
  '\n  mutation AddRate(\n    $standardRate: Float!\n    $compensationRate: Float!\n    $overtimeHour1: Float!\n    $overtimeHour2: Float!\n    $overtimeHour3: Float!\n    $overtimeHour4: Float!\n  ) {\n    addRate(\n      standard_rate: $standardRate\n      compensation_rate: $compensationRate\n      overtime_hour1: $overtimeHour1\n      overtime_hour2: $overtimeHour2\n      overtime_hour3: $overtimeHour3\n      overtime_hour4: $overtimeHour4\n    ) {\n      id\n    }\n  }\n':
    types.AddRateDocument,
  '\n  mutation AddShiftOverview($projectId: String!, $date: DateTimeISO!, $crewWorking: [CrewInput!]!) {\n  addShiftOverview(projectId: $projectId, date: $date, crew_working: $crewWorking) {\n    id\n    date\n    crew_working {\n      id\n    }\n  }\n}\n':
    types.AddShiftOverviewDocument,
  '\n    mutation AddShootingDay(\n        $projectId: String!, \n        $date: DateTimeISO!, \n        $shootingDayNumber: Float!, \n        $eventType: String\n    ) {\n        addShootingDay(\n            projectId: $projectId,\n            date: $date,\n            shootingDayNumber: $shootingDayNumber,\n            eventType: $eventType\n        ) {\n            project{\n                id\n            }\n        }\n    }\n':
    types.AddShootingDayDocument,
  '\n  mutation AddStatement(\n    $project_user_id: String!\n    $start_date: DateTimeISO!\n    $from: DateTimeISO!\n    $to: DateTimeISO!\n    $shift_lenght: Float!\n    $calculated_overtime: Float\n    $claimed_overtime: Float\n    $car_id: String\n    $kilometers: Float\n  ) {\n    addStatement(\n      project_user_id: $project_user_id\n      start_date: $start_date\n      from: $from\n      to: $to\n      shift_lenght: $shift_lenght\n      calculated_overtime: $calculated_overtime\n      claimed_overtime: $claimed_overtime\n      car_id: $car_id\n      kilometers: $kilometers\n    ) {\n      id\n      projectUser {\n        id\n        user {\n          id\n          name\n          surname\n        }\n      }\n      start_date\n      from\n      to\n      shift_lenght\n      calculated_overtime\n      claimed_overtime\n      create_date\n    }\n  }\n':
    types.AddStatementDocument,
  '\n  mutation DeleteInvitation($projectUserId: String!) {\n    deleteInvitation(projectUserId: $projectUserId)\n  }\n':
    types.DeleteInvitationDocument,
  '\nmutation DeleteShiftOverview($shiftOverviewId: String!) {\n    deleteShiftOverview(shiftOverviewId: $shiftOverviewId)\n  }\n':
    types.DeleteShiftOverviewDocument,
  '\n    mutation DeleteShootingDay($shootingDayId: String!) {\n        deleteShootingDay(shootingDayId: $shootingDayId)\n    }\n':
    types.DeleteShootingDayDocument,
  '\n  mutation DeleteStatement($id: String!) {\n    deleteStatement(id: $id)\n  }\n':
    types.DeleteStatementDocument,
  '\nmutation EditDailyReport($data: DailyReportInput!, $dailyReportId: String!) {\n    updateDailyReport(data: $data, dailyReportId: $dailyReportId) {\n      id\n      \n    }\n  }\n':
    types.EditDailyReportDocument,
  '\n    mutation EditProject($data: ProjectInput!, $projectId: String!){\n        updateProject(data: $data, projectId: $projectId){\n            description,\n            name,\n            production_company,\n            end_date,\n            is_active,\n            last_update_user_id,\n            currency,\n            # start_date\n        }\n    } \n':
    types.EditProjectDocument,
  '\n  mutation EditProjectUser($data: ProjectUserInput!, $updateProjectUserId: String!) {\n    updateProjectUser(data: $data, id: $updateProjectUserId) {\n      id\n    }\n  }\n':
    types.EditProjectUserDocument,
  '\n  mutation EditRate($data: RateInput!, $rateId: String!) {\n    updateRate(data: $data, rateId: $rateId) {\n      id\n      standard_rate\n      overtime_hour1\n      overtime_hour2\n      overtime_hour3\n      overtime_hour4\n      compensation_rate\n    }\n  }\n':
    types.EditRateDocument,
  '\nmutation EditShiftOverview($shiftOverviewId: String!, $data: ShiftOverviewInput!) {\n  updateShiftOverview(shiftOverviewId: $shiftOverviewId, data: $data) {\n    id\n    date\n    crew_working {\n      id\n    }\n  }\n}\n':
    types.EditShiftOverviewDocument,
  '\n    mutation UpdateShootingDay(\n        $data: ShootingDayInput!,\n        $shootingDayId: String!\n    ) {\n        updateShootingDay(\n            data: $data,\n            shootingDayId: $shootingDayId\n        ) {\n            project {\n                id\n            }\n        }\n}\n':
    types.UpdateShootingDayDocument,
  '\n  mutation UpdateStatement($id: String!, $data: StatementInput!) {\n    updatestatement(id: $id, data: $data) {\n      id\n      projectUser {\n        id\n      }\n      start_date\n      from\n      to\n      shift_lenght\n      calculated_overtime\n      claimed_overtime\n      create_date\n      last_update_date\n      create_user_id\n      last_update_user_id\n      kilometers\n    }\n  }\n':
    types.UpdateStatementDocument,
  '\n  mutation EditUser($data: UserInput!, $userId: String!) {\n    updateUser(data: $data, userId: $userId) {\n      id\n      name\n      surname\n      email\n      is_active\n    }\n  }\n':
    types.EditUserDocument,
  '\n  mutation InviteUserToProject(\n    $email: String!\n    $name: String!\n    $projectUserId: String!\n  ) {\n    inviteUser(email: $email, name: $name, projectUserId: $projectUserId)\n  }\n':
    types.InviteUserToProjectDocument,
  '\n  mutation UpdateAndActivateProjectUser(\n    $data: ProjectUserInput!\n    $updateProjectUserId: String!\n    $updateRateData: RateInput!\n    $rateId: String!\n  ) {\n    updateRate(data: $updateRateData, rateId: $rateId) {\n      compensation_rate\n      overtime_hour1\n      overtime_hour2\n      overtime_hour3\n      overtime_hour4\n      standard_rate\n    }\n    updateProjectUser(data: $data, id: $updateProjectUserId) {\n      id\n      position\n      number_of_people\n      is_team_leader\n      name\n      surname\n      email\n      create_date\n      create_user_id\n      last_update_user_id\n      last_update_date\n      is_active\n      role\n      invitation\n      phone_number\n    }\n  }\n':
    types.UpdateAndActivateProjectUserDocument,
  '\n  mutation UpdateUser($data: UserInput!, $userId: String!) {\n    updateUser(data: $data, userId: $userId) {\n      name\n      surname\n      phone_number\n      email\n      last_update_date\n    }\n  }\n':
    types.UpdateUserDocument,
  '\n  mutation DeleteProjectUser($projectUserId: String!) {\n    deleteProjectUser(projectUserId: $projectUserId)\n  }\n':
    types.DeleteProjectUserDocument,
  '\n  query Quacks {\n    _empty\n  }\n': types.QuacksDocument,
  '\n  query GetAllCarsOnProjectByProjectUserId($projectId: String!) {\n    projectUsers(projectId: $projectId) {\n      id\n      name\n      surname\n      car {\n        id\n        name\n        kilometer_allow\n        kilometer_rate\n      }\n      statement {\n        id\n        kilometers\n        car {\n          id\n          kilometer_allow\n          kilometer_rate\n          name\n        }\n      }\n    }\n  }\n':
    types.GetAllCarsOnProjectByProjectUserIdDocument,
  '\n  query GetAllProjectUsers($projectId: String!) {\n    projectUsers(projectId: $projectId) {\n      id\n      name\n      surname\n      car {\n        id\n        name\n        kilometer_allow\n        kilometer_rate\n      }\n      rate {\n        compensation_rate\n        standard_rate\n        overtime_hour1\n        overtime_hour2\n        overtime_hour3\n        overtime_hour4\n      }\n    }\n  }\n':
    types.GetAllProjectUsersDocument,
  '\n  query GetCarsByProjectUserId($projectUserId: String!) {\n    carsByProjectUserId(projectUserId: $projectUserId) {\n      id\n      name\n      kilometer_allow\n      kilometer_rate\n      create_user_id\n      last_update_user_id\n      last_update_date\n      create_date\n    }\n  }\n':
    types.GetCarsByProjectUserIdDocument,
  '\n  query GetCrewListInfo($projectId: String!, $userId: String!) {\n    project(id: $projectId) {\n      id\n      name\n      start_date\n      end_date\n      production_company\n      is_active\n      create_date\n      create_user_id\n      last_update_date\n      last_update_user_id\n      currency\n    }\n    departments(projectId: $projectId) {\n      id\n      name\n    }\n    projectUsers(projectId: $projectId) {\n      id\n      is_active\n      position\n      user {\n        id\n      }\n      rate {\n        id\n        compensation_rate\n        create_date\n        create_user_id\n        last_update_date\n        last_update_user_id\n        overtime_hour1\n        overtime_hour2\n        overtime_hour3\n        overtime_hour4\n        standard_rate\n      }\n      invitation\n      role\n      phone_number\n      department {\n        name\n        id\n      }\n      email\n      name\n      surname\n    }\n    userRoleInProject(projectId: $projectId, userId: $userId)\n  }\n':
    types.GetCrewListInfoDocument,
  '\n  query GetProjectUserDetails($userId: String!, $projectId: String!) {\n    projectUserDetails(userId: $userId, projectId: $projectId) {\n      project {\n        id\n        name\n        currency\n      }\n      id\n      name\n      surname\n      email\n    }\n  }\n':
    types.GetProjectUserDetailsDocument,
  '\n  query GetDailyReportByShootingDay($shootingDayId: String!) {\n    shootingDay(id: $shootingDayId) {\n      id\n      dailyReport {\n        id\n        intro {\n          title\n          value\n        }\n        shooting_progress {\n          title\n          value       \n        }\n        footer {\n          title\n          value\n        }\n      }\n    }\n  }\n':
    types.GetDailyReportByShootingDayDocument,
  '\n  query DailyReportPreviewInfo($date: DateTimeISO!, $projectId: String!, $shootingDayId: String!) {\n  statementsByProjectIdAndDate(date: $date, projectId: $projectId) {\n    id\n    start_date\n    from\n    to\n    claimed_overtime\n    projectUser {\n      name\n      surname\n      position\n      department {\n        id\n        name\n        order_index\n        is_visible\n      }\n    }\n  }\n  project(id: $projectId) {\n    id\n    name\n    production_company\n    currency\n    shootingDays {\n      id\n    }\n  }\n  shootingDay(id: $shootingDayId) {\n    id\n    shooting_day_number\n    date\n    dailyReport {\n      id\n      intro {\n        title\n        value\n      }\n      shooting_progress {\n        title\n        value\n      }\n      footer {\n        title\n        value\n      }\n    }\n  }\n}\n':
    types.DailyReportPreviewInfoDocument,
  '\n  query Departments($projectId: String!) {\n    departments(projectId: $projectId) {\n      id\n      name\n    }\n  }\n':
    types.DepartmentsDocument,
  '\nquery LastDailyReportByProjectId($projectId: String!) {\n  lastDailyReportByProjectId(projectId: $projectId) {\n    id\n    intro {\n      title\n      value\n    }\n    shooting_progress {\n      title\n      value\n    }\n    footer {\n      title\n      value\n    }\n    create_date\n    last_update_date\n    shootingDay {\n      id\n      shooting_day_number\n      date\n    }\n  }\n}\n':
    types.LastDailyReportByProjectIdDocument,
  '\n  query GetProjectByProjectUserToken($token: String!) {\n    projectUsersByToken(token: $token) {\n      project {\n        name\n      }\n    }\n  }\n':
    types.GetProjectByProjectUserTokenDocument,
  '\n  query GetProjectDetail($id: String!) {\n    project(id: $id) {\n      id\n      name\n      description\n      start_date\n      end_date\n      production_company\n      is_active\n      create_date\n      create_user_id\n      last_update_date\n      last_update_user_id\n      currency\n      projectUsers {\n      id\n    }\n    }\n  }\n':
    types.GetProjectDetailDocument,
  '\n  query GetProjectUserByToken($token: String!) {\n    projectUsersByToken(token: $token) {\n      id\n      position\n      name\n      surname\n      email\n      is_active\n      role\n      invitation\n      phone_number\n      project {\n        id\n        name\n        description\n        currency\n      }\n      rate {\n        standard_rate\n        overtime_hour1\n        overtime_hour2\n        overtime_hour3\n        overtime_hour4\n        compensation_rate\n        id\n      }\n      department {\n        id\n        name\n      }\n    }\n  }\n':
    types.GetProjectUserByTokenDocument,
  '\n  query ProjectUsers($projectId: String!) {\n    projectUsers(projectId: $projectId) {\n      id\n      is_active\n      position\n      department {\n        name\n        id\n      }\n      user {\n        name\n        surname\n        email\n        id\n      }\n      rate {\n        id\n      }\n      invitation\n      role\n      phone_number\n    }\n  }\n':
    types.ProjectUsersDocument,
  '\n  query ProjectUser($token: String!) {\n    projectUsersByToken(token: $token) {\n      id\n      position\n      role\n      phone_number\n      project {\n        id\n        name\n        description\n      }\n      user {\n        id\n        name\n        surname\n        email\n      }\n      rate {\n        standard_rate\n        overtime_hour1\n        overtime_hour2\n        overtime_hour3\n        overtime_hour4\n      }\n      department {\n        id\n        name\n      }\n    }\n  }\n':
    types.ProjectUserDocument,
  '\n  query GetProjects {\n    projects {\n      id\n      name\n      description\n    }\n  }\n':
    types.GetProjectsDocument,
  '\n    query GetShiftOverviewPageData($projectId: String!, ){\n  projectUsers(projectId: $projectId) {\n    id\n    name\n    surname\n    email\n    position\n    department {\n      id\n      name\n      order_index\n    }\n    statement {\n      id\n      start_date\n      from\n      to\n    }\n  }\n  shootingDaysByProject(projectId: $projectId) {\n    id\n    shooting_day_number\n    date\n  }\n  shiftOverviewsByProjectId(projectId: $projectId) {\n    id\n    date\n    crew_working {\n      id\n    }\n  }\n  project(id: $projectId) {\n    id\n    name\n    start_date\n    end_date\n  }\n}\n':
    types.GetShiftOverviewPageDataDocument,
  '\n    query ShootingDaysByProject($projectId: String!) {\n        shootingDaysByProject(projectId: $projectId) {\n            id\n            date\n            shooting_day_number\n            event_type\n        }\n    }\n':
    types.ShootingDaysByProjectDocument,
  '\n  query GetShootingDaysByProject($projectId: String!) {\n    shootingDaysByProject(projectId: $projectId) {\n      id\n      shooting_day_number\n      date\n      event_type\n      dailyReport {\n      id\n      intro {\n        title\n        value\n      }\n      shooting_progress {\n        title\n        value       \n      }\n      footer {\n        title\n        value\n      }\n    }\n    }\n  }\n':
    types.GetShootingDaysByProjectDocument,
  '\n  query GetCrewStatements($projectUserId: String!) {\n    statementsByProjectUserId(projectUserId: $projectUserId) {\n      id\n      projectUser {\n        id\n        name\n        surname\n        email\n        rate {\n          compensation_rate\n          standard_rate\n          overtime_hour1\n          overtime_hour2\n          overtime_hour3\n          overtime_hour4\n        }\n      }\n      start_date\n      from\n      to\n      shift_lenght\n      calculated_overtime\n      claimed_overtime\n      create_date\n      car {\n        id\n        kilometer_allow\n        kilometer_rate\n        name\n      }\n      kilometers\n    }\n  }\n':
    types.GetCrewStatementsDocument,
  '\n  query GetAdminStatements($projectId: String!) {\n    statementsByProjectId(projectId: $projectId) {\n      id\n      projectUser {\n        id\n        name\n        surname\n        email\n        rate {\n          compensation_rate\n          standard_rate\n          overtime_hour1\n          overtime_hour2\n          overtime_hour3\n          overtime_hour4\n        }\n      }\n      start_date\n      from\n      to\n      shift_lenght\n      calculated_overtime\n      claimed_overtime\n      create_date\n      car {\n        id\n        kilometer_allow\n        kilometer_rate\n        name\n      }\n      kilometers\n    }\n  }\n  ':
    types.GetAdminStatementsDocument,
  '\n  query CarStatementsByProjectId($projectId: String!) {\n    carStatementsByProjectId(projectId: $projectId) {\n      car_id\n      kilometers\n    }\n  }\n  ':
    types.CarStatementsByProjectIdDocument,
  '\n  query GetUserProfileSettingsInfo($userId: String!) {\n    user(id: $userId) {\n      id\n      name\n      surname\n      email\n      phone_number\n      last_update_date\n      create_date\n    }\n  }\n':
    types.GetUserProfileSettingsInfoDocument,
  '\n  query GetUserProjects($userId: String!) {\n    userProjects(userId: $userId) {\n      id\n      name\n      description\n    }\n  }\n\n':
    types.GetUserProjectsDocument,
  '\n  query GetUserRoleInProject($userId: String!, $projectId: String!) {\n    userRoleInProject(userId: $userId, projectId: $projectId)\n  }\n':
    types.GetUserRoleInProjectDocument,
  '\n  fragment ProjectBasicInfo on Project {\n    id\n    name\n    description\n  }\n':
    types.ProjectBasicInfoFragmentDoc,
  '\n  mutation ForgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n':
    types.ForgotPasswordDocument,
  '\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      user {\n        id\n        name\n        email\n        surname\n      }\n      token\n    }\n  }\n':
    types.SignInDocument,
  '\n  mutation ResetPassword($newPassword: String!, $token: String!) {\n    resetPassword(newPassword: $newPassword, token: $token) {\n      user {\n        id\n        name\n        surname\n        email\n      }\n      token\n    }\n  }\n':
    types.ResetPasswordDocument,
  '\n  mutation SignUp(\n    $email: String!\n    $name: String!\n    $surname: String!\n    $password: String!\n  ) {\n    signUp(email: $email, name: $name, surname: $surname, password: $password) {\n      user {\n        id\n        name\n        email\n        surname\n      }\n      token\n    }\n  }\n':
    types.SignUpDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation ActivateProjectUser($userId: String!, $token: String!) {\n    activateProjectUser(userId: $userId, token: $token)\n  }\n',
): (typeof documents)['\n  mutation ActivateProjectUser($userId: String!, $token: String!) {\n    activateProjectUser(userId: $userId, token: $token)\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation AddCar(\n    $kilometerRate: Float!\n    $kilometerAllow: Float!\n    $name: String!\n    $projectUserId: String!\n  ) {\n    addCar(\n      kilometer_rate: $kilometerRate\n      kilometer_allow: $kilometerAllow\n      name: $name\n      project_user_id: $projectUserId\n    ) {\n      name\n      projectUser {\n        id\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation AddCar(\n    $kilometerRate: Float!\n    $kilometerAllow: Float!\n    $name: String!\n    $projectUserId: String!\n  ) {\n    addCar(\n      kilometer_rate: $kilometerRate\n      kilometer_allow: $kilometerAllow\n      name: $name\n      project_user_id: $projectUserId\n    ) {\n      name\n      projectUser {\n        id\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DeleteCar($deleteCarId: String!) {\n    deleteCar(id: $deleteCarId)\n  }\n',
): (typeof documents)['\n  mutation DeleteCar($deleteCarId: String!) {\n    deleteCar(id: $deleteCarId)\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateCar($data: CarInput!, $updateCarId: String!) {\n    updateCar(data: $data, id: $updateCarId) {\n      kilometer_allow\n      kilometer_rate\n      name\n      id\n    }\n  }\n',
): (typeof documents)['\n  mutation UpdateCar($data: CarInput!, $updateCarId: String!) {\n    updateCar(data: $data, id: $updateCarId) {\n      kilometer_allow\n      kilometer_rate\n      name\n      id\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation AddDailyReport($footer: [ReportItemInput!]!, $shootingProgress: [ReportItemInput!]!, $intro: [ReportItemInput!]!, $projectId: String!, $shootingDayId: String!) {\n  addDailyReport(footer: $footer, shooting_progress: $shootingProgress, intro: $intro, projectId: $projectId, shooting_day_id: $shootingDayId) {\n    id\n    intro {\n      title\n      value\n    }\n    shooting_progress {\n            title\n      value\n    }\n    footer {\n            title\n      value\n    }\n    create_date\n    last_update_date\n    project {\n      id\n      name\n    }\n    shootingDay {\n      id\n      date\n      shooting_day_number\n    }\n  }\n}\n',
): (typeof documents)['\n  mutation AddDailyReport($footer: [ReportItemInput!]!, $shootingProgress: [ReportItemInput!]!, $intro: [ReportItemInput!]!, $projectId: String!, $shootingDayId: String!) {\n  addDailyReport(footer: $footer, shooting_progress: $shootingProgress, intro: $intro, projectId: $projectId, shooting_day_id: $shootingDayId) {\n    id\n    intro {\n      title\n      value\n    }\n    shooting_progress {\n            title\n      value\n    }\n    footer {\n            title\n      value\n    }\n    create_date\n    last_update_date\n    project {\n      id\n      name\n    }\n    shootingDay {\n      id\n      date\n      shooting_day_number\n    }\n  }\n}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation AddProject(\n    $productionCompany: String!\n    $name: String!\n    $endDate: DateTimeISO\n    $startDate: DateTimeISO\n    $description: String\n    $create_user_id: String\n    $currency: String\n  ) {\n    addProject(\n      production_company: $productionCompany\n      name: $name\n      end_date: $endDate\n      start_date: $startDate\n      description: $description\n      create_user_id: $create_user_id\n      currency: $currency\n    ) {\n      id\n      name\n      production_company\n      description\n      start_date\n      end_date\n      create_date\n      create_user_id\n      last_update_user_id\n      last_update_date\n      is_active\n      currency\n      departments {\n        id\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation AddProject(\n    $productionCompany: String!\n    $name: String!\n    $endDate: DateTimeISO\n    $startDate: DateTimeISO\n    $description: String\n    $create_user_id: String\n    $currency: String\n  ) {\n    addProject(\n      production_company: $productionCompany\n      name: $name\n      end_date: $endDate\n      start_date: $startDate\n      description: $description\n      create_user_id: $create_user_id\n      currency: $currency\n    ) {\n      id\n      name\n      production_company\n      description\n      start_date\n      end_date\n      create_date\n      create_user_id\n      last_update_user_id\n      last_update_date\n      is_active\n      currency\n      departments {\n        id\n        name\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation AddProjectUser(\n    $projectId: String!\n    $isTeamLeader: Boolean!\n    $rateId: String\n    $departmentId: String\n    $role: String!\n    $invitation: String\n    $phone_number: String\n    $email: String!\n    $name: String!\n    $surname: String!\n    $position: String\n  ) {\n    addProjectUser(\n      projectId: $projectId\n      isTeamLeader: $isTeamLeader\n      rateId: $rateId\n      departmentId: $departmentId\n      role: $role\n      invitation: $invitation\n      phone_number: $phone_number\n      email: $email\n      name: $name\n      surname: $surname\n      position: $position\n    ) {\n      id\n      project {\n        id\n      }\n      is_team_leader\n      role\n      rate{\n        id\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation AddProjectUser(\n    $projectId: String!\n    $isTeamLeader: Boolean!\n    $rateId: String\n    $departmentId: String\n    $role: String!\n    $invitation: String\n    $phone_number: String\n    $email: String!\n    $name: String!\n    $surname: String!\n    $position: String\n  ) {\n    addProjectUser(\n      projectId: $projectId\n      isTeamLeader: $isTeamLeader\n      rateId: $rateId\n      departmentId: $departmentId\n      role: $role\n      invitation: $invitation\n      phone_number: $phone_number\n      email: $email\n      name: $name\n      surname: $surname\n      position: $position\n    ) {\n      id\n      project {\n        id\n      }\n      is_team_leader\n      role\n      rate{\n        id\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation AddRate(\n    $standardRate: Float!\n    $compensationRate: Float!\n    $overtimeHour1: Float!\n    $overtimeHour2: Float!\n    $overtimeHour3: Float!\n    $overtimeHour4: Float!\n  ) {\n    addRate(\n      standard_rate: $standardRate\n      compensation_rate: $compensationRate\n      overtime_hour1: $overtimeHour1\n      overtime_hour2: $overtimeHour2\n      overtime_hour3: $overtimeHour3\n      overtime_hour4: $overtimeHour4\n    ) {\n      id\n    }\n  }\n',
): (typeof documents)['\n  mutation AddRate(\n    $standardRate: Float!\n    $compensationRate: Float!\n    $overtimeHour1: Float!\n    $overtimeHour2: Float!\n    $overtimeHour3: Float!\n    $overtimeHour4: Float!\n  ) {\n    addRate(\n      standard_rate: $standardRate\n      compensation_rate: $compensationRate\n      overtime_hour1: $overtimeHour1\n      overtime_hour2: $overtimeHour2\n      overtime_hour3: $overtimeHour3\n      overtime_hour4: $overtimeHour4\n    ) {\n      id\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation AddShiftOverview($projectId: String!, $date: DateTimeISO!, $crewWorking: [CrewInput!]!) {\n  addShiftOverview(projectId: $projectId, date: $date, crew_working: $crewWorking) {\n    id\n    date\n    crew_working {\n      id\n    }\n  }\n}\n',
): (typeof documents)['\n  mutation AddShiftOverview($projectId: String!, $date: DateTimeISO!, $crewWorking: [CrewInput!]!) {\n  addShiftOverview(projectId: $projectId, date: $date, crew_working: $crewWorking) {\n    id\n    date\n    crew_working {\n      id\n    }\n  }\n}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    mutation AddShootingDay(\n        $projectId: String!, \n        $date: DateTimeISO!, \n        $shootingDayNumber: Float!, \n        $eventType: String\n    ) {\n        addShootingDay(\n            projectId: $projectId,\n            date: $date,\n            shootingDayNumber: $shootingDayNumber,\n            eventType: $eventType\n        ) {\n            project{\n                id\n            }\n        }\n    }\n',
): (typeof documents)['\n    mutation AddShootingDay(\n        $projectId: String!, \n        $date: DateTimeISO!, \n        $shootingDayNumber: Float!, \n        $eventType: String\n    ) {\n        addShootingDay(\n            projectId: $projectId,\n            date: $date,\n            shootingDayNumber: $shootingDayNumber,\n            eventType: $eventType\n        ) {\n            project{\n                id\n            }\n        }\n    }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation AddStatement(\n    $project_user_id: String!\n    $start_date: DateTimeISO!\n    $from: DateTimeISO!\n    $to: DateTimeISO!\n    $shift_lenght: Float!\n    $calculated_overtime: Float\n    $claimed_overtime: Float\n    $car_id: String\n    $kilometers: Float\n  ) {\n    addStatement(\n      project_user_id: $project_user_id\n      start_date: $start_date\n      from: $from\n      to: $to\n      shift_lenght: $shift_lenght\n      calculated_overtime: $calculated_overtime\n      claimed_overtime: $claimed_overtime\n      car_id: $car_id\n      kilometers: $kilometers\n    ) {\n      id\n      projectUser {\n        id\n        user {\n          id\n          name\n          surname\n        }\n      }\n      start_date\n      from\n      to\n      shift_lenght\n      calculated_overtime\n      claimed_overtime\n      create_date\n    }\n  }\n',
): (typeof documents)['\n  mutation AddStatement(\n    $project_user_id: String!\n    $start_date: DateTimeISO!\n    $from: DateTimeISO!\n    $to: DateTimeISO!\n    $shift_lenght: Float!\n    $calculated_overtime: Float\n    $claimed_overtime: Float\n    $car_id: String\n    $kilometers: Float\n  ) {\n    addStatement(\n      project_user_id: $project_user_id\n      start_date: $start_date\n      from: $from\n      to: $to\n      shift_lenght: $shift_lenght\n      calculated_overtime: $calculated_overtime\n      claimed_overtime: $claimed_overtime\n      car_id: $car_id\n      kilometers: $kilometers\n    ) {\n      id\n      projectUser {\n        id\n        user {\n          id\n          name\n          surname\n        }\n      }\n      start_date\n      from\n      to\n      shift_lenght\n      calculated_overtime\n      claimed_overtime\n      create_date\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DeleteInvitation($projectUserId: String!) {\n    deleteInvitation(projectUserId: $projectUserId)\n  }\n',
): (typeof documents)['\n  mutation DeleteInvitation($projectUserId: String!) {\n    deleteInvitation(projectUserId: $projectUserId)\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\nmutation DeleteShiftOverview($shiftOverviewId: String!) {\n    deleteShiftOverview(shiftOverviewId: $shiftOverviewId)\n  }\n',
): (typeof documents)['\nmutation DeleteShiftOverview($shiftOverviewId: String!) {\n    deleteShiftOverview(shiftOverviewId: $shiftOverviewId)\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    mutation DeleteShootingDay($shootingDayId: String!) {\n        deleteShootingDay(shootingDayId: $shootingDayId)\n    }\n',
): (typeof documents)['\n    mutation DeleteShootingDay($shootingDayId: String!) {\n        deleteShootingDay(shootingDayId: $shootingDayId)\n    }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DeleteStatement($id: String!) {\n    deleteStatement(id: $id)\n  }\n',
): (typeof documents)['\n  mutation DeleteStatement($id: String!) {\n    deleteStatement(id: $id)\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\nmutation EditDailyReport($data: DailyReportInput!, $dailyReportId: String!) {\n    updateDailyReport(data: $data, dailyReportId: $dailyReportId) {\n      id\n      \n    }\n  }\n',
): (typeof documents)['\nmutation EditDailyReport($data: DailyReportInput!, $dailyReportId: String!) {\n    updateDailyReport(data: $data, dailyReportId: $dailyReportId) {\n      id\n      \n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    mutation EditProject($data: ProjectInput!, $projectId: String!){\n        updateProject(data: $data, projectId: $projectId){\n            description,\n            name,\n            production_company,\n            end_date,\n            is_active,\n            last_update_user_id,\n            currency,\n            # start_date\n        }\n    } \n',
): (typeof documents)['\n    mutation EditProject($data: ProjectInput!, $projectId: String!){\n        updateProject(data: $data, projectId: $projectId){\n            description,\n            name,\n            production_company,\n            end_date,\n            is_active,\n            last_update_user_id,\n            currency,\n            # start_date\n        }\n    } \n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation EditProjectUser($data: ProjectUserInput!, $updateProjectUserId: String!) {\n    updateProjectUser(data: $data, id: $updateProjectUserId) {\n      id\n    }\n  }\n',
): (typeof documents)['\n  mutation EditProjectUser($data: ProjectUserInput!, $updateProjectUserId: String!) {\n    updateProjectUser(data: $data, id: $updateProjectUserId) {\n      id\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation EditRate($data: RateInput!, $rateId: String!) {\n    updateRate(data: $data, rateId: $rateId) {\n      id\n      standard_rate\n      overtime_hour1\n      overtime_hour2\n      overtime_hour3\n      overtime_hour4\n      compensation_rate\n    }\n  }\n',
): (typeof documents)['\n  mutation EditRate($data: RateInput!, $rateId: String!) {\n    updateRate(data: $data, rateId: $rateId) {\n      id\n      standard_rate\n      overtime_hour1\n      overtime_hour2\n      overtime_hour3\n      overtime_hour4\n      compensation_rate\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\nmutation EditShiftOverview($shiftOverviewId: String!, $data: ShiftOverviewInput!) {\n  updateShiftOverview(shiftOverviewId: $shiftOverviewId, data: $data) {\n    id\n    date\n    crew_working {\n      id\n    }\n  }\n}\n',
): (typeof documents)['\nmutation EditShiftOverview($shiftOverviewId: String!, $data: ShiftOverviewInput!) {\n  updateShiftOverview(shiftOverviewId: $shiftOverviewId, data: $data) {\n    id\n    date\n    crew_working {\n      id\n    }\n  }\n}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    mutation UpdateShootingDay(\n        $data: ShootingDayInput!,\n        $shootingDayId: String!\n    ) {\n        updateShootingDay(\n            data: $data,\n            shootingDayId: $shootingDayId\n        ) {\n            project {\n                id\n            }\n        }\n}\n',
): (typeof documents)['\n    mutation UpdateShootingDay(\n        $data: ShootingDayInput!,\n        $shootingDayId: String!\n    ) {\n        updateShootingDay(\n            data: $data,\n            shootingDayId: $shootingDayId\n        ) {\n            project {\n                id\n            }\n        }\n}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateStatement($id: String!, $data: StatementInput!) {\n    updatestatement(id: $id, data: $data) {\n      id\n      projectUser {\n        id\n      }\n      start_date\n      from\n      to\n      shift_lenght\n      calculated_overtime\n      claimed_overtime\n      create_date\n      last_update_date\n      create_user_id\n      last_update_user_id\n      kilometers\n    }\n  }\n',
): (typeof documents)['\n  mutation UpdateStatement($id: String!, $data: StatementInput!) {\n    updatestatement(id: $id, data: $data) {\n      id\n      projectUser {\n        id\n      }\n      start_date\n      from\n      to\n      shift_lenght\n      calculated_overtime\n      claimed_overtime\n      create_date\n      last_update_date\n      create_user_id\n      last_update_user_id\n      kilometers\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation EditUser($data: UserInput!, $userId: String!) {\n    updateUser(data: $data, userId: $userId) {\n      id\n      name\n      surname\n      email\n      is_active\n    }\n  }\n',
): (typeof documents)['\n  mutation EditUser($data: UserInput!, $userId: String!) {\n    updateUser(data: $data, userId: $userId) {\n      id\n      name\n      surname\n      email\n      is_active\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation InviteUserToProject(\n    $email: String!\n    $name: String!\n    $projectUserId: String!\n  ) {\n    inviteUser(email: $email, name: $name, projectUserId: $projectUserId)\n  }\n',
): (typeof documents)['\n  mutation InviteUserToProject(\n    $email: String!\n    $name: String!\n    $projectUserId: String!\n  ) {\n    inviteUser(email: $email, name: $name, projectUserId: $projectUserId)\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateAndActivateProjectUser(\n    $data: ProjectUserInput!\n    $updateProjectUserId: String!\n    $updateRateData: RateInput!\n    $rateId: String!\n  ) {\n    updateRate(data: $updateRateData, rateId: $rateId) {\n      compensation_rate\n      overtime_hour1\n      overtime_hour2\n      overtime_hour3\n      overtime_hour4\n      standard_rate\n    }\n    updateProjectUser(data: $data, id: $updateProjectUserId) {\n      id\n      position\n      number_of_people\n      is_team_leader\n      name\n      surname\n      email\n      create_date\n      create_user_id\n      last_update_user_id\n      last_update_date\n      is_active\n      role\n      invitation\n      phone_number\n    }\n  }\n',
): (typeof documents)['\n  mutation UpdateAndActivateProjectUser(\n    $data: ProjectUserInput!\n    $updateProjectUserId: String!\n    $updateRateData: RateInput!\n    $rateId: String!\n  ) {\n    updateRate(data: $updateRateData, rateId: $rateId) {\n      compensation_rate\n      overtime_hour1\n      overtime_hour2\n      overtime_hour3\n      overtime_hour4\n      standard_rate\n    }\n    updateProjectUser(data: $data, id: $updateProjectUserId) {\n      id\n      position\n      number_of_people\n      is_team_leader\n      name\n      surname\n      email\n      create_date\n      create_user_id\n      last_update_user_id\n      last_update_date\n      is_active\n      role\n      invitation\n      phone_number\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateUser($data: UserInput!, $userId: String!) {\n    updateUser(data: $data, userId: $userId) {\n      name\n      surname\n      phone_number\n      email\n      last_update_date\n    }\n  }\n',
): (typeof documents)['\n  mutation UpdateUser($data: UserInput!, $userId: String!) {\n    updateUser(data: $data, userId: $userId) {\n      name\n      surname\n      phone_number\n      email\n      last_update_date\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DeleteProjectUser($projectUserId: String!) {\n    deleteProjectUser(projectUserId: $projectUserId)\n  }\n',
): (typeof documents)['\n  mutation DeleteProjectUser($projectUserId: String!) {\n    deleteProjectUser(projectUserId: $projectUserId)\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query Quacks {\n    _empty\n  }\n',
): (typeof documents)['\n  query Quacks {\n    _empty\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetAllCarsOnProjectByProjectUserId($projectId: String!) {\n    projectUsers(projectId: $projectId) {\n      id\n      name\n      surname\n      car {\n        id\n        name\n        kilometer_allow\n        kilometer_rate\n      }\n      statement {\n        id\n        kilometers\n        car {\n          id\n          kilometer_allow\n          kilometer_rate\n          name\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetAllCarsOnProjectByProjectUserId($projectId: String!) {\n    projectUsers(projectId: $projectId) {\n      id\n      name\n      surname\n      car {\n        id\n        name\n        kilometer_allow\n        kilometer_rate\n      }\n      statement {\n        id\n        kilometers\n        car {\n          id\n          kilometer_allow\n          kilometer_rate\n          name\n        }\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetAllProjectUsers($projectId: String!) {\n    projectUsers(projectId: $projectId) {\n      id\n      name\n      surname\n      car {\n        id\n        name\n        kilometer_allow\n        kilometer_rate\n      }\n      rate {\n        compensation_rate\n        standard_rate\n        overtime_hour1\n        overtime_hour2\n        overtime_hour3\n        overtime_hour4\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetAllProjectUsers($projectId: String!) {\n    projectUsers(projectId: $projectId) {\n      id\n      name\n      surname\n      car {\n        id\n        name\n        kilometer_allow\n        kilometer_rate\n      }\n      rate {\n        compensation_rate\n        standard_rate\n        overtime_hour1\n        overtime_hour2\n        overtime_hour3\n        overtime_hour4\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetCarsByProjectUserId($projectUserId: String!) {\n    carsByProjectUserId(projectUserId: $projectUserId) {\n      id\n      name\n      kilometer_allow\n      kilometer_rate\n      create_user_id\n      last_update_user_id\n      last_update_date\n      create_date\n    }\n  }\n',
): (typeof documents)['\n  query GetCarsByProjectUserId($projectUserId: String!) {\n    carsByProjectUserId(projectUserId: $projectUserId) {\n      id\n      name\n      kilometer_allow\n      kilometer_rate\n      create_user_id\n      last_update_user_id\n      last_update_date\n      create_date\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetCrewListInfo($projectId: String!, $userId: String!) {\n    project(id: $projectId) {\n      id\n      name\n      start_date\n      end_date\n      production_company\n      is_active\n      create_date\n      create_user_id\n      last_update_date\n      last_update_user_id\n      currency\n    }\n    departments(projectId: $projectId) {\n      id\n      name\n    }\n    projectUsers(projectId: $projectId) {\n      id\n      is_active\n      position\n      user {\n        id\n      }\n      rate {\n        id\n        compensation_rate\n        create_date\n        create_user_id\n        last_update_date\n        last_update_user_id\n        overtime_hour1\n        overtime_hour2\n        overtime_hour3\n        overtime_hour4\n        standard_rate\n      }\n      invitation\n      role\n      phone_number\n      department {\n        name\n        id\n      }\n      email\n      name\n      surname\n    }\n    userRoleInProject(projectId: $projectId, userId: $userId)\n  }\n',
): (typeof documents)['\n  query GetCrewListInfo($projectId: String!, $userId: String!) {\n    project(id: $projectId) {\n      id\n      name\n      start_date\n      end_date\n      production_company\n      is_active\n      create_date\n      create_user_id\n      last_update_date\n      last_update_user_id\n      currency\n    }\n    departments(projectId: $projectId) {\n      id\n      name\n    }\n    projectUsers(projectId: $projectId) {\n      id\n      is_active\n      position\n      user {\n        id\n      }\n      rate {\n        id\n        compensation_rate\n        create_date\n        create_user_id\n        last_update_date\n        last_update_user_id\n        overtime_hour1\n        overtime_hour2\n        overtime_hour3\n        overtime_hour4\n        standard_rate\n      }\n      invitation\n      role\n      phone_number\n      department {\n        name\n        id\n      }\n      email\n      name\n      surname\n    }\n    userRoleInProject(projectId: $projectId, userId: $userId)\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetProjectUserDetails($userId: String!, $projectId: String!) {\n    projectUserDetails(userId: $userId, projectId: $projectId) {\n      project {\n        id\n        name\n        currency\n      }\n      id\n      name\n      surname\n      email\n    }\n  }\n',
): (typeof documents)['\n  query GetProjectUserDetails($userId: String!, $projectId: String!) {\n    projectUserDetails(userId: $userId, projectId: $projectId) {\n      project {\n        id\n        name\n        currency\n      }\n      id\n      name\n      surname\n      email\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetDailyReportByShootingDay($shootingDayId: String!) {\n    shootingDay(id: $shootingDayId) {\n      id\n      dailyReport {\n        id\n        intro {\n          title\n          value\n        }\n        shooting_progress {\n          title\n          value       \n        }\n        footer {\n          title\n          value\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetDailyReportByShootingDay($shootingDayId: String!) {\n    shootingDay(id: $shootingDayId) {\n      id\n      dailyReport {\n        id\n        intro {\n          title\n          value\n        }\n        shooting_progress {\n          title\n          value       \n        }\n        footer {\n          title\n          value\n        }\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query DailyReportPreviewInfo($date: DateTimeISO!, $projectId: String!, $shootingDayId: String!) {\n  statementsByProjectIdAndDate(date: $date, projectId: $projectId) {\n    id\n    start_date\n    from\n    to\n    claimed_overtime\n    projectUser {\n      name\n      surname\n      position\n      department {\n        id\n        name\n        order_index\n        is_visible\n      }\n    }\n  }\n  project(id: $projectId) {\n    id\n    name\n    production_company\n    currency\n    shootingDays {\n      id\n    }\n  }\n  shootingDay(id: $shootingDayId) {\n    id\n    shooting_day_number\n    date\n    dailyReport {\n      id\n      intro {\n        title\n        value\n      }\n      shooting_progress {\n        title\n        value\n      }\n      footer {\n        title\n        value\n      }\n    }\n  }\n}\n',
): (typeof documents)['\n  query DailyReportPreviewInfo($date: DateTimeISO!, $projectId: String!, $shootingDayId: String!) {\n  statementsByProjectIdAndDate(date: $date, projectId: $projectId) {\n    id\n    start_date\n    from\n    to\n    claimed_overtime\n    projectUser {\n      name\n      surname\n      position\n      department {\n        id\n        name\n        order_index\n        is_visible\n      }\n    }\n  }\n  project(id: $projectId) {\n    id\n    name\n    production_company\n    currency\n    shootingDays {\n      id\n    }\n  }\n  shootingDay(id: $shootingDayId) {\n    id\n    shooting_day_number\n    date\n    dailyReport {\n      id\n      intro {\n        title\n        value\n      }\n      shooting_progress {\n        title\n        value\n      }\n      footer {\n        title\n        value\n      }\n    }\n  }\n}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query Departments($projectId: String!) {\n    departments(projectId: $projectId) {\n      id\n      name\n    }\n  }\n',
): (typeof documents)['\n  query Departments($projectId: String!) {\n    departments(projectId: $projectId) {\n      id\n      name\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\nquery LastDailyReportByProjectId($projectId: String!) {\n  lastDailyReportByProjectId(projectId: $projectId) {\n    id\n    intro {\n      title\n      value\n    }\n    shooting_progress {\n      title\n      value\n    }\n    footer {\n      title\n      value\n    }\n    create_date\n    last_update_date\n    shootingDay {\n      id\n      shooting_day_number\n      date\n    }\n  }\n}\n',
): (typeof documents)['\nquery LastDailyReportByProjectId($projectId: String!) {\n  lastDailyReportByProjectId(projectId: $projectId) {\n    id\n    intro {\n      title\n      value\n    }\n    shooting_progress {\n      title\n      value\n    }\n    footer {\n      title\n      value\n    }\n    create_date\n    last_update_date\n    shootingDay {\n      id\n      shooting_day_number\n      date\n    }\n  }\n}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetProjectByProjectUserToken($token: String!) {\n    projectUsersByToken(token: $token) {\n      project {\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetProjectByProjectUserToken($token: String!) {\n    projectUsersByToken(token: $token) {\n      project {\n        name\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetProjectDetail($id: String!) {\n    project(id: $id) {\n      id\n      name\n      description\n      start_date\n      end_date\n      production_company\n      is_active\n      create_date\n      create_user_id\n      last_update_date\n      last_update_user_id\n      currency\n      projectUsers {\n      id\n    }\n    }\n  }\n',
): (typeof documents)['\n  query GetProjectDetail($id: String!) {\n    project(id: $id) {\n      id\n      name\n      description\n      start_date\n      end_date\n      production_company\n      is_active\n      create_date\n      create_user_id\n      last_update_date\n      last_update_user_id\n      currency\n      projectUsers {\n      id\n    }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetProjectUserByToken($token: String!) {\n    projectUsersByToken(token: $token) {\n      id\n      position\n      name\n      surname\n      email\n      is_active\n      role\n      invitation\n      phone_number\n      project {\n        id\n        name\n        description\n        currency\n      }\n      rate {\n        standard_rate\n        overtime_hour1\n        overtime_hour2\n        overtime_hour3\n        overtime_hour4\n        compensation_rate\n        id\n      }\n      department {\n        id\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetProjectUserByToken($token: String!) {\n    projectUsersByToken(token: $token) {\n      id\n      position\n      name\n      surname\n      email\n      is_active\n      role\n      invitation\n      phone_number\n      project {\n        id\n        name\n        description\n        currency\n      }\n      rate {\n        standard_rate\n        overtime_hour1\n        overtime_hour2\n        overtime_hour3\n        overtime_hour4\n        compensation_rate\n        id\n      }\n      department {\n        id\n        name\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query ProjectUsers($projectId: String!) {\n    projectUsers(projectId: $projectId) {\n      id\n      is_active\n      position\n      department {\n        name\n        id\n      }\n      user {\n        name\n        surname\n        email\n        id\n      }\n      rate {\n        id\n      }\n      invitation\n      role\n      phone_number\n    }\n  }\n',
): (typeof documents)['\n  query ProjectUsers($projectId: String!) {\n    projectUsers(projectId: $projectId) {\n      id\n      is_active\n      position\n      department {\n        name\n        id\n      }\n      user {\n        name\n        surname\n        email\n        id\n      }\n      rate {\n        id\n      }\n      invitation\n      role\n      phone_number\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query ProjectUser($token: String!) {\n    projectUsersByToken(token: $token) {\n      id\n      position\n      role\n      phone_number\n      project {\n        id\n        name\n        description\n      }\n      user {\n        id\n        name\n        surname\n        email\n      }\n      rate {\n        standard_rate\n        overtime_hour1\n        overtime_hour2\n        overtime_hour3\n        overtime_hour4\n      }\n      department {\n        id\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  query ProjectUser($token: String!) {\n    projectUsersByToken(token: $token) {\n      id\n      position\n      role\n      phone_number\n      project {\n        id\n        name\n        description\n      }\n      user {\n        id\n        name\n        surname\n        email\n      }\n      rate {\n        standard_rate\n        overtime_hour1\n        overtime_hour2\n        overtime_hour3\n        overtime_hour4\n      }\n      department {\n        id\n        name\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetProjects {\n    projects {\n      id\n      name\n      description\n    }\n  }\n',
): (typeof documents)['\n  query GetProjects {\n    projects {\n      id\n      name\n      description\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    query GetShiftOverviewPageData($projectId: String!, ){\n  projectUsers(projectId: $projectId) {\n    id\n    name\n    surname\n    email\n    position\n    department {\n      id\n      name\n      order_index\n    }\n    statement {\n      id\n      start_date\n      from\n      to\n    }\n  }\n  shootingDaysByProject(projectId: $projectId) {\n    id\n    shooting_day_number\n    date\n  }\n  shiftOverviewsByProjectId(projectId: $projectId) {\n    id\n    date\n    crew_working {\n      id\n    }\n  }\n  project(id: $projectId) {\n    id\n    name\n    start_date\n    end_date\n  }\n}\n',
): (typeof documents)['\n    query GetShiftOverviewPageData($projectId: String!, ){\n  projectUsers(projectId: $projectId) {\n    id\n    name\n    surname\n    email\n    position\n    department {\n      id\n      name\n      order_index\n    }\n    statement {\n      id\n      start_date\n      from\n      to\n    }\n  }\n  shootingDaysByProject(projectId: $projectId) {\n    id\n    shooting_day_number\n    date\n  }\n  shiftOverviewsByProjectId(projectId: $projectId) {\n    id\n    date\n    crew_working {\n      id\n    }\n  }\n  project(id: $projectId) {\n    id\n    name\n    start_date\n    end_date\n  }\n}\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    query ShootingDaysByProject($projectId: String!) {\n        shootingDaysByProject(projectId: $projectId) {\n            id\n            date\n            shooting_day_number\n            event_type\n        }\n    }\n',
): (typeof documents)['\n    query ShootingDaysByProject($projectId: String!) {\n        shootingDaysByProject(projectId: $projectId) {\n            id\n            date\n            shooting_day_number\n            event_type\n        }\n    }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetShootingDaysByProject($projectId: String!) {\n    shootingDaysByProject(projectId: $projectId) {\n      id\n      shooting_day_number\n      date\n      event_type\n      dailyReport {\n      id\n      intro {\n        title\n        value\n      }\n      shooting_progress {\n        title\n        value       \n      }\n      footer {\n        title\n        value\n      }\n    }\n    }\n  }\n',
): (typeof documents)['\n  query GetShootingDaysByProject($projectId: String!) {\n    shootingDaysByProject(projectId: $projectId) {\n      id\n      shooting_day_number\n      date\n      event_type\n      dailyReport {\n      id\n      intro {\n        title\n        value\n      }\n      shooting_progress {\n        title\n        value       \n      }\n      footer {\n        title\n        value\n      }\n    }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetCrewStatements($projectUserId: String!) {\n    statementsByProjectUserId(projectUserId: $projectUserId) {\n      id\n      projectUser {\n        id\n        name\n        surname\n        email\n        rate {\n          compensation_rate\n          standard_rate\n          overtime_hour1\n          overtime_hour2\n          overtime_hour3\n          overtime_hour4\n        }\n      }\n      start_date\n      from\n      to\n      shift_lenght\n      calculated_overtime\n      claimed_overtime\n      create_date\n      car {\n        id\n        kilometer_allow\n        kilometer_rate\n        name\n      }\n      kilometers\n    }\n  }\n',
): (typeof documents)['\n  query GetCrewStatements($projectUserId: String!) {\n    statementsByProjectUserId(projectUserId: $projectUserId) {\n      id\n      projectUser {\n        id\n        name\n        surname\n        email\n        rate {\n          compensation_rate\n          standard_rate\n          overtime_hour1\n          overtime_hour2\n          overtime_hour3\n          overtime_hour4\n        }\n      }\n      start_date\n      from\n      to\n      shift_lenght\n      calculated_overtime\n      claimed_overtime\n      create_date\n      car {\n        id\n        kilometer_allow\n        kilometer_rate\n        name\n      }\n      kilometers\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetAdminStatements($projectId: String!) {\n    statementsByProjectId(projectId: $projectId) {\n      id\n      projectUser {\n        id\n        name\n        surname\n        email\n        rate {\n          compensation_rate\n          standard_rate\n          overtime_hour1\n          overtime_hour2\n          overtime_hour3\n          overtime_hour4\n        }\n      }\n      start_date\n      from\n      to\n      shift_lenght\n      calculated_overtime\n      claimed_overtime\n      create_date\n      car {\n        id\n        kilometer_allow\n        kilometer_rate\n        name\n      }\n      kilometers\n    }\n  }\n  ',
): (typeof documents)['\n  query GetAdminStatements($projectId: String!) {\n    statementsByProjectId(projectId: $projectId) {\n      id\n      projectUser {\n        id\n        name\n        surname\n        email\n        rate {\n          compensation_rate\n          standard_rate\n          overtime_hour1\n          overtime_hour2\n          overtime_hour3\n          overtime_hour4\n        }\n      }\n      start_date\n      from\n      to\n      shift_lenght\n      calculated_overtime\n      claimed_overtime\n      create_date\n      car {\n        id\n        kilometer_allow\n        kilometer_rate\n        name\n      }\n      kilometers\n    }\n  }\n  '];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query CarStatementsByProjectId($projectId: String!) {\n    carStatementsByProjectId(projectId: $projectId) {\n      car_id\n      kilometers\n    }\n  }\n  ',
): (typeof documents)['\n  query CarStatementsByProjectId($projectId: String!) {\n    carStatementsByProjectId(projectId: $projectId) {\n      car_id\n      kilometers\n    }\n  }\n  '];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetUserProfileSettingsInfo($userId: String!) {\n    user(id: $userId) {\n      id\n      name\n      surname\n      email\n      phone_number\n      last_update_date\n      create_date\n    }\n  }\n',
): (typeof documents)['\n  query GetUserProfileSettingsInfo($userId: String!) {\n    user(id: $userId) {\n      id\n      name\n      surname\n      email\n      phone_number\n      last_update_date\n      create_date\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetUserProjects($userId: String!) {\n    userProjects(userId: $userId) {\n      id\n      name\n      description\n    }\n  }\n\n',
): (typeof documents)['\n  query GetUserProjects($userId: String!) {\n    userProjects(userId: $userId) {\n      id\n      name\n      description\n    }\n  }\n\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetUserRoleInProject($userId: String!, $projectId: String!) {\n    userRoleInProject(userId: $userId, projectId: $projectId)\n  }\n',
): (typeof documents)['\n  query GetUserRoleInProject($userId: String!, $projectId: String!) {\n    userRoleInProject(userId: $userId, projectId: $projectId)\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment ProjectBasicInfo on Project {\n    id\n    name\n    description\n  }\n',
): (typeof documents)['\n  fragment ProjectBasicInfo on Project {\n    id\n    name\n    description\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation ForgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n',
): (typeof documents)['\n  mutation ForgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      user {\n        id\n        name\n        email\n        surname\n      }\n      token\n    }\n  }\n',
): (typeof documents)['\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      user {\n        id\n        name\n        email\n        surname\n      }\n      token\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation ResetPassword($newPassword: String!, $token: String!) {\n    resetPassword(newPassword: $newPassword, token: $token) {\n      user {\n        id\n        name\n        surname\n        email\n      }\n      token\n    }\n  }\n',
): (typeof documents)['\n  mutation ResetPassword($newPassword: String!, $token: String!) {\n    resetPassword(newPassword: $newPassword, token: $token) {\n      user {\n        id\n        name\n        surname\n        email\n      }\n      token\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation SignUp(\n    $email: String!\n    $name: String!\n    $surname: String!\n    $password: String!\n  ) {\n    signUp(email: $email, name: $name, surname: $surname, password: $password) {\n      user {\n        id\n        name\n        email\n        surname\n      }\n      token\n    }\n  }\n',
): (typeof documents)['\n  mutation SignUp(\n    $email: String!\n    $name: String!\n    $surname: String!\n    $password: String!\n  ) {\n    signUp(email: $email, name: $name, surname: $surname, password: $password) {\n      user {\n        id\n        name\n        email\n        surname\n      }\n      token\n    }\n  }\n'];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
