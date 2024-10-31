import { gql } from '@apollo/client';

export const ADD_INACTIVE_USER = gql`
  mutation AddInactiveUser(
    $email: String!
    $surname: String!
    $name: String!
    $phone_number: String!
  ) {
    addInactiveUser(
      email: $email
      surname: $surname
      name: $name
      phone_number: $phone_number
    ) {
      id
      name
      surname
      email
      is_active
    }
  }
`;
