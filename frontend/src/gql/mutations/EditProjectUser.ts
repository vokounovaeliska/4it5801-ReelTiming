import { gql } from '@apollo/client';

export const EDIT_PROJECT_USER = gql`
  mutation Mutation($data: ProjectUserInput!, $updateProjectUserId: String!) {
    updateProjectUser(data: $data, id: $updateProjectUserId) {
      id
    }
  }
`;
