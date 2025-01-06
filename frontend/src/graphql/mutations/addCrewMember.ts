import { useMutation } from '@apollo/client';
import { ADD_RATE } from './AddRate';
import { ADD_PROJECT_USER } from './AddProjectUser';
import { INVITE_USER_TO_PROJECT } from './InviteUserToProject';
import { EDIT_RATE } from './EditRate';
import { EDIT_PROJECT_USER } from './EditProjectUser';
import { DELETE_PROJECT_USER } from '../queries/DeleteProjectUser';
import { DELETE_INVITATION } from './DeleteInvitation';
import { ADD_CAR, DELETE_CAR, UPDATE_CAR } from './AddCar';
import { Car } from '@frontend/modules/timesheets/interfaces';

interface CrewMemberData {
  id: string;
  name: string;
  surname: string;
  department: string;
  position?: string | null;
  phone_number?: string | null;
  email: string;
  standard_rate?: number | null;
  compensation_rate?: number | null;
  overtime_hour1?: number | null;
  overtime_hour2?: number | null;
  overtime_hour3?: number | null;
  overtime_hour4?: number | null;
  role?: string | null;
  user_id: string | null;
  rate_id: string | null;
  cars: Car[] | null;
}

export const useCrewMemberMutations = () => {
  const [addRate] = useMutation(ADD_RATE);
  const [addProjectUser] = useMutation(ADD_PROJECT_USER);
  const [inviteUserToProject] = useMutation(INVITE_USER_TO_PROJECT);
  const [editRate] = useMutation(EDIT_RATE);
  const [editProjectUser] = useMutation(EDIT_PROJECT_USER);
  const [deleteProjectUser] = useMutation(DELETE_PROJECT_USER);
  const [deleteProjectInvitation] = useMutation(DELETE_INVITATION);
  const [addCar] = useMutation(ADD_CAR);
  const [deleteCar] = useMutation(DELETE_CAR);
  const [updateCar] = useMutation(UPDATE_CAR);

  const addCrewMember = async (data: CrewMemberData, projectId: string) => {
    try {
      // Add Rate
      const responseRate = await addRate({
        variables: {
          standardRate: data.standard_rate ?? 0,
          compensationRate: data.compensation_rate ?? 0,
          overtimeHour1: data.overtime_hour1 ?? 0,
          overtimeHour2: data.overtime_hour2 ?? 0,
          overtimeHour3: data.overtime_hour3 ?? 0,
          overtimeHour4: data.overtime_hour4 ?? 0,
        },
      });

      const rateId = responseRate.data?.addRate?.id;
      //  Add Project User
      const responseId = await addProjectUser({
        variables: {
          projectId: projectId,
          phone_number: data.phone_number,
          rateId: rateId,
          departmentId: data.department,
          position: data.position,
          role: data.role ?? 'CREW',
          name: data.name,
          surname: data.surname,
          email: data.email,
          isTeamLeader: false,
          invitation: null,
        },
      });

      return { responseId };
    } catch (error) {
      console.error('Error adding crew member:', error);
      throw error;
    }
  };

  const sendEmailInvitation = async (
    projectUserId: string,
    name: string,
    email: string,
  ) => {
    try {
      await inviteUserToProject({
        variables: {
          projectUserId,
          name,
          email,
        },
      });
      console.log('Invitation sent successfully');
    } catch (error) {
      console.error('Error sending invitation:', error);
      throw error;
    }
  };

  const handleUpdateCars = async (data: CrewMemberData, oldCars: Car[]) => {
    if (data.cars !== null) {
      const deletePromises = [];
      const addOrUpdatePromises = [];

      for (const oldCar of oldCars) {
        const carExistsInNew = data.cars.some(
          (newCar) => newCar.id === oldCar.id,
        );

        if (!carExistsInNew) {
          deletePromises.push(
            deleteCar({
              variables: {
                deleteCarId: oldCar.id,
              },
            }),
          );
        }
      }

      for (const newCar of data.cars) {
        const existingCar = oldCars.find((oldCar) => oldCar.id === newCar.id);

        if (existingCar) {
          if (
            existingCar.kilometer_allow !== newCar.kilometer_allow ||
            existingCar.kilometer_rate !== newCar.kilometer_rate ||
            existingCar.name !== newCar.name
          ) {
            addOrUpdatePromises.push(
              updateCar({
                variables: {
                  data: {
                    kilometer_allow: newCar.kilometer_allow,
                    kilometer_rate: newCar.kilometer_rate,
                    name: newCar.name,
                    project_user_id: data.id,
                  },
                  updateCarId: newCar.id,
                },
              }),
            );
          }
        } else {
          addOrUpdatePromises.push(
            addCar({
              variables: {
                kilometerRate: newCar.kilometer_rate,
                kilometerAllow: newCar.kilometer_allow,
                name: newCar.name,
                projectUserId: data.id,
              },
            }),
          );
        }
      }
      if (deletePromises.length > 0) {
        await Promise.all(deletePromises);
      }

      if (addOrUpdatePromises.length > 0) {
        await Promise.all(addOrUpdatePromises);
      }
    }
  };

  const editCrewMember = async (
    data: CrewMemberData,
    projectId: string,
    oldCars: Car[] | null,
  ) => {
    try {
      await editRate({
        variables: {
          data: {
            standard_rate: data.standard_rate,
            compensation_rate: data.compensation_rate,
            overtime_hour1: data.overtime_hour1,
            overtime_hour2: data.overtime_hour2,
            overtime_hour3: data.overtime_hour3,
            overtime_hour4: data.overtime_hour4,
          },
          rateId: data.rate_id!,
        },
      });

      await handleUpdateCars(data, oldCars ? oldCars : []);

      await editProjectUser({
        variables: {
          data: {
            user_id: data.user_id,
            project_id: projectId,
            phone_number: data.phone_number,
            department_id: data.department,
            role: data.role,
            rate_id: data.rate_id,
            name: data.name,
            surname: data.surname,
            email: data.email,
            position: data.position,
          },
          updateProjectUserId: data.id,
        },
      });
    } catch (error) {
      console.error('Error editing crew member:', error);
      throw error;
    }
  };

  const deleteCrewMember = async (projectUserId: string) => {
    try {
      await deleteProjectUser({
        variables: {
          projectUserId,
        },
      });
      console.log('User deleted successfully from project');
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  const deleteCrewMemberInvitation = async (projectUserId: string) => {
    try {
      await deleteProjectInvitation({
        variables: {
          projectUserId,
        },
      });
      console.log('User deleted successfully from project');
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  return {
    addCrewMember,
    sendEmailInvitation,
    editCrewMember,
    deleteCrewMember,
    deleteCrewMemberInvitation,
  };
};
