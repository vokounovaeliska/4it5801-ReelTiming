import { gql } from '@apollo/client';

export const GET_USER_PROFILE_SETTINGS_INFO = gql`
  query GetUserProfileSettingsInfo($userId: String!) {
    user(id: $userId) {
      id
      name
      surname
      email
      phone_number
      last_update_date
      create_date
    }
  }
`;
