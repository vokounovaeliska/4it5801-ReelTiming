import { Link, Td, Tr } from '@chakra-ui/react';

import { formatPhoneNumber } from '@shared/phoneUtil';

import { CrewInvitationStatus } from '../atoms/CrewInvitationStatus';
import { DeleteCrewButton } from '../atoms/DeleteCrewButton';
import { EditCrewButton } from '../atoms/EditCrewButton';
import { InviteCrewButton } from '../atoms/InviteCrewButton';
import { CrewMemberData, Project, ProjectUser } from '../interfaces/interfaces';

import { CrewlistTableRateCell } from './CrewlistTableRateCell';

export const CrewMemberRow = ({
  user,
  project,
  handleEditMemberClick,
  sendInvitation,
  handleRemoveButtonClick,
}: {
  user: ProjectUser;
  project: Project;
  handleEditMemberClick: (user: CrewMemberData) => void;
  sendInvitation: (
    userId: string,
    name: string,
    email: string,
    resend: boolean,
  ) => void;
  handleRemoveButtonClick: (userId: string) => void;
}) => {
  const userData: CrewMemberData = {
    id: user.id,
    name: user?.name,
    surname: user?.surname,
    department: user.department?.id || 'No Department',
    position: user.position,
    phone_number: user.phone_number ?? '',
    email: user?.email,
    standard_rate: user.rate?.standard_rate || 0,
    compensation_rate: user.rate?.compensation_rate || 0,
    overtime_hour1: user.rate?.overtime_hour1 || 0,
    overtime_hour2: user.rate?.overtime_hour2 || 0,
    overtime_hour3: user.rate?.overtime_hour3 || 0,
    overtime_hour4: user.rate?.overtime_hour4 || 0,
    role: user.role,
    user_id: user.user?.id ?? null,
    rate_id: user.rate?.id || null,
    cars: user.car || null,
  };

  return (
    <Tr
      key={user.id}
      onClick={
        project.is_active ? () => handleEditMemberClick(userData) : undefined
      }
      _hover={
        project.is_active
          ? { cursor: 'pointer', backgroundColor: 'gray.200' }
          : { cursor: 'default', backgroundColor: 'gray.200' }
      }
    >
      <Td
        position="sticky"
        left="0"
        bg="gray.50"
        zIndex={7}
        textOverflow="ellipsis"
        overflow="hidden"
        maxW={{ base: '100px', md: '120px', lg: '150px' }}
        minW={{ md: '120px', lg: '150px' }}
      >
        {user?.surname}
      </Td>
      <Td
        position="sticky"
        zIndex={6}
        left={{ base: '100px', md: '120px', lg: '150px' }}
        bg="gray.50"
        textOverflow="ellipsis"
        overflow="hidden"
        maxW={{ base: '90px', md: '100px', lg: '110px' }}
        minW={{ md: '100px', lg: '110px' }}
      >
        {user?.name}
      </Td>
      <Td
        position={{ base: 'relative', md: 'sticky' }}
        bg={{ md: 'gray.50' }}
        zIndex={5}
        textOverflow="ellipsis"
        overflow="hidden"
        left={{ base: '0', md: '220px', lg: '260px' }}
      >
        {user.position}
      </Td>
      <Td textColor={user.role === 'ADMIN' ? 'orange.500' : 'black'}>
        {user.role}
      </Td>
      <Td>
        <Link
          href={`mailto:${user?.email}`}
          color="blue.500"
          onClick={(e) => e.stopPropagation()}
        >
          {user?.email}
        </Link>
      </Td>
      <Td>
        <Link
          href={`tel:${user.phone_number}`}
          color="blue.500"
          onClick={(e) => e.stopPropagation()}
        >
          {formatPhoneNumber(user.phone_number)}
        </Link>
      </Td>
      <CrewlistTableRateCell
        value={user.rate?.standard_rate}
        currency={project.currency}
      />
      <CrewlistTableRateCell
        value={user.rate?.compensation_rate}
        currency={project.currency}
      />
      <CrewlistTableRateCell
        value={user.rate?.overtime_hour1}
        currency={project.currency}
      />
      <CrewlistTableRateCell
        value={user.rate?.overtime_hour2}
        currency={project.currency}
      />
      <CrewlistTableRateCell
        value={user.rate?.overtime_hour3}
        currency={project.currency}
      />
      <CrewlistTableRateCell
        value={user.rate?.overtime_hour4}
        currency={project.currency}
      />
      <Td textAlign="center">
        <CrewInvitationStatus user={user}></CrewInvitationStatus>
      </Td>
      <Td textAlign="right">
        <InviteCrewButton
          user={user}
          sendInvitation={sendInvitation}
          mr={2}
          aria-label={''}
          isDisabled={!project.is_active}
        />
        <EditCrewButton
          user={userData}
          handleEditMemberClick={handleEditMemberClick}
          aria-label={'Edit member'}
          mr={2}
          isDisabled={!project.is_active}
        />
        <DeleteCrewButton
          userId={user.id}
          crewRole={user?.role}
          handleRemoveButtonClick={handleRemoveButtonClick}
          isDisabled={!project.is_active}
        />
      </Td>
    </Tr>
  );
};
