import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { gql } from '@frontend/gql';
import { route } from '@frontend/route';

import { useAuth } from '../auth-core';
import { NewPasswordTemplate } from '../templates/NewPasswordTemplate';

const NEW_PASSWORD_MUTATION = gql(`
  mutation ResetPassword($newPassword: String!, $token: String!) {
    resetPassword(newPassword: $newPassword, token: $token) {
      user {
        id
        name
        surname
        email
      }
      token
    }
  }
`);

export function NewPasswordPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [newPasswordRequest, newPasswordRequestState] = useMutation(
    NEW_PASSWORD_MUTATION,
    {
      onCompleted: ({ resetPassword: { user, token } }) => {
        auth.signIn({ token, user });
        navigate(route.myprojects());
      },
      onError: () => {
        console.error(
          console.error('Error resetting password:'),
          newPasswordRequestState.error,
        );
      },
    },
  );

  const handleNewPasswordFormSubmit = useCallback(
    (variables: { token: string; newPassword: string }) => {
      newPasswordRequest({ variables });
    },
    [newPasswordRequest],
  );

  return (
    <NewPasswordTemplate
      isLoading={newPasswordRequestState.loading}
      error={newPasswordRequestState.error}
      onSubmit={handleNewPasswordFormSubmit}
    />
  );
}
