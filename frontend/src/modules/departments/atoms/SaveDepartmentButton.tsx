import { CheckIcon } from '@chakra-ui/icons';
import { IconButton, IconButtonProps, Tooltip } from '@chakra-ui/react';

interface SaveDepartmentButtonProps extends IconButtonProps {
  departmentId: string;
  handleSave: (id: string) => void;
}

export const SaveDepartmentButton = ({
  departmentId,
  handleSave,
  ...buttonProps
}: SaveDepartmentButtonProps) => {
  const label = 'Save';
  return (
    <Tooltip label={label} aria-label={label} placement="top" rounded={'lg'}>
      <IconButton
        {...buttonProps}
        aria-label={label}
        ariant="outline"
        borderWidth={1}
        colorScheme="orange"
        size="xs"
        icon={<CheckIcon />}
        onClick={() => {
          handleSave(departmentId);
        }}
      />
    </Tooltip>
  );
};
