import { useApolloClient, useQuery } from '@apollo/client';
import { useAuth } from '@frontend/modules/auth';
import { useCrewMemberMutations } from '@frontend/graphql/mutations/addCrewMember';
import { GET_CREWLIST_INFO } from '@frontend/graphql/queries/GetCrewListInfo';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CrewMemberData, ProjectUser } from '../interfaces/interfaces';
import {
  showErrorToast,
  showSuccessToast,
} from '@frontend/shared/design-system/molecules/toastUtils';
import { Car } from '@frontend/modules/timesheets/interfaces';

export const useCrewListPageUtils = () => {
  const auth = useAuth();
  const client = useApolloClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [userIdToRemove, setUserIdToRemove] = useState<string | null>(null);
  const [selectedCrewMember, setSelectedCrewMember] =
    useState<CrewMemberData | null>(null);
  const { projectId } = useParams<{ projectId: string }>();

  const sanitizeCrewMemberData = (data: CrewMemberData): CrewMemberData => ({
    ...data,
    standard_rate: data.standard_rate || 0,
    compensation_rate: data.compensation_rate || 0,
    overtime_hour1: data.overtime_hour1 || 0,
    overtime_hour2: data.overtime_hour2 || 0,
    overtime_hour3: data.overtime_hour3 || 0,
    overtime_hour4: data.overtime_hour4 || 0,
    position: data.position ?? '',
  });

  const {
    data: crewListData,
    loading: crewListLoading,
    error: crewListError,
  } = useQuery(GET_CREWLIST_INFO, {
    variables: { projectId: projectId!, userId: auth.user?.id! },
    skip: !projectId || !auth.user?.id,
    fetchPolicy: 'cache-and-network',
  });

  const crewList = crewListData;

  const {
    addCrewMember,
    sendEmailInvitation,
    editCrewMember,
    deleteCrewMember,
    deleteCrewMemberInvitation,
  } = useCrewMemberMutations();

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCrewMember(null);
  };

  const handleAddMemberClick = () => {
    setSelectedCrewMember(null);
    setIsModalOpen(true);
  };

  const handleAddNewCrewMember = async (
    data: CrewMemberData,
    sendInvite: boolean,
    name: string,
    email: string,
  ) => {
    setIsSubmitting(true);
    try {
      const { responseId } = await addCrewMember(data, projectId!);

      const cacheData = client.readQuery({
        query: GET_CREWLIST_INFO,
        variables: { projectId: projectId!, userId: auth.user?.id! },
      });

      if (cacheData && cacheData.projectUsers) {
        const newUser = {
          ...data,
          id: responseId?.data?.addProjectUser.id,
          invitation: sendInvite ? true : null,
          rate_id: responseId?.data?.addProjectUser.project,
          user: null,
          is_active: false,
        };

        client.writeQuery({
          query: GET_CREWLIST_INFO,
          variables: { projectId: projectId!, userId: auth.user?.id! },
          data: {
            ...cacheData,
            projectUsers: [...cacheData.projectUsers, newUser],
          },
        });

        if (sendInvite) {
          await sendEmailInvitation(
            responseId?.data?.addProjectUser?.id ?? '',
            name,
            email,
          );
        }

        showSuccessToast('Crew member added successfully');
        handleModalClose();
      } else {
        console.error('Error: cacheData or projectUsers is null');
        showErrorToast('Failed to add crew member. Please try again.');
      }
    } catch (error) {
      console.error('Error adding new crew member:', error);
      showErrorToast('Failed to add crew member. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditMemberClick = (crewMember: CrewMemberData) => {
    const sanitizedCrewMember = sanitizeCrewMemberData(crewMember);
    setSelectedCrewMember({
      ...sanitizedCrewMember,
      department: sanitizedCrewMember.department || 'No Department',
    });
    setIsModalOpen(true);
  };

  const handleUpdateCrewMember = async (
    data: CrewMemberData,
    oldCars: Car[] | null,
  ) => {
    setIsSubmitting(true);
    try {
      let departmentId = data.department;
      if (
        !crewList?.departments.some(
          (dept: { id: string }) => dept.id === departmentId,
        )
      ) {
        departmentId =
          departmentNameToId(data.department, crewList?.departments ?? []) ||
          '';
      }
      if (!departmentId) {
        throw new Error('Invalid department ID');
      }
      const updatedData = {
        ...data,
        department: data.department,
      };
      await editCrewMember(updatedData, projectId!, oldCars);
      const cacheData = client.readQuery({
        query: GET_CREWLIST_INFO,
        variables: { projectId: projectId!, userId: auth.user?.id! },
      });

      const updatedUsers = (cacheData?.projectUsers || []).map((user: any) => {
        if (user.id === data.id) {
          return {
            ...user,
            ...updatedData,
          };
        }
        return user;
      });

      client.writeQuery({
        query: GET_CREWLIST_INFO,
        variables: { projectId: projectId!, userId: auth.user?.id! },
        data: {
          ...cacheData,
          projectUsers: updatedUsers,
        },
      });
      showSuccessToast('Crew member updated successfully');
      handleModalClose();
    } catch (error) {
      console.error('Error updating crew member:', error);
      showErrorToast('Failed to update crew member. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveButtonClick = (projectUserId: string) => {
    setUserIdToRemove(projectUserId);
    setIsAlertOpen(true);
  };

  const handleRemoveUser = async (projectUserId: string) => {
    try {
      await deleteCrewMember(projectUserId);
      const data = client.readQuery({
        query: GET_CREWLIST_INFO,
        variables: { projectId: projectId!, userId: auth.user?.id! },
      });
      const updatedUsers = data?.projectUsers.filter(
        (user: ProjectUser) => user.id !== projectUserId,
      );
      client.writeQuery({
        query: GET_CREWLIST_INFO,
        variables: { projectId: projectId!, userId: auth.user?.id! },
        data: {
          ...data,
          projectUsers: updatedUsers,
        },
      });
      showSuccessToast('Crew member removed successfully');
    } catch (error) {
      console.error('Error removing user from project:', error);
      showErrorToast(
        'Failed to remove user from the project. Please try again.',
      );
    }
  };

  const sendInvitation = async (
    projectUserId: string,
    name: string,
    email: string,
    resending: boolean,
  ) => {
    try {
      if (!projectUserId || !auth.user?.id) {
        throw new Error('projectUserId or user ID is missing.');
      }
      if (resending) {
        await deleteCrewMemberInvitation(projectUserId!);
      }
      await sendEmailInvitation(projectUserId, name, email);

      const data = client.readQuery({
        query: GET_CREWLIST_INFO,
        variables: { projectId: projectId!, userId: auth.user?.id! },
      });

      const updatedUsers = data?.projectUsers.map((user: any) => {
        if (user.id === projectUserId) {
          return {
            ...user,
            invitation: true,
          };
        }
        return user;
      });

      client.writeQuery({
        query: GET_CREWLIST_INFO,
        variables: { projectId: projectId!, userId: auth.user?.id! },
        data: {
          ...data,
          projectUsers: updatedUsers,
        },
      });
      showSuccessToast('Invitation email sent successfully');
    } catch (error) {
      console.error('Error sending invitation email:', error);
      showErrorToast('Failed to send invitation email. Please try again.');
    }
  };

  const departmentNameToId = (
    name: string,
    departments: { name: string; id: string }[],
  ): string | null => {
    const department = departments.find((dept) => dept.name === name);
    return department ? department.id : null;
  };

  return {
    auth,
    client,
    isSubmitting,
    setIsSubmitting,
    isModalOpen,
    setIsModalOpen,
    isAlertOpen,
    setIsAlertOpen,
    userIdToRemove,
    setUserIdToRemove,
    selectedCrewMember,
    setSelectedCrewMember,
    projectId,
    sanitizeCrewMemberData,
    crewListData,
    crewListLoading,
    crewListError,
    crewList,
    addCrewMember,
    sendEmailInvitation,
    editCrewMember,
    deleteCrewMember,
    deleteCrewMemberInvitation,
    handleModalClose,
    handleAddMemberClick,
    handleAddNewCrewMember,
    handleEditMemberClick,
    handleUpdateCrewMember,
    handleRemoveButtonClick,
    handleRemoveUser,
    departmentNameToId,
    sendInvitation,
  };
};
