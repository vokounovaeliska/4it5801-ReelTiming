import { EditIcon } from '@chakra-ui/icons';
import { IconButton, IconButtonProps, Tooltip } from '@chakra-ui/react';

import { Department } from '@frontend/gql/graphql';

interface EditDepartmentButtonProps extends IconButtonProps {
  department: Department;
  handleEdit: (department: Department) => void;
}

export const EditDepartmentButton = ({
  handleEdit,
  department,
  ...buttonProps
}: EditDepartmentButtonProps) => {
  const label = 'Edit department';
  return (
    <Tooltip
      label={label}
      aria-label={label}
      placement="top"
      bg="orange.500"
      rounded={'lg'}
    >
      <IconButton
        {...buttonProps}
        aria-label={label}
        ariant="outline"
        borderWidth={1}
        colorScheme="orange"
        size="xs"
        icon={<EditIcon />}
        onClick={() => {
          handleEdit(department);
        }}
      />
    </Tooltip>
  );
};
