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
import { currencyUtil } from '@shared/currencyUtil';

import { CrewMemberData, ProjectUser } from '../interfaces/interfaces';

import { CrewlistTableHeader } from './CrewlistTableHeader';

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
  projectCurrency: string;
}

const CrewListTable: React.FC<CrewListTableProps> = ({
  sortedDepartments,
  groupedByDepartment,
  handleEditMemberClick,
  handleRemoveButtonClick,
  sendInvitation,
  userRoleInProject,
  authUserId,
  projectCurrency,
}) => {
  return (
    <Box overflowX="auto" m={{ base: 2, md: 4 }}>
      <TableContainer className="custom-scrollbar">
        <Box
          overflowX="auto"
          overflowY="auto"
          maxHeight={'70vh'}
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
            pr={2}
            sx={{
              td: { padding: '2', paddingBlock: '1', fontSize: '0.8rem' },
              'tr:hover td': {
                backgroundColor: 'gray.200',
              },
            }}
          >
            <Thead>
              <Tr bg="#2D3748" textColor="white">
                <Th
                  textColor="white"
                  position={'sticky'}
                  left={0}
                  top={0}
                  zIndex={10}
                  bg="#2D3748"
                  whiteSpace="nowrap"
                  minWidth="160px"
                >
                  Surname
                </Th>
                <Th
                  textColor="white"
                  position={'sticky'}
                  left={{ base: '0', md: '160px' }}
                  zIndex={9}
                  top={0}
                  bg="#2D3748"
                  whiteSpace="nowrap"
                  minWidth="106px"
                  textAlign="left"
                >
                  Name
                </Th>

                <Th
                  textColor="white"
                  position={'sticky'}
                  left={{ base: '0', md: '266px' }}
                  zIndex={8}
                  top={0}
                  bg="#2D3748"
                  whiteSpace="nowrap"
                  minWidth="90px"
                  textAlign="left"
                >
                  Position
                </Th>
                <CrewlistTableHeader label="Project role">
                  Role
                </CrewlistTableHeader>
                <CrewlistTableHeader label="Email adress">
                  Email
                </CrewlistTableHeader>
                <CrewlistTableHeader label="Phone number">
                  Phone number
                </CrewlistTableHeader>
                <CrewlistTableHeader label="Standard rate">
                  Rate
                </CrewlistTableHeader>
                <CrewlistTableHeader label="Compensation rate">
                  Compensation
                </CrewlistTableHeader>
                <CrewlistTableHeader label="Overtime hour1">
                  OH 1
                </CrewlistTableHeader>
                <CrewlistTableHeader label="Overtime hour2">
                  OH 2
                </CrewlistTableHeader>
                <CrewlistTableHeader label="Overtime hour3">
                  OH 3
                </CrewlistTableHeader>
                <CrewlistTableHeader label="Overtime hour4">
                  OH 4
                </CrewlistTableHeader>
                <CrewlistTableHeader label="Invitation to project">
                  Invitation
                </CrewlistTableHeader>
                <CrewlistTableHeader label="Delete crewmember">
                  Delete
                </CrewlistTableHeader>
              </Tr>
            </Thead>
            <Tbody>
              {sortedDepartments.map((departmentName) => (
                <React.Fragment key={departmentName}>
                  <Tr
                    key={departmentName}
                    borderTop={'solid'}
                    borderBottom={'solid'}
                    borderColor={'gray.600'}
                  >
                    <Td
                      colSpan={1}
                      textColor="#2D3748"
                      textTransform="uppercase"
                      fontWeight="bold"
                      position="sticky"
                      left="0"
                      zIndex={1}
                      bg={'white'}
                    >
                      {departmentName}
                    </Td>
                    <Td colSpan={13} bg={'white'}></Td>
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
                      >
                        <Td
                          position="sticky"
                          left={{ base: '0', md: 'max-content' }}
                          bg="gray.100"
                          zIndex={7}
                          minWidth="160px"
                        >
                          {user?.surname}
                        </Td>
                        <Td
                          position="sticky"
                          left={{ base: '0', md: '160px' }}
                          bg={{ md: 'gray.100' }}
                          zIndex={6}
                          minWidth="90px"
                        >
                          {user?.name}
                        </Td>
                        <Td
                          position={{ base: 'relative', md: 'sticky' }}
                          left={{ base: '0', md: '266px' }}
                          bg={{ md: 'gray.100' }}
                          zIndex={5}
                          minWidth="90px"
                        >
                          {user.position}
                        </Td>
                        <Td
                          textColor={
                            user.role === 'ADMIN' ? 'orange.500' : 'black'
                          }
                        >
                          {user.role}
                        </Td>
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
                        <Td textAlign="center">
                          {user.rate?.standard_rate !== 0
                            ? currencyUtil.formatAmount(
                                user.rate?.standard_rate,
                                projectCurrency,
                              )
                            : ''}
                        </Td>
                        <Td textAlign="center">
                          {user.rate?.compensation_rate !== 0
                            ? currencyUtil.formatAmount(
                                user.rate?.compensation_rate,
                                projectCurrency,
                              )
                            : ''}
                        </Td>
                        <Td textAlign="center">
                          {user.rate?.overtime_hour1 !== 0
                            ? currencyUtil.formatAmount(
                                user.rate?.overtime_hour1,
                                projectCurrency,
                              )
                            : ''}
                        </Td>
                        <Td textAlign="center">
                          {user.rate?.overtime_hour2 !== 0
                            ? currencyUtil.formatAmount(
                                user.rate?.overtime_hour2,
                                projectCurrency,
                              )
                            : ''}
                        </Td>
                        <Td textAlign="center">
                          {user.rate?.overtime_hour3 !== 0
                            ? currencyUtil.formatAmount(
                                user.rate?.overtime_hour3,
                                projectCurrency,
                              )
                            : ''}
                        </Td>
                        <Td textAlign="center">
                          {user.rate?.overtime_hour4 !== 0
                            ? currencyUtil.formatAmount(
                                user.rate?.overtime_hour4,
                                projectCurrency,
                              )
                            : ''}
                        </Td>
                        <Td textAlign="center">
                          <Button
                            variant="link"
                            colorScheme="orange"
                            size={'xs'}
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
                        <Td textAlign="center">
                          {userRoleInProject === 'ADMIN' &&
                            user.user?.id !== authUserId && (
                              <IconButton
                                aria-label="Remove record"
                                icon={<DeleteIcon />}
                                colorScheme="red"
                                size={'xs'}
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
