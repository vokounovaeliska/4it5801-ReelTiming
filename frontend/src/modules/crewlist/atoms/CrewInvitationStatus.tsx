import { CheckIcon, MinusIcon, TimeIcon } from '@chakra-ui/icons';
import { Badge, Box, Icon } from '@chakra-ui/react';

import { ProjectUser } from '../interfaces/interfaces';

interface CrewInvitationStatusProps {
  user: ProjectUser;
}

export const CrewInvitationStatus = ({ user }: CrewInvitationStatusProps) => {
  const joined = user.invitation != null && user.is_active;
  const pending = user.invitation != null && !user.is_active;
  const notInvited = user.invitation == null && !user.is_active;

  let statusText = '';
  let statusColor = '';
  let IconComponent = null;

  if (joined) {
    statusText = 'Joined';
    statusColor = 'green';
    IconComponent = CheckIcon;
  } else if (pending) {
    statusText = 'Pending';
    statusColor = 'gray';
    IconComponent = TimeIcon;
  } else if (notInvited) {
    statusText = 'Not Invited';
    statusColor = 'red';
    IconComponent = MinusIcon;
  }

  return (
    <Box>
      <Badge
        color={statusColor + '.600'}
        borderWidth={1}
        borderColor={statusColor + '.300'}
        colorScheme={statusColor}
        fontSize="x-small"
        rounded={'md'}
      >
        {IconComponent && <Icon as={IconComponent} mr={1} />}
        {statusText}
      </Badge>
    </Box>
  );
};
