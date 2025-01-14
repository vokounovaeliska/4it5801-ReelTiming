import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { UPDATE_USER_PROFILE_SETTINGS } from '@frontend/graphql/mutations/UpdateUserProfileSettings';
import { GET_USER_PROFILE_SETTINGS_INFO } from '@frontend/graphql/queries/GetUserProfileSettingsInfo';
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
      variables: { userId: user?.id! },
      skip: !user,
      fetchPolicy: 'cache-and-network',
    },
  );

  const [updateUser] = useMutation(UPDATE_USER_PROFILE_SETTINGS);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (data) {
      const { phone_number } = data!.user!;
      setUserData({
        name: data!.user!.name,
        surname: data!.user!.surname,
        email: data!.user!.email,
        phone_number: phone_number ?? '',
        last_update_date: data!.user!.last_update_date,
      });
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
          data: {
            name,
            surname,
            email,
            phone_number,
            last_update_user_id: user?.id,
          },
          userId: user?.id!,
        },
      });
      toast({ title: 'Profile updated successfully', status: 'success' });
      refetch();
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
