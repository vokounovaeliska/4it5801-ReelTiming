import { EditIcon } from '@chakra-ui/icons';
import { IconButton, IconButtonProps, Tooltip } from '@chakra-ui/react';
import { Department } from '@frontend/gql/graphql';

interface EditDepartmentButton extends IconButtonProps {
   department: Department,
   handleEdit: (department: Department) => void;
}

export const EditDepartmentButton = ({
   handleEdit,
   department,
   ...buttonProps
}: EditDepartmentButton) => {
   const label = 'Edit department';
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
            onClick={() => {
               handleEdit(department)
            }}
         />
      </Tooltip>
   );
};

