import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { route } from '@frontend/route';

import { NewPasswordTemplate } from '../templates/NewPasswordTemplate';

const NEW_PASSWORD_MUTATION = gql(/* GraphQL */ `
  mutation ResetPassword(
    $token: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    resetPassword(
      token: $token
      password: $password
      passwordConfirmation: $passwordConfirmation
    ) {
      success
    }
  }
`);

export function NewPasswordPage() {
  const navigate = useNavigate();
  const [newPasswordRequest, newPasswordRequestState] = useMutation(
    NEW_PASSWORD_MUTATION,
    {
      onCompleted: () => {
        alert('Your password has been reset successfully.');
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
    (variables: {
      token: string;
      password: string;
      passwordConfirmation: string;
    }) => {
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
