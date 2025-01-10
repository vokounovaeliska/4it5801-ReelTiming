import gql from 'graphql-tag';

export const DELETE_SHOOTING_DAY = gql(`
    mutation DeleteShootingDay($shootingDayId: String!) {
        deleteShootingDay(shootingDayId: $shootingDayId)
    }
`);
