import { useDrag, useDrop } from 'react-dnd';
import React, { useState } from 'react';
import { Tr, Td } from '@chakra-ui/react';
import { Department } from '@frontend/modules/dailyreport/interfaces/interface';
import { UPDATE_DEPARTMENT_ORDER } from "@frontend/graphql/mutations/UpdateDepartmentOrder";
import { useMutation } from '@apollo/client';
import { EditDepartmentButton } from '../atoms/EditDepartmentButton';
import { CancelDepartmentButton } from '../atoms/CancelDepartmentButton';

interface EditableDepartmentTableRowProps {
   department: Department,
   projectId: string,
   index: number,
   handleMoveDepartment: (dragIndex: number, hoverIndex: number, isDragging: boolean) => void,
   handleDragEnd: () => void;
}

export const EditableDepartmentTableRow: React.FC<EditableDepartmentTableRowProps> = ({ department, projectId, index, handleMoveDepartment, handleDragEnd }) => {
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
      setEditRowId(null);
   };

   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormState((prevState) => ({
         ...prevState,
         [name]: type === "checkbox" ? checked : value,
      }));
   };

   const ref = React.useRef<HTMLTableRowElement>(null);

   const [{ isDragging }, drag] = useDrag({
      type: 'DEPARTMENT',
      item: { index },
      collect: (monitor) => ({
         isDragging: monitor.isDragging(),
      }),
      end: () => {
         handleDragEnd();
      }
   });

   const [, drop] = useDrop({
      accept: 'DEPARTMENT',
      hover: (item: { index: number }) => {
         if (item.index !== index) {
            handleMoveDepartment(item.index, index, isDragging);
            item.index = index;
         }
      },
   });

   drag(drop(ref));

   return (
      <Tr key={department.id} ref={ref}
         style={{
            opacity: isDragging ? 0.5 : 1,
            cursor: 'move',
         }}>
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
                  <CancelDepartmentButton
                     handleCancel={handleCancel}
                     aria-label={'Edit department'}
                     mr={2}
                  />
               </>
            ) : (
               <EditDepartmentButton
                  handleEdit={handleEdit}
                  department={department}
                  aria-label={'Edit department'}
                  mr={2}
               />
            )}
         </Td>
      </Tr>

   )
}
