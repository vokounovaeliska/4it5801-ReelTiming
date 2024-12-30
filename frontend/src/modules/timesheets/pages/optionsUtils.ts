import { ProjectUser } from '@frontend/modules/crewlist/interfaces/interfaces';
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

export const getUserOptionsForUserFilter = (allProjectUsersData: {
  projectUsers: ProjectUser[];
}) => {
  return (
    allProjectUsersData?.projectUsers
      ?.filter((projectUser: ProjectUser) => projectUser.id !== null)
      .map((projectUser: ProjectUser) => ({
        value: projectUser.id,
        label: `${projectUser.name} ${projectUser.surname}`,
      })) || []
  );
};

export const getUserOptionsForAdminAddTimesheet = (allProjectUsersData: {
  projectUsers: ProjectUser[];
}) => {
  return (
    allProjectUsersData?.projectUsers
      ?.filter((projectUser: ProjectUser) => projectUser.id !== null)
      .map((projectUser: ProjectUser) => ({
        value: projectUser.id,
        label: `${projectUser.name} ${projectUser.surname}`,
      })) || []
  );
};
