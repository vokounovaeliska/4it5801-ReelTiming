import { useMutation } from '@apollo/client';
import { ADD_INACTIVE_USER } from './AddInactiveUser';
import { ADD_RATE } from './AddRate';
import { ADD_PROJECT_USER } from './AddProjectUser';
import { INVITE_USER_TO_PROJECT } from './InviteUserToProject';
import { EDIT_USER } from './EditUser';
import { EDIT_RATE } from './EditRate';
import { EDIT_PROJECT_USER } from './EditProjectUser';

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
}

export const useCrewMemberMutations = () => {
  const [addInactiveUser] = useMutation(ADD_INACTIVE_USER);
  const [addRate] = useMutation(ADD_RATE);
  const [addProjectUser] = useMutation(ADD_PROJECT_USER);
  const [inviteUserToProject] = useMutation(INVITE_USER_TO_PROJECT);
  const [editUser] = useMutation(EDIT_USER);
  const [editRate] = useMutation(EDIT_RATE);
  const [editProjectUser] = useMutation(EDIT_PROJECT_USER);

  const addCrewMember = async (data: CrewMemberData, projectId: string) => {
    try {
      // First Mutation - Add Inactive User
      const responseUser = await addInactiveUser({
        variables: {
          email: data.email,
          name: data.name,
          surname: data.surname,
          phone_number: data.phone_number,
        },
      });
      const userId = responseUser.data?.addInactiveUser?.id;

      // Second Mutation - Add Rate
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

      // Third Mutation - Add Project User
      await addProjectUser({
        variables: {
          userId: userId,
          projectId: projectId,
          phoneNumber: data.phone_number,
          rateId: rateId,
          departmentId: data.department,
          role: data.role,
          position: data.position,
          name: data.name,
          surname: data.surname,
          email: data.email,
        },
      });

      return { userId }; // Return userId for use in invitation
    } catch (error) {
      console.error('Error adding crew member:', error);
      throw error;
    }
  };

  const sendEmailInvitation = async (projectId: string, userId: string) => {
    try {
      await inviteUserToProject({
        variables: {
          userId,
          projectId,
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
      await editUser({
        variables: {
          data: {
            email: data.email,
            name: data.name,
            surname: data.surname,
          },
          userId: data.user_id,
        },
      });

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

      await editProjectUser({
        variables: {
          data: {
            user_id: data.user_id,
            project_id: projectId,
            phone_number: data.phone_number,
            department_id: data.department,
            role: data.role,
            rate_id: data.rate_id,
            position: data.position,
          },
          updateProjectUserId: data.id,
        },
      });
    } catch (error) {
      console.error('Error adding crew member:', error);
      throw error;
    }
  };

  return { addCrewMember, sendEmailInvitation, editCrewMember };
};
