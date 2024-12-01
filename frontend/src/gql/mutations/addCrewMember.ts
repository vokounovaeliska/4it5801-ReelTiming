import { useMutation } from '@apollo/client';
import { ADD_RATE } from './AddRate';
import { ADD_PROJECT_USER } from './AddProjectUser';
import { INVITE_USER_TO_PROJECT } from './InviteUserToProject';
import { EDIT_RATE } from './EditRate';
import { EDIT_PROJECT_USER } from './EditProjectUser';
import { DELETE_PROJECT_USER } from '../queries/DeleteProjectUser';
import { DELETE_INVITATION } from './DeleteInvitation';
import { ADD_CAR } from './AddCar';

interface CrewMemberData {
  id: string;
  name: string;
  surname: string;
  department: string;
  position: string;
  phone_number: string;
  email: string;
  standard_rate: number;
  compensation_rate: number;
  overtime_hour1: number;
  overtime_hour2: number;
  overtime_hour3: number;
  overtime_hour4: number;
  role: string;
  user_id: string | null;
  rate_id: string | null;
  cars: CarData[] | null;
}

interface CarData {
  vehicle_name: string;
  included_mileage: number;
  extra_mileage: number;
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

  const addCrewMember = async (data: CrewMemberData, projectId: string) => {
    try {
      // Add Rate
      const responseRate = await addRate({
        variables: {
          standardRate: data.standard_rate,
          compensationRate: data.compensation_rate,
          overtimeHour1: data.overtime_hour1,
          overtimeHour2: data.overtime_hour2,
          overtimeHour3: data.overtime_hour3,
          overtimeHour4: data.overtime_hour4,
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
          role: data.role,
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

  const editCrewMember = async (data: CrewMemberData, projectId: string) => {
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
          rateId: data.rate_id,
        },
      });

      if (data.cars !== null) {
        for (const car of data.cars) {
          await addCar({
            variables: {
              kilometerRate: car.included_mileage,
              kilometerAllow: car.extra_mileage,
              name: car.vehicle_name,
              projectUserId: data.id,
            },
          });
        }
      }

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
