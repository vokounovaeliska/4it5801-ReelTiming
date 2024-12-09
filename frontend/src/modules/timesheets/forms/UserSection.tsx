import React from 'react';
import { Box, FormControl, FormLabel, Select } from '@chakra-ui/react';
import { Control, Controller } from 'react-hook-form';

import { TimesheetFormValues } from '../interfaces';

// import { FormValues } from '../interfaces';

interface UserSectionProps {
  userRole: string;
  mode: string;
  control: Control<TimesheetFormValues>;
  userOptions: { value: string; label: string }[];
  setSelectedUser: (userId: string) => void;
  setIsCarVisible: (isVisible: boolean) => void;
}

const UserSection: React.FC<UserSectionProps> = ({
  userRole,
  mode,
  control,
  userOptions,
  setSelectedUser,
  setIsCarVisible,
}) => {
  return (
    <Box>
      {userRole === 'ADMIN' && mode === 'add' && (
        <FormControl>
          <FormLabel>User</FormLabel>
          <Controller
            name="projectUser.id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onChange={(e) => {
                  const selectedUserId = e.target.value;
                  setSelectedUser(selectedUserId);
                  field.onChange(selectedUserId);
                  setIsCarVisible(false);
                }}
              >
                {userOptions.map((user) => (
                  <option key={user.value} value={user.value}>
                    {user.label}
                  </option>
                ))}
              </Select>
            )}
          />
        </FormControl>
      )}
    </Box>
  );
};

export default UserSection;
