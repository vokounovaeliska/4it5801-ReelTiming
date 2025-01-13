import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_DEPARTMENT } from '@frontend/graphql/mutations/CreateDepartment';

interface CreateDepartmentFormProps {
   projectId: string;
   onSave: (department: any) => void;
   onCancel: () => void;
}

export const CreateDepartmentForm = ({ projectId, onSave, onCancel }: CreateDepartmentFormProps) => {
   const [name, setName] = useState('');
   const [isVisible, setIsVisible] = useState(true);
   const [addDepartment] = useMutation(CREATE_DEPARTMENT);
   const [loading, setLoading] = useState(false);

   const handleSubmit = async () => {
      try {
         setLoading(true);

         const { data } = await addDepartment({
            variables: {
               name,
               isVisible,
               orderIndex: 0,
               projectId,
            },
         });

         const newDepartment = {
            id: data.addDepartment.id,
            name,
            is_visible: isVisible,
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
            <label>
               Name:
               <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
               />
            </label>
            <label>
               Visible:
               <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={(e) => setIsVisible(e.target.checked)}
               />
            </label>
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

