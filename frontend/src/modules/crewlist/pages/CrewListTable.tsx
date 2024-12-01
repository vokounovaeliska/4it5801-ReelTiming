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
import { currencyUtil } from '@shared/currencyUtil';

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
                <Th
                  textColor="white"
                  position={{ base: 'relative', md: 'sticky' }}
                  left="0"
                  zIndex={2}
                  bg="#2D3748"
                  whiteSpace="nowrap"
                  minWidth="max-content"
                >
                  Name
                </Th>
                <Th
                  textColor="white"
                  position="sticky"
                  left={{ base: '0', md: '104px' }}
                  zIndex={2}
                  bg="#2D3748"
                  whiteSpace="nowrap"
                  minWidth="max-content"
                >
                  Surname
                </Th>
                <Th
                  textColor="white"
                  position={{ base: 'relative', md: 'sticky' }}
                  left={{ base: '0', md: '208px' }}
                  zIndex={1}
                  bg="#2D3748"
                  whiteSpace="nowrap"
                  minWidth="max-content"
                >
                  Position
                </Th>
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
                      colSpan={2}
                      textColor="#2D3748"
                      textTransform="uppercase"
                      fontWeight="bold"
                      position="sticky"
                      left="0"
                      zIndex={1}
                      bg={'gray.200'}
                    >
                      {departmentName}
                    </Td>
                    <Td colSpan={12} bg={'gray.200'}></Td>
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
                            cars: user.car || null,
                          })
                        }
                        _hover={{
                          cursor: 'pointer',
                          backgroundColor: 'gray.200',
                        }}
                      >
                        <Td
                          position="sticky"
                          left="0"
                          bg="white"
                          zIndex={2}
                          minWidth="max-content"
                        >
                          {user?.name}
                        </Td>
                        <Td
                          position="sticky"
                          left={{ base: '0', md: '104px' }}
                          bg="white"
                          zIndex={2}
                          minWidth="max-content"
                        >
                          {user?.surname}
                        </Td>
                        <Td
                          position={{ base: 'relative', md: 'sticky' }}
                          left={{ base: '0', md: '208px' }}
                          bg="white"
                          zIndex={1}
                          minWidth="max-content"
                          borderRight={50}
                          borderRightColor={'black'}
                        >
                          {user.position}
                        </Td>
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
