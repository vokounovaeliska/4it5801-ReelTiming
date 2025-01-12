import { EditIcon } from '@chakra-ui/icons';
import { IconButton, IconButtonProps, Tooltip } from '@chakra-ui/react';

import { CrewMemberData } from '../interfaces/interfaces';

interface EditCrewButtonProps extends IconButtonProps {
  user: CrewMemberData;
  handleEditMemberClick: (user: CrewMemberData) => void;
  isDisabled: boolean;
}

export const EditCrewButton = ({
  user,
  handleEditMemberClick,
  isDisabled,
  ...buttonProps
}: EditCrewButtonProps) => {
  const label = 'Edit member';
  return (
    <Tooltip
      label={label}
      aria-label={label}
      placement="top"
      bg="gray.500"
      rounded={'lg'}
    >
      <IconButton
        {...buttonProps}
        aria-label={label}
        ariant="outline"
        borderWidth={1}
        borderColor="gray.300"
        bg={'white'}
        size="xs"
        icon={<EditIcon color="gray.500" />}
        onClick={(e) => {
          e.stopPropagation();
          handleEditMemberClick(user);
        }}
        isDisabled={isDisabled}
      />
    </Tooltip>
  );
};
