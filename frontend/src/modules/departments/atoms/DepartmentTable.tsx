import React from 'react';
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Department } from '@frontend/modules/dailyreport/interfaces/interface';

import { EditableDepartmentTableRow } from './EditableDepartmentTableRow';

interface DepartmentTableProps {
  departments: Department[];
  projectId: string;
  handleMoveDepartment: (
    dragIndex: number,
    hoverIndex: number,
    isDragging: boolean,
  ) => void;
  handleDragEnd: () => void;
}

const tableHeaders = [
  { label: '' },
  { label: 'Department', tooltip: 'Department name' },
  { label: 'Visible', tooltip: 'Department visible in project' },
  { label: 'Actions' },
];

export const DepartmentTable: React.FC<DepartmentTableProps> = ({
  departments,
  projectId,
  handleMoveDepartment,
  handleDragEnd,
}) => {
  return (
    <Box>
      <DndProvider backend={HTML5Backend}>
        <TableContainer className="custom-scrollbar">
          <Box
            overflowX="auto"
            overflowY="auto"
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
            <Table variant="simple" size="sm" w="max-content">
              <Thead position="sticky" top={0} zIndex="docked">
                <Tr>
                  {tableHeaders.map((header) => (
                    <Td
                      bg="gray.50"
                      borderTop="solid"
                      borderColor="gray.300"
                      style={{ fontWeight: 'bold', textAlign: 'left' }}
                    >
                      {header.label}
                    </Td>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {departments.map((department, index) => (
                  <EditableDepartmentTableRow
                    department={department}
                    projectId={projectId}
                    index={department.order_index ?? index}
                    handleMoveDepartment={handleMoveDepartment}
                    handleDragEnd={handleDragEnd}
                  />
                ))}
              </Tbody>
            </Table>
          </Box>
        </TableContainer>
      </DndProvider>
    </Box>
  );
};
