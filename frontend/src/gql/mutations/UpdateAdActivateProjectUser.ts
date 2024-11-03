import { gql } from '@apollo/client';

export const UPDATE_AND_ACTIVATE_PROJECT_USER = gql`
  mutation UpdateAndActivateProjectUser(
    $data: ProjectUserInput!
    $updateProjectUserId: String!
    $updateRateData: RateInput!
    $rateId: String!
  ) {
    updateRate(data: $updateRateData, rateId: $rateId) {
      compensation_rate
      overtime_hour1
      overtime_hour2
      overtime_hour3
      overtime_hour4
      standard_rate
    }
    updateProjectUser(data: $data, id: $updateProjectUserId) {
      id
      position
      number_of_people
      is_team_leader
      name
      surname
      email
      create_date
      create_user_id
      last_update_user_id
      last_update_date
      is_active
      role
      invitation
      phone_number
    }
  }
`;
