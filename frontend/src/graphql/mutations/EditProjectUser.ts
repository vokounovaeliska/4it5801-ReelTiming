import { gql } from '@frontend/gql';

export const EDIT_PROJECT_USER = gql(`
  mutation EditProjectUser($data: ProjectUserInput!, $updateProjectUserId: String!) {
    updateProjectUser(data: $data, id: $updateProjectUserId) {
      id
    }
  }
`);
