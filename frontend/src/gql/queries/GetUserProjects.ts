import { gql } from '@apollo/client';

import { PROJECT_BASIC_INFO } from './fragments';

export const GET_USER_PROJECTS = gql`
  query GetUserProjects($userId: String!) {
    userProjects(userId: $userId) {
      ...ProjectBasicInfo
    }
  }
  ${PROJECT_BASIC_INFO}
`;
