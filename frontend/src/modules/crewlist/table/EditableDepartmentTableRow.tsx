import React, { useState } from 'react';
import { Tr, Td } from '@chakra-ui/react';
import { Department } from '@frontend/modules/dailyreport/interfaces/interface';
import { UPDATE_DEPARTMENT_ORDER } from "@frontend/graphql/mutations/UpdateDepartmentOrder";
import { useMutation } from '@apollo/client';

interface EditableDepartmentTableRowProps {
   department: Department;
   projectId: string
}

export const EditableDepartmentTableRow: React.FC<EditableDepartmentTableRowProps> = ({ department, projectId }) => {
   const [editRowId, setEditRowId] = useState<string | null>(null);
   const [formState, setFormState] = useState({
      name: "",
      is_visible: false,
      order_index: 0,
   });

   const [updateDepartment, { loading }] = useMutation(UPDATE_DEPARTMENT_ORDER);

   const handleEdit = (department: Department) => {
      setEditRowId(department.id);
      setFormState({
         name: department.name,
         is_visible: department.is_visible ?? false,
         order_index: department.order_index ?? 0,
      });
   };

   const handleSave = async (departmentId: string) => {
      try {
         const { data } = await updateDepartment({
            variables: {
               id: departmentId,
               data: {
                  project_id: projectId,
                  name: formState.name,
                  is_visible: formState.is_visible,
                  order_index: formState.order_index,
               },
            },
         });
         alert("Department updated successfully!");
         setEditRowId(null); // Exit edit mode
      } catch (err) {
         console.error(err);
         alert("Failed to update department.");
      }
   };

   const handleCancel = () => {
      setEditRowId(null); // Exit edit mode without saving
   };

   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormState((prevState) => ({
         ...prevState,
         [name]: type === "checkbox" ? checked : value,
      }));
   };

   return (
      <Tr key={department.id}>
         <Td>
            {editRowId === department.id ? (
               <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
               />
            ) : (
               department.name
            )}
         </Td>
         <Td>
            <input
               type="checkbox"
               name="is_visible"
               checked={editRowId === department.id ? formState.is_visible : (department.is_visible ?? false)}
               onChange={editRowId === department.id ? handleChange : undefined}
               disabled={editRowId !== department.id}
            />
         </Td>
         <Td>
            {editRowId === department.id ? (
               <>
                  <button onClick={() => handleSave(department.id)} disabled={loading}>
                     Save
                  </button>
                  <button onClick={handleCancel}>Cancel</button>
               </>
            ) : (
               <button onClick={() => handleEdit(department)}>Edit</button>
            )}
         </Td>
      </Tr>

   )
}
