import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip } from '@chakra-ui/react';

interface DeleteCrewButtonProps {
  userId: string;
  handleRemoveButtonClick: (userId: string) => void;
  isDisabled: boolean;
  crewRole?: string | null;
}

export const DeleteCrewButton = ({
  userId,
  isDisabled,
  handleRemoveButtonClick,
  crewRole,
}: DeleteCrewButtonProps) => {
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
        isDisabled={
          crewRole === 'ADMIN' ||
          isDisabled ||
          crewRole === null ||
          crewRole === undefined
        }
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
