import { gql } from '@apollo/client';

export const INVITE_USER_TO_PROJECT = gql`
  mutation InviteUserToProject(
    $projectId: String!
    $id: String!
    $name: String!
    $email: String!
  ) {
    inviteUser(projectId: $projectId, id: $id, name: $name, email: $email)
  }
`;
