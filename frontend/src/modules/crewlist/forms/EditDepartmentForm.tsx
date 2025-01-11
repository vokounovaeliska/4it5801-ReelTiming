import { DepartmentInput } from "@frontend/gql/graphql"
import {
   Box,
   Button,
   Checkbox,
   Flex,
   FormControl,
   FormLabel,
   Input,
   Spinner,
   Text,
} from '@chakra-ui/react';
import { useState } from "react";
import { UPDATE_DEPARTMENT_ORDER } from "@frontend/graphql/mutations/UpdateDepartmentOrder";
import { useMutation } from "@apollo/client";

export type CrewListFormProps = {
   department: DepartmentInput,
   projectId: string,
   departmentId: string,
   onSave: (updatedDepartement: any) => void
}

export function EditDepartmentForm({
   department,
   projectId,
   departmentId,
   onSave
}: CrewListFormProps) {

   const [formState, setFormState] = useState(department);
   const [loading, setLoading] = useState(false);
   const [updateDepartment] = useMutation(UPDATE_DEPARTMENT_ORDER);

   const handleInputChange = (field: string, value: any) => {
      setFormState((prev) => ({
         ...prev,
         [field]: field === 'is_visible' ? value : value.trim(),
      }));
   };


   const handleSave = async () => {
      setLoading(true);
      try {
         const { data } = await updateDepartment({
            variables: {
               id: departmentId,
               data: {
                  project_id: projectId,
                  name: formState.name,
                  is_visible: formState.is_visible,
                  order_index: formState.order_index,
               }
            },
         });
         onSave(data?.updateDepartment);
         alert('Department updated successfully!');
      } catch (err) {
         console.error(err);
         alert('Failed to update department.');
      } finally {
         setLoading(false);
      }
   }

   return (
      <Box mb="8" p="4" border="1px" borderColor="gray.200" borderRadius="md">
         <FormControl mb="4">
            <FormLabel>Name</FormLabel>
            <Input
               value={formState.name}
               onChange={(e) => handleInputChange('name', e.target.value)}
            />
         </FormControl>
         <FormControl mb="4">
            <FormLabel>Visible</FormLabel>
            <Checkbox
               isChecked={formState.is_visible ?? false}
               onChange={(e) => handleInputChange('is_visible', e.target.checked)}
            >
               Visible
            </Checkbox>
         </FormControl>
         <FormControl mb="4">
            <FormLabel>Order Index</FormLabel>
            <Input
               type="number"
               value={formState.order_index ?? 100}
               onChange={(e) => handleInputChange('order_index', Number(e.target.value))}
            />
         </FormControl>
         <Flex justifyContent="flex-end">
            <Button
               colorScheme="blue"
               onClick={handleSave}
               isDisabled={!formState.name}
               isLoading={loading}
            >
               Save
            </Button>
         </Flex>
      </Box>
   );
}
