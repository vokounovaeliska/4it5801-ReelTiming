import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { IconButton, InputGroup, InputRightElement } from '@chakra-ui/react';

import { Input, InputProps } from '@frontend/shared/design-system';

import { FormField, type FormFieldBaseProps } from '../FormField';

export type PasswordInputFieldProps = FormFieldBaseProps<InputProps>;

export function PasswordInputField({
  id,
  name,
  label,
  ...inputProps
}: PasswordInputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormField
      id={id}
      name={name}
      label={label}
      isRequired={inputProps.isRequired}
    >
      {(field) => (
        <InputGroup>
          <Input
            borderColor={'gray.400'}
            borderWidth={1}
            type={showPassword ? 'text' : 'password'}
            {...inputProps}
            {...field}
          />
          <InputRightElement width="4.5rem">
            <IconButton
              onClick={handleTogglePasswordVisibility}
              icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              variant={'transparent'}
            />
          </InputRightElement>
        </InputGroup>
      )}
    </FormField>
  );
}
