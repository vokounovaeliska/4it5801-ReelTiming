import { Car } from '../interfaces';

export const getCarOptionsForLoggedInUser = (userCarsData: {
  carsByProjectUserId: Car[];
}) => {
  return (
    userCarsData?.carsByProjectUserId?.map((car: Car) => ({
      value: car.id,
      label: car.name,
    })) || []
  );
};

export const getUserOptionsForUserFilter = (
  allProjectUsersData: {
    id: string;
    name: string;
    surname: string;
  }[],
) => {
  return (
    allProjectUsersData
      ?.filter((projectUser) => projectUser.id !== null)
      .map((projectUser) => ({
        value: projectUser.id,
        label: `${projectUser.name} ${projectUser.surname}`,
      })) || []
  );
};

export const getUserOptionsForAdminAddTimesheet = (
  allProjectUsersData: {
    id: string;
    name: string;
    surname: string;
  }[],
) => {
  return (
    allProjectUsersData
      ?.filter((projectUser) => projectUser.id !== null)
      .map((projectUser) => ({
        value: projectUser.id,
        label: `${projectUser.name} ${projectUser.surname}`,
      })) || []
  );
};
