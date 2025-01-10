import { gql } from '@apollo/client';

export const EDIT_USER = gql`
  mutation Mutation($data: UserInput!, $userId: String!) {
    updateUser(data: $data, userId: $userId) {
      id
      name
      surname
      email
      is_active
    }
  }
`;
