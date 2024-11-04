import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { UPDATE_USER_PROFILE_SETTINGS } from '@frontend/gql/mutations/UpdateUserProfileSettings';
import { GET_USER_PROFILE_SETTINGS_INFO } from '@frontend/gql/queries/GetUserProfileSettingsInfo';
import { useAuth } from '@frontend/modules/auth';

import ProfileSettingsTemplate from '../templates/ProfileSettingsTemplate';

const ProfileSettingsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    email: '',
    phone_number: '',
    last_update_date: '',
  });

  const { loading, error, data, refetch } = useQuery(
    GET_USER_PROFILE_SETTINGS_INFO,
    {
      variables: { userId: user?.id },
      skip: !user,
    },
  );

  const [updateUser] = useMutation(UPDATE_USER_PROFILE_SETTINGS);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (data) {
      setUserData(data.user);
    }
  }, [data, user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, surname, email, phone_number } = userData;
    try {
      await updateUser({
        variables: {
          data: { name, surname, email, phone_number },
          userId: user?.id,
        },
      });
      toast({ title: 'Profile updated successfully', status: 'success' });
      refetch(); // Refetch the data after a successful update
    } catch (err) {
      toast({ title: 'Error updating profile', status: 'error' });
    }
  };

  return (
    <ProfileSettingsTemplate
      loading={loading}
      error={error?.message ? new Error(error.message) : null}
      userData={userData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default ProfileSettingsPage;
