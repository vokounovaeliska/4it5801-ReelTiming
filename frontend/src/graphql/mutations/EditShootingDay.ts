import gql from 'graphql-tag';

export const UPDATE_SHOOTING_DAY = gql(`
    mutation UpdateShootingDay(
        $data: ShootingDayInput!,
        $shootingDayId: String!
    ) {
        updateShootingDay(
            data: $data,
            shootingDayId: $shootingDayId
        ) {
            project {
                id
            }
        }
}
`);
