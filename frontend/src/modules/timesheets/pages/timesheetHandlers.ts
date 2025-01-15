import React, { useState, useEffect } from 'react';
import { ActionMeta, MultiValue } from 'react-select';
import {
  Timesheet,
  TimesheetFormValues,
  UserOption,
  UserInfoData,
  UserInfo,
} from '../interfaces';
import { toLocalISOString } from '../utils/timeUtils';
import { useAddTimesheet } from './useAddTimesheet';
import { useEditTimesheet } from './useEditTimesheet';

export const useTimesheetHandlers = (
  projectId: string,
  roleData: { userRoleInProject: string } | null,
  userInfoData?: UserInfoData | null,
  userInfo?: UserInfo | null,
) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<UserOption[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimesheet, setSelectedTimesheet] = useState<Timesheet | null>(
    null,
  );
  const [mode, setMode] = useState<'add' | 'edit'>('add');

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'start' | 'end',
  ) => {
    if (type === 'start') {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
  };

  const handleUserChange = (
    newValue: MultiValue<UserOption>,
    _actionMeta: ActionMeta<UserOption>,
  ) => {
    const selectedOptions = newValue as UserOption[];
    setSelectedUsers(selectedOptions);
  };

  const handleRowClick = (timesheet: Timesheet) => {
    setSelectedTimesheet(timesheet);
    setMode('edit');
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedTimesheet(null);
    setMode('add');
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTimesheet(null);
  };

  const { handleEditTimesheet } = useEditTimesheet({
    projectId: projectId ?? '',
    userRole: roleData?.userRoleInProject ?? '',
    userInfoData,
    selectedTimesheet,
    userInfo,
  });

  const { handleAddTimesheet } = useAddTimesheet({
    projectId: projectId ?? '',
    userRole: roleData?.userRoleInProject ?? '',
    userInfoData,
    userInfo,
  });

  const handleFormSubmit = (data: Timesheet) => {
    if (mode === 'add') {
      handleAddTimesheet(data);
    } else {
      handleEditTimesheet(data);
    }
    handleModalClose();
  };

  const handleFormSubmitWrapper = (data: TimesheetFormValues) => {
    const timesheet: Timesheet = {
      ...data,
      id: selectedTimesheet?.id || '',
      projectUser: selectedTimesheet?.projectUser || {
        id: data.projectUser.id,
        name: data.projectUser?.name || '',
        surname: data.projectUser?.surname || '',
      },
      create_date:
        selectedTimesheet?.create_date || toLocalISOString(new Date()),
      shift_lenght: data.shift_lenght || 0,
      car_id: data.carId || undefined,
      kilometers: data.kilometers,
    };
    handleFormSubmit(timesheet);
  };

  useEffect(() => {
    const today = new Date();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(today.getDate() - 3);
    setStartDate(toLocalISOString(threeDaysAgo).split('T')[0]);
    setEndDate(toLocalISOString(today).split('T')[0]);
  }, []);

  return {
    startDate,
    endDate,
    selectedUsers,
    isModalOpen,
    setIsModalOpen,
    selectedTimesheet,
    mode,
    handleDateChange,
    handleUserChange,
    handleRowClick,
    handleAddClick,
    handleModalClose,
    handleFormSubmitWrapper,
  };
};
