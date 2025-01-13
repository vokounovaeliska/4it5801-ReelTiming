import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LockIcon } from '@chakra-ui/icons';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import {
  Box,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
  Table,
} from '@chakra-ui/react';
import { UPDATE_DEPARTMENT_ORDER } from "@frontend/graphql/mutations/UpdateDepartmentOrder";
import { Department } from '@frontend/modules/dailyreport/interfaces/interface';
import { EditableDepartmentTableRow } from '@frontend/modules/crewlist/table/EditableDepartmentTableRow';
import { DepartmentProps } from '../interfaces/interfaces';


interface DepartmentTableProps {
  departments: Department[];
  projectId: string;
  handleMoveDepartment: (dragIndex: number, hoverIndex: number, isDragging: boolean) => void;
  handleUpdateDepartmentOrder: (id: string, data: DepartmentProps) => void;
  handleDragEnd: () => void;
}

const tableHeaders = [
  { label: 'Department', tooltip: 'Department name' },
  { label: 'Visible', tooltip: 'Department visible in project' },
  { label: 'Actions' },
];


export const DepartmentTable: React.FC<DepartmentTableProps> = ({
  departments,
  projectId,
  handleMoveDepartment,
  handleUpdateDepartmentOrder,
  handleDragEnd,
}) => {
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    is_visible: false,
    order_index: 0,
  });


  const [updateDepartment, { loading }] = useMutation(UPDATE_DEPARTMENT_ORDER);

  const handleEdit = (department) => {
    setEditRowId(department.id);
    setFormState({
      name: department.name,
      is_visible: department.is_visible ?? false,
      order_index: department.order_index ?? 0,
    });
  };

  const handleSave = async (departmentId) => {
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

  return (
    <Box maxWidth="100%" >
      <DndProvider backend={HTML5Backend}>
        <TableContainer className="custom-scrollbar">
          <Box
            overflowX="auto"
            overflowY="auto"
            maxHeight={'67vh'}
            sx={{
              '::-webkit-scrollbar': {
                height: '12px',
              },
              '::-webkit-scrollbar-track': {
                background: '#2D3748',
              },
              '::-webkit-scrollbar-thumb': {
                background: '#888',
                borderRadius: '6px',
              },
              '::-webkit-scrollbar-thumb:hover': {
                background: '#555',
              },
              scrollbarWidth: 'thin',
              scrollbarColor: '#2D3748 white',
            }}
          >
            <Table variant="simple" size="sm">
              <Thead position="sticky" top={0} zIndex="docked">
                <Tr>
                  {tableHeaders.map((header, index) => (
                    <Td
                      bg="gray.50"
                      borderTop="solid"
                      borderColor="gray.300"
                      style={{ fontWeight: 'bold', textAlign: 'left' }}>
                      {header.label}
                    </Td>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {departments
                  .map((department, index) => (
                    <EditableDepartmentTableRow department={department} projectId={projectId} index={department.order_index ?? index} handleMoveDepartment={handleMoveDepartment} handleDragEnd={handleDragEnd} />
                  ))}
              </Tbody>
            </Table>
          </Box >
        </TableContainer >
      </DndProvider>
    </Box >
  )
}
