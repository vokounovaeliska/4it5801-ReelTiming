import { gql } from '@apollo/client';

export const DELETE_INVITATION = gql`
  mutation DeleteInvitation($userId: String!, $projectId: String!) {
    deleteInvitation(userId: $userId, projectId: $projectId)
  }
`;
