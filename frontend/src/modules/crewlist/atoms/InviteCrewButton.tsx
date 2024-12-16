import { EmailIcon } from '@chakra-ui/icons';
import { IconButton, IconButtonProps, Tooltip } from '@chakra-ui/react';

import { ProjectUser } from '../interfaces/interfaces';

interface InviteCrewButtonProps extends IconButtonProps {
  user: ProjectUser;
  sendInvitation: (
    userId: string,
    name: string,
    email: string,
    resend: boolean,
  ) => void;
}

export const InviteCrewButton = ({
  user,
  sendInvitation,
  ...buttonProps
}: InviteCrewButtonProps) => {
  const joined = user.invitation != null && user.is_active;
  const invitationNotSent = user.invitation == null && !user.is_active;
  const invitationSent = user.invitation != null && !user.is_active;

  if (joined) return <></>;

  const tooltipLabel = invitationNotSent
    ? 'Send invitation'
    : 'Resend invitation';

  return (
    <Tooltip
      label={tooltipLabel}
      aria-label={tooltipLabel}
      placement="top"
      bg="orange.500"
      rounded={'lg'}
    >
      <IconButton
        {...buttonProps}
        aria-label={tooltipLabel}
        colorScheme="orange"
        variant="outline"
        size="xs"
        isDisabled={joined}
        icon={<EmailIcon color="orange.500" />}
        onClick={(e) => {
          e.stopPropagation();
          if (invitationNotSent) {
            sendInvitation(user.id, user?.name, user?.email, false);
          } else if (invitationSent) {
            sendInvitation(user.id, user?.name, user?.email, true);
          }
        }}
      />
    </Tooltip>
  );
};
