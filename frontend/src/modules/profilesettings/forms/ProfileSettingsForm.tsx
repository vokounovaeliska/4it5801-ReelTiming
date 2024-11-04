import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';

interface ProfileSettingsFormProps {
  userData: {
    name: string;
    surname: string;
    email: string;
    phone_number: string;
    last_update_date: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ProfileSettingsForm: React.FC<ProfileSettingsFormProps> = ({
  userData,
  handleChange,
  handleSubmit,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box p={4} maxW="md" mx="auto">
      <form onSubmit={handleSubmit}>
        <FormControl id="name" mb={4}>
          <FormLabel>Name</FormLabel>
          <Input name="name" value={userData.name} onChange={handleChange} />
        </FormControl>
        <FormControl id="surname" mb={4}>
          <FormLabel>Surname</FormLabel>
          <Input
            name="surname"
            value={userData.surname}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="email" mb={4}>
          <FormLabel>Email</FormLabel>
          <Input name="email" value={userData.email} onChange={handleChange} />
        </FormControl>
        <FormControl id="phone_number" mb={4}>
          <FormLabel>Phone Number</FormLabel>
          <Input
            name="phone_number"
            value={userData.phone_number}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="last_update_date" mb={4}>
          <FormLabel>Last Update Date</FormLabel>
          <Text>{formatDate(userData.last_update_date)}</Text>
        </FormControl>
        <Button type="submit" colorScheme="orange">
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default ProfileSettingsForm;
