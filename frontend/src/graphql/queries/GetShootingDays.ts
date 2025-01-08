import { gql } from '@frontend/gql';

export const GET_SHOOTING_DAYS = gql(`
    query ShootingDaysByProject($projectId: String!) {
        shootingDaysByProject(projectId: $projectId) {
            id
            date
            shooting_day_number
            event_type
        }
    }
`);
