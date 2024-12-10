import { gql } from '@frontend/gql';

export const DELETE_INVITATION = gql(`
  mutation DeleteInvitation($projectUserId: String!) {
    deleteInvitation(projectUserId: $projectUserId)
  }
`);
