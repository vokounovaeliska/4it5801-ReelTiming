import { gql } from '@frontend/gql';

export const INVITE_USER_TO_PROJECT = gql(`
  mutation InviteUserToProject(
    $email: String!
    $name: String!
    $projectUserId: String!
  ) {
    inviteUser(email: $email, name: $name, projectUserId: $projectUserId)
  }
`);
