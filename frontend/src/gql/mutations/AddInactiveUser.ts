import { gql } from '@apollo/client';

export const ADD_INACTIVE_USER = gql`
  mutation AddInactiveUser(
    $email: String!
    $name: String!
    $surname: String!
    $phone_number: String!
  ) {
    addInactiveUser(
      email: $email
      name: $name
      surname: $surname
      phone_number: $phone_number
    ) {
      id
      email
      name
      surname
      phone_number
    }
  }
`;
