import React from 'react';

import {
  AllCarsOnProjectData,
  Car,
  CarStatement,
} from '@frontend/modules/timesheets/interfaces';
import CustomModal from '@frontend/shared/forms/molecules/CustomModal';

import { CrewListForm } from '../forms/CrewListForm';
import { CrewMemberData, ProjectUser } from '../interfaces/interfaces';

interface CrewListModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSubmitting: boolean;
  allCarsOnProjectLoading: boolean;
  selectedCrewMember: CrewMemberData | null;
  projectId: string;
  crewList: {
    departments: { id: string; name: string }[];
    userRoleInProject: string;
    project: { currency: string };
  };
  allCarsOnProjectData: { projectUsers: ProjectUser[] };
  projectCarStatements: { carStatementsByProjectId: CarStatement[] };
  handleUpdateCrewMember: (
    data: CrewMemberData,
    oldCars: Car[] | null,
  ) => Promise<void>;
  handleAddNewCrewMember: (
    data: CrewMemberData,
    sendInvite: boolean,
    name: string,
    email: string,
  ) => Promise<void>;
  refetchAllCarsOnProjectData: () => void;
}

function getAvailableCarsForProjectUserId(
  givenUser: string,
  allCarsOnProjectData: AllCarsOnProjectData,
): Car[] {
  interface ProjectUserWithCars extends ProjectUser {
    car?: Car[];
  }

  const filteredCarsOnProject: ProjectUserWithCars[] =
    allCarsOnProjectData?.projectUsers.filter(
      (projectUser: ProjectUser): projectUser is ProjectUserWithCars =>
        projectUser.id === givenUser,
    );

  const carDetails = filteredCarsOnProject?.flatMap((projectUser) =>
    projectUser.car?.map((car: Car) => ({
      id: car.id,
      name: car.name,
      kilometer_allow: car.kilometer_allow,
      kilometer_rate: car.kilometer_rate,
    })),
  );
  console.log(carDetails?.filter((car): car is Car => car !== undefined) || []);
  return carDetails?.filter((car): car is Car => car !== undefined) || [];
}
const CrewListModal: React.FC<CrewListModalProps> = ({
  isOpen,
  onClose,
  isSubmitting,
  allCarsOnProjectLoading,
  selectedCrewMember,
  projectId,
  crewList,
  allCarsOnProjectData,
  projectCarStatements,
  handleUpdateCrewMember,
  handleAddNewCrewMember,
  refetchAllCarsOnProjectData,
}) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={selectedCrewMember ? 'Edit Crew Member' : 'Add Crew Member'}
      size="6xl"
    >
      <CrewListForm
        projectId={projectId}
        onSubmit={async (data, sendInvite, cars, oldCars) => {
          if (selectedCrewMember) {
            await handleUpdateCrewMember(
              {
                ...data,
                id: selectedCrewMember.id,
                user_id: selectedCrewMember.user_id,
                rate_id: selectedCrewMember.rate_id,
                cars: cars,
              },
              oldCars,
            );
          } else {
            await handleAddNewCrewMember(
              { ...data, id: '', user_id: null, rate_id: null, cars: null },
              sendInvite,
              data.name,
              data.email,
            );
          }
          refetchAllCarsOnProjectData();
        }}
        isLoading={isSubmitting || allCarsOnProjectLoading}
        departments={crewList.departments}
        initialValues={selectedCrewMember ?? undefined}
        mode={selectedCrewMember ? 'edit' : 'add'}
        userRole={crewList.userRoleInProject}
        projectCurrency={crewList.project.currency}
        cars={
          selectedCrewMember
            ? getAvailableCarsForProjectUserId(
                selectedCrewMember.id,
                allCarsOnProjectData,
              )
            : []
        }
        carStatements={projectCarStatements.carStatementsByProjectId ?? []}
      />
    </CustomModal>
  );
};

export default CrewListModal;
