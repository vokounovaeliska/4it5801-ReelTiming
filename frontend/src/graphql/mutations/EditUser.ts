import { gql } from '@frontend/gql';

export const EDIT_USER = gql(`
  mutation EditUser($data: UserInput!, $userId: String!) {
    updateUser(data: $data, userId: $userId) {
      id
      name
      surname
      email
      is_active
    }
  }
`);
