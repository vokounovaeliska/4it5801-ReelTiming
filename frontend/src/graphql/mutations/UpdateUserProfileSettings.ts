import { gql } from '@frontend/gql';

export const UPDATE_USER_PROFILE_SETTINGS = gql(`
  mutation UpdateUser($data: UserInput!, $userId: String!) {
    updateUser(data: $data, userId: $userId) {
      name
      surname
      phone_number
      email
      last_update_date
    }
  }
`);
