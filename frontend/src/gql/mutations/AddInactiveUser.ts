import { gql } from '@apollo/client';

export const ADD_INACTIVE_USER = gql`
  mutation AddInactiveUser($email: String!, $surname: String!, $name: String!) {
    addInactiveUser(email: $email, surname: $surname, name: $name) {
      id
      name
      surname
      email
      is_active
    }
  }
`;
