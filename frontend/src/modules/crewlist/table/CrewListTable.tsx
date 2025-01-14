import React from 'react';
import { Box, Table, TableContainer, Tbody, Thead, Tr } from '@chakra-ui/react';

import { CrewMemberData, Project, ProjectUser } from '../interfaces/interfaces';

import { CrewlistTableHeader } from './CrewlistTableHeader';
import { CrewMemberRow } from './CrewMemberRow';
import { DepartmentRow } from './DepartmentRow';

interface CrewListTableProps {
  sortedDepartments: string[];
  groupedByDepartment: Record<string, ProjectUser[]>;
  handleEditMemberClick: (user: CrewMemberData) => void;
  handleRemoveButtonClick: (userId: string) => void;
  sendInvitation: (
    userId: string,
    name: string,
    email: string,
    resend: boolean,
  ) => void;
  userRoleInProject: string;
  project: Project;
  columnVisibility: Record<string, boolean>;
}

const tableHeaders = [
  { label: 'Surname', key: 'surname' },
  { label: 'Name', key: 'name' },
  { label: 'Position', key: 'position' },
  { label: 'Role', key: 'role' },
  { label: 'Email', key: 'email' },
  { label: 'Phone number', key: 'phone_number' },
  { label: 'Rate', key: 'standard_rate' },
  { label: 'TA', key: 'compensation_rate' },
  { label: 'OT 1', key: 'overtime_hour1' },
  { label: 'OT 2', key: 'overtime_hour2' },
  { label: 'OT 3', key: 'overtime_hour3' },
  { label: 'OT 4', key: 'overtime_hour4' },
];

const CrewListTable: React.FC<CrewListTableProps> = ({
  sortedDepartments,
  groupedByDepartment,
  handleEditMemberClick,
  handleRemoveButtonClick,
  sendInvitation,
  userRoleInProject,
  project,
  columnVisibility,
}) => {
  return (
    <Box overflowX="auto" m={1}>
      <TableContainer className="custom-scrollbar">
        <Box
          overflowX="auto"
          overflowY="auto"
          maxHeight={'76vh'}
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
          <Table
            variant="simple"
            size="sm"
            mb={2}
            sx={{
              'tr:hover td': {
                backgroundColor: 'gray.200',
              },
            }}
          >
            <Thead position="sticky" top={0} zIndex="docked">
              <Tr>
                {tableHeaders.map(
                  (header) =>
                    columnVisibility[header.key] && (
                      <CrewlistTableHeader key={header.key}>
                        {header.label}
                      </CrewlistTableHeader>
                    ),
                )}
              </Tr>
            </Thead>
            <Tbody>
              {sortedDepartments.map((departmentName) => (
                <>
                  <DepartmentRow
                    key={departmentName}
                    departmentName={departmentName}
                  />
                  {groupedByDepartment[departmentName]?.map((user) => (
                    <CrewMemberRow
                      key={user.id}
                      user={user}
                      project={project}
                      handleEditMemberClick={handleEditMemberClick}
                      sendInvitation={sendInvitation}
                      handleRemoveButtonClick={handleRemoveButtonClick}
                      userRoleInProject={userRoleInProject}
                      columnVisibility={columnVisibility}
                    />
                  ))}
                </>
              ))}
            </Tbody>
          </Table>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default CrewListTable;
