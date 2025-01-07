import { gql } from '@frontend/gql';

export const ADD_PROJECT_USER = gql(`
  mutation AddProjectUser(
    $projectId: String!
    $isTeamLeader: Boolean!
    $rateId: String
    $departmentId: String
    $role: String!
    $invitation: String
    $phone_number: String
    $email: String!
    $name: String!
    $surname: String!
    $position: String
  ) {
    addProjectUser(
      projectId: $projectId
      isTeamLeader: $isTeamLeader
      rateId: $rateId
      departmentId: $departmentId
      role: $role
      invitation: $invitation
      phone_number: $phone_number
      email: $email
      name: $name
      surname: $surname
      position: $position
    ) {
      id
      project {
        id
      }
      is_team_leader
      role
    }
  }
`);
