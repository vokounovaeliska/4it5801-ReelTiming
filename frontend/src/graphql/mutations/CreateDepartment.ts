import { gql } from '@apollo/client';

export const CREATE_DEPARTMENT = gql(`
 mutation AddDepartment($name: String!, $isVisible: Boolean, $orderIndex: Float, $projectId: String!) {
    addDepartment(name: $name, isVisible: $isVisible, orderIndex: $orderIndex, projectId: $projectId) {
      id
      is_visible
      name
      order_index
    }
  }
`);
