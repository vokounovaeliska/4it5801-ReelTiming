import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip } from '@chakra-ui/react';

interface DeleteCrewButtonProps {
  userId: string;
  userRoleInProject: string;
  // authUserId: string | undefined;
  handleRemoveButtonClick: (userId: string) => void;
  isDisabled: boolean;
}

export const DeleteCrewButton = ({
  userId,
  userRoleInProject,
  // authUserId,
  isDisabled,
  handleRemoveButtonClick,
}: DeleteCrewButtonProps) => {
  if (userRoleInProject === 'CREW') {
    return null;
  }

  const label = 'Remove record';

  return (
    <Tooltip
      label={label}
      aria-label={label}
      placement="top"
      bg="red.600"
      rounded={'lg'}
    >
      <IconButton
        isDisabled={userRoleInProject === 'ADMIN' || isDisabled}
        aria-label={label}
        icon={<DeleteIcon />}
        colorScheme="red"
        size="xs"
        onClick={(e) => {
          e.stopPropagation();
          handleRemoveButtonClick(userId);
        }}
      />
    </Tooltip>
  );
};
