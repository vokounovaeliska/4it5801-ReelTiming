import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DragHandleIcon } from '@chakra-ui/icons';
import { Checkbox, IconButton, Input, Td, Tr } from '@chakra-ui/react';
import { useDrag, useDrop } from 'react-dnd';

import { UPDATE_DEPARTMENT_ORDER } from '@frontend/graphql/mutations/UpdateDepartmentOrder';
import { Department } from '@frontend/modules/dailyreport/interfaces/interface';
import {
  showErrorToast,
  showSuccessToast,
} from '@frontend/shared/design-system/molecules/toastUtils';

import { CancelDepartmentButton } from './CancelDepartmentButton';
import { EditDepartmentButton } from './EditDepartmentButton';
import { SaveDepartmentButton } from './SaveDepartmentButton';

interface EditableDepartmentTableRowProps {
  department: Department;
  projectId: string;
  index: number;
  handleMoveDepartment: (
    dragIndex: number,
    hoverIndex: number,
    isDragging: boolean,
  ) => void;
  handleDragEnd: () => void;
}

export const EditableDepartmentTableRow = ({
  department,
  projectId,
  index,
  handleMoveDepartment,
  handleDragEnd,
}: EditableDepartmentTableRowProps) => {
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    name: department.name,
    is_visible: department.is_visible ?? false,
    order_index: department.order_index ?? 0,
  });

  const [updateDepartment, { loading }] = useMutation(UPDATE_DEPARTMENT_ORDER);

  const handleEdit = () => {
    setEditRowId(department.id);
    setFormState({
      name: department.name,
      is_visible: department.is_visible ?? false,
      order_index: department.order_index ?? 0,
    });
  };

  const handleSave = async () => {
    try {
      await updateDepartment({
        variables: {
          id: department.id,
          data: {
            project_id: projectId,
            name: formState.name,
            is_visible: formState.is_visible,
            order_index: formState.order_index,
          },
        },
      });
      showSuccessToast('Department updated successfully!');
      setEditRowId(null);
    } catch (err) {
      console.error('Failed to update department:', err);
      showErrorToast('Failed to update department.');
    }
  };

  const handleCancel = () => {
    setEditRowId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const ref = React.useRef<HTMLTableRowElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'DEPARTMENT',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => handleDragEnd(),
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
    <Tr
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <Td width="40px" py={1} px={2}>
        <DragHandleIcon cursor="grab" />
      </Td>

      <Td py={1} px={2}>
        {editRowId === department.id ? (
          <Input
            size="sm"
            rounded="md"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Department Name"
          />
        ) : (
          department.name
        )}
      </Td>

      <Td py={1} px={2}>
        {editRowId === department.id ? (
          <Checkbox
            size="sm"
            colorScheme="orange"
            name="is_visible"
            isChecked={formState.is_visible}
            onChange={handleChange}
          >
            Visible
          </Checkbox>
        ) : (
          <Checkbox
            size="sm"
            isChecked={department.is_visible ?? false}
            isDisabled
          >
            Visible
          </Checkbox>
        )}
      </Td>

      <Td py={1} px={2} textAlign="center">
        {editRowId === department.id ? (
          <>
            <SaveDepartmentButton
              departmentId={department.id}
              handleSave={handleSave}
              isLoading={loading}
              mr={2}
              aria-label={'Save'}
            />
            <CancelDepartmentButton
              handleCancel={handleCancel}
              mr={2}
              aria-label={'Cancel'}
            />
          </>
        ) : (
          <IconButton
            aria-label="Edit Department"
            icon={
              <EditDepartmentButton
                department={department}
                handleEdit={handleEdit}
                aria-label={'Edit'}
              />
            }
            onClick={handleEdit}
            variant="ghost"
            size="sm"
          />
        )}
      </Td>
    </Tr>
  );
};
