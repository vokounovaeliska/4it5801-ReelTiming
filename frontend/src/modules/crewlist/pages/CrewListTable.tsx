import React from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  IconButton,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { TextPhoneNumber } from '@frontend/shared/design-system/atoms/TextPhoneNumber';
import { TooltipHeader } from '@frontend/shared/design-system/atoms/Tooltip';

import { CrewMemberData, ProjectUser } from '../interfaces/interfaces';

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
}

const CrewListTable: React.FC<CrewListTableProps> = ({
  sortedDepartments,
  groupedByDepartment,
  handleEditMemberClick,
  handleRemoveButtonClick,
  sendInvitation,
  userRoleInProject,
  authUserId,
}) => {
  return (
    <Box
      overflowX="scroll"
      m={4}
      rounded={'md'}
      borderWidth={2}
      borderColor={'gray.100'}
    >
      <TableContainer className="custom-scrollbar">
        <Box
          overflowX="auto"
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
            <Thead>
              <Tr bg="#2D3748" textColor="white">
                <Th textColor="white">Name</Th>
                <Th textColor="white">Surname</Th>
                <Th textColor="white">Position</Th>
                <Th textColor="white">Role</Th>
                <Th textColor="white">Email</Th>
                <Th textColor="white">Phone number</Th>
                <Th textColor="white">Standard rate</Th>
                <TooltipHeader label="Compensation rate" textColor="white">
                  Compensation
                </TooltipHeader>
                <TooltipHeader label="Overtime hour1" textColor="white">
                  OH 1
                </TooltipHeader>
                <TooltipHeader label="Overtime hour2" textColor="white">
                  OH 2
                </TooltipHeader>
                <TooltipHeader label="Overtime hour3" textColor="white">
                  OH 3
                </TooltipHeader>
                <TooltipHeader label="Overtime hour4" textColor="white">
                  OH 4
                </TooltipHeader>
                <Th textColor="white">Invitation</Th>
                <Th textColor="white">Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedDepartments.map((departmentName) => (
                <React.Fragment key={departmentName}>
                  <Tr key={departmentName} bg={'gray.200'}>
                    <Td
                      colSpan={14}
                      textColor="#2D3748"
                      textTransform="uppercase"
                      fontWeight="bold"
                    >
                      {departmentName}
                    </Td>
                  </Tr>
                  {groupedByDepartment[departmentName].map(
                    (user: ProjectUser) => (
                      <Tr
                        key={user.id}
                        onClick={() =>
                          handleEditMemberClick({
                            id: user.id,
                            name: user?.name,
                            surname: user?.surname,
                            department: user.department?.id || 'No Department',
                            position: user.position,
                            phone_number: user.phone_number,
                            email: user?.email,
                            standard_rate: user.rate?.standard_rate || 0,
                            compensation_rate:
                              user.rate?.compensation_rate || 0,
                            overtime_hour1: user.rate?.overtime_hour1 || 0,
                            overtime_hour2: user.rate?.overtime_hour2 || 0,
                            overtime_hour3: user.rate?.overtime_hour3 || 0,
                            overtime_hour4: user.rate?.overtime_hour4 || 0,
                            role: user.role,
                            user_id: user.user?.id,
                            rate_id: user.rate?.id || null,
                          })
                        }
                        _hover={{
                          cursor: 'pointer',
                          backgroundColor: 'gray.200',
                        }}
                      >
                        <Td>{user?.name}</Td>
                        <Td>{user?.surname}</Td>
                        <Td>{user.position}</Td>
                        <Td>{user.role}</Td>
                        <Td>
                          <Link
                            href={`mailto:${user?.email}`}
                            color="blue.500"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {user?.email}
                          </Link>
                        </Td>
                        <Td>
                          <Link
                            href={`tel:${user.phone_number}`}
                            color="blue.500"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <TextPhoneNumber
                              phoneNumber={user.phone_number}
                            ></TextPhoneNumber>
                          </Link>
                        </Td>
                        <Td>
                          {user.rate?.standard_rate !== 0
                            ? user.rate?.standard_rate
                            : ''}
                        </Td>
                        <Td>
                          {user.rate?.compensation_rate !== 0
                            ? user.rate?.compensation_rate
                            : ''}
                        </Td>
                        <Td>
                          {user.rate?.overtime_hour1 !== 0
                            ? user.rate?.overtime_hour1
                            : ''}
                        </Td>
                        <Td>
                          {user.rate?.overtime_hour2 !== 0
                            ? user.rate?.overtime_hour2
                            : ''}
                        </Td>
                        <Td>
                          {user.rate?.overtime_hour3 !== 0
                            ? user.rate?.overtime_hour3
                            : ''}
                        </Td>
                        <Td>
                          {user.rate?.overtime_hour4 !== 0
                            ? user.rate?.overtime_hour4
                            : ''}
                        </Td>
                        <Td>
                          <Button
                            colorScheme="orange"
                            variant={'ghost'}
                            size={'sm'}
                            isDisabled={
                              user.invitation != null && user.is_active
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              if (user.invitation == null && !user.is_active) {
                                sendInvitation(
                                  user.id,
                                  user?.name,
                                  user?.email,
                                  false,
                                );
                              } else if (
                                user.invitation != null &&
                                !user.is_active
                              ) {
                                sendInvitation(
                                  user.id,
                                  user?.name,
                                  user?.email,
                                  true,
                                );
                              }
                            }}
                          >
                            {user.invitation != null && user.is_active
                              ? 'Joined'
                              : user.invitation == null && !user.is_active
                                ? 'Send invitation'
                                : 'Resend invitation'}
                          </Button>
                        </Td>
                        <Td>
                          {userRoleInProject === 'ADMIN' &&
                            user.user?.id !== authUserId && (
                              <IconButton
                                aria-label="Remove record"
                                icon={<DeleteIcon />}
                                colorScheme="red"
                                size={'sm'}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveButtonClick(user.id);
                                }}
                              />
                            )}
                        </Td>
                      </Tr>
                    ),
                  )}
                </React.Fragment>
              ))}
            </Tbody>
          </Table>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default CrewListTable;
