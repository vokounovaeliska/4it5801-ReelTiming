import gql from 'graphql-tag';

export const ADD_SHOOTING_DAY = gql(`
    mutation AddShootingDay(
        $projectId: String!, 
        $date: DateTimeISO!, 
        $shootingDayNumber: Float!, 
        $eventType: String
    ) {
        addShootingDay(
            projectId: $projectId,
            date: $date,
            shootingDayNumber: $shootingDayNumber,
            eventType: $eventType
        ) {
            project{
                id
            }
        }
    }
`);
