import { gql } from '@apollo/client';

export const ADD_PROJECT_USER = gql`
  mutation AddProjectUser(
    $userId: String!
    $projectId: String!
    $phoneNumber: String
    $rateId: String
    $departmentId: String
    $role: String
    $name: String!
    $surname: String!
    $email: String!
    $position: String
  ) {
    addProjectUser(
      userId: $userId
      projectId: $projectId
      phone_number: $phoneNumber
      rateId: $rateId
      departmentId: $departmentId
      role: $role
      name: $name
      surname: $surname
      email: $email
      position: $position
    ) {
      id
      user {
        id
      }
    }
  }
`;
