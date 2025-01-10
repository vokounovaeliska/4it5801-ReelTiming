import { gql } from '@apollo/client';

import { PROJECT_BASIC_INFO } from './fragments';

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      ...ProjectBasicInfo
    }
  }
  ${PROJECT_BASIC_INFO}
`;
