import { gql } from '@apollo/client';

export const DELETE_INVITATION = gql`
  mutation DeleteInvitation($projectUserId: String!) {
    deleteInvitation(projectUserId: $projectUserId)
  }
`;
