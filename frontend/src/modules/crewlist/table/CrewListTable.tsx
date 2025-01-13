import React from 'react';
import { Box, Table, TableContainer, Tbody, Thead, Tr } from '@chakra-ui/react';

import { DepartmentRow } from '../../departments/atoms/DepartmentRow';
import { CrewMemberData, Project, ProjectUser } from '../interfaces/interfaces';

import { CrewlistTableHeader } from './CrewlistTableHeader';
import { CrewMemberRow } from './CrewMemberRow';

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
  authUserId: string | undefined;
  project: Project;
}

const tableHeaders = [
  { label: 'Role', tooltip: 'Project role' },
  { label: 'Email', tooltip: 'Email adress' },
  { label: 'Phone number' },
  { label: 'Rate', tooltip: 'Standard rate' },
  { label: 'TA', tooltip: 'Turn around rate' },
  { label: 'OT 1', tooltip: 'Overtime hour 1' },
  { label: 'OT 2', tooltip: 'Overtime hour 2' },
  { label: 'OT 3', tooltip: 'Overtime hour 3' },
  { label: 'OT 4', tooltip: 'Overtime hour 4' },
  { label: 'Status' },
  { label: 'Actions' },
];

const CrewListTable: React.FC<CrewListTableProps> = ({
  sortedDepartments,
  groupedByDepartment,
  handleEditMemberClick,
  handleRemoveButtonClick,
  sendInvitation,
  userRoleInProject,
  authUserId,
  project,
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
                <CrewlistTableHeader
                  position={'sticky'}
                  left={0}
                  zIndex={10}
                  textAlign="left"
                >
                  Surname
                </CrewlistTableHeader>
                <CrewlistTableHeader
                  position={'sticky'}
                  left={{ base: '100px', md: '120px', lg: '150px' }}
                  zIndex={9}
                  textAlign="left"
                >
                  Name
                </CrewlistTableHeader>

                <CrewlistTableHeader
                  position={'sticky'}
                  left={{ base: '0', md: '220px', lg: '260px' }}
                  zIndex={8}
                  minWidth="90px"
                  textAlign="left"
                >
                  Position
                </CrewlistTableHeader>
                {tableHeaders.map((header, index) => (
                  <CrewlistTableHeader key={index} tooltip={header.tooltip}>
                    {header.label}
                  </CrewlistTableHeader>
                ))}
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
                      authUserId={authUserId}
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
