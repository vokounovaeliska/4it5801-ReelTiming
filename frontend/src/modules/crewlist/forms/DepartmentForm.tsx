import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_DEPARTMENT } from '@frontend/graphql/mutations/CreateDepartment';
import { Box, Checkbox, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { createDepartmentFormValues } from '@frontend/zod/schemas';

interface CreateDepartmentFormProps {
   projectId: string;
   onSave: (department: any) => void;
   onCancel: () => void;
   formData: createDepartmentFormValues;
   onInputChange: (name: keyof createDepartmentFormValues, value: unknown) => void;
}

export const CreateDepartmentForm = ({ projectId, onSave, onCancel, formData, onInputChange }: CreateDepartmentFormProps) => {
   const [addDepartment] = useMutation(CREATE_DEPARTMENT);
   const [loading, setLoading] = useState(false);

   const handleSubmit = async () => {
      try {
         setLoading(true);

         const { data } = await addDepartment({
            variables: {
               name: formData.name,
               isVisible: formData.isVisible,
               orderIndex: 0,
               projectId,
            },
         });

         const newDepartment = {
            id: data.addDepartment.id,
            name: data.addDepartment.name,
            is_visible: data.addDepartment.isVisible,
            order_index: 0,
            project_id: projectId,
         };

         onSave(newDepartment);
      } catch (error) {
         console.error('Failed to create department:', error);
         alert('Failed to create department.');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div>
         <form
            onSubmit={(e) => {
               e.preventDefault();
               handleSubmit();
            }}
         >
            <Box mb={6}>
               <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                     name="name"
                     autoComplete="on"
                     autoCorrect="off"
                     autoCapitalize="off"
                     value={formData.name}
                     onChange={(e) => onInputChange('name', e.target.value)}
                  />
               </FormControl>
            </Box>
            <Box mb={6}>
               <FormControl isRequired>
                  <FormLabel>Visible</FormLabel>
                  <Checkbox
                     name="isVisible"
                     autoComplete="on"
                     autoCorrect="off"
                     autoCapitalize="off"
                     isChecked={formData.isVisible}
                     onChange={(e) => onInputChange('isVisible', e.target.checked)}
                  />
               </FormControl>
            </Box>
            <div>
               <button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save'}
               </button>
               <button type="button" onClick={onCancel} disabled={loading}>
                  Cancel
               </button>
            </div>
         </form>
      </div>
   );
};

