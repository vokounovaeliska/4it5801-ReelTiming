import { CloseIcon } from '@chakra-ui/icons';
import { IconButton, IconButtonProps, Tooltip } from '@chakra-ui/react';

interface EditDepartmentButton extends IconButtonProps {
   handleCancel: () => void;
}

export const CancelDepartmentButton = ({
   handleCancel,
   ...buttonProps
}: EditDepartmentButton) => {
   const label = 'Cancel department';
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
            icon={<CloseIcon color="gray.500" />}
            onClick={() => {
               handleCancel()
            }}
         />
      </Tooltip>
   );
};

