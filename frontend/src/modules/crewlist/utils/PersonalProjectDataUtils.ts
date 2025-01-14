import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PERSONAL_PROJECT_INFO } from '@frontend/graphql/queries/GetPersonalProjectInfo';
import { useUserRoleInProject } from '@frontend/shared/design-system/hooks/queryHooks';
import { AuthUser } from '@frontend/modules/auth/auth-core';
import { CrewMemberData } from '../interfaces/interfaces';
import { Car } from '@frontend/modules/timesheets/interfaces';
import { departmentNameToId } from '../pages/CrewListPageLogic';
import { useCrewMemberMutations } from '@frontend/graphql/mutations/addCrewMember';
import { showSuccessToast } from '@frontend/shared/design-system/molecules/toastUtils';
import { useNavigate } from 'react-router-dom';
import { route } from '@frontend/route';

interface PersonalProjectDataUtilsProps {
  auth: AuthUser | null;
  projectId?: string;
}

export const usePersonalProjectDataUtils = ({
  auth: user,
  projectId,
}: PersonalProjectDataUtilsProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { roleData, roleLoading, roleError } = useUserRoleInProject(
    user?.id ?? '',
    projectId ?? '',
  );

  const {
    data: personalProjectData,
    loading: personalProjectLoading,
    error: personalProjectError,
  } = useQuery(GET_PERSONAL_PROJECT_INFO, {
    variables: {
      projectId: projectId ?? '',
      userId: user?.id ?? '',
    },
    skip: !projectId || !user?.id,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });
  const { editCrewMember } = useCrewMemberMutations();

  const handleUpdateCrewMember = async (
    data: CrewMemberData,
    oldCars: Car[] | null,
  ) => {
    setIsSubmitting(true);
    try {
      const departmentId =
        departmentNameToId(
          data.department,
          personalProjectData?.project?.departments ?? [],
        ) || '';
      if (!departmentId) {
        throw new Error('Invalid department ID');
      }
      const updatedData = { ...data, department: departmentId };
      await editCrewMember(updatedData, projectId!, oldCars);
      showSuccessToast('Crew member updated successfully.');
    } catch (error) {
      console.error('Error updating crew member:', error);
    } finally {
      setIsSubmitting(false);
      navigate(route.projectDetail(projectId));
    }
  };

  const loading = personalProjectLoading || roleLoading;

  const error =
    personalProjectError?.message ||
    roleError?.message ||
    (!user && 'User not authenticated');

  return {
    loading,
    error,
    roleData,
    personalProjectData,
    handleUpdateCrewMember,
    isSubmitting,
  };
};
