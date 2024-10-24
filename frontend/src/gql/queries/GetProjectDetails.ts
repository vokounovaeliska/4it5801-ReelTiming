import { gql } from '@apollo/client';

// todo figure out a way to use this -looks better

export const GET_PROJECT_DETAILS = gql`
  query GetProjectDetails($id: String!) {
    project(id: $id) {
      id
      name
      description
    }
  }
`;
