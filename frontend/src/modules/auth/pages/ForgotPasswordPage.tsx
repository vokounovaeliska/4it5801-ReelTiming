import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { route } from '@frontend/route';

import { ForgotPasswordTemplate } from '../templates/ForgotPasswordTemplate';

const FORGOT_PASSWORD_MUTATION = gql(/* GraphQL */ `
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      message
    }
  }
`);

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [forgotPasswordRequest, forgotPasswordRequestState] = useMutation(
    FORGOT_PASSWORD_MUTATION,
    {
      onCompleted: () => {
        // Optionally navigate or show a success message
        alert(
          'An email has been sent with instructions to reset your password.',
        );
        navigate(route.login());
      },
      onError: () => {
        console.error(
          'Error sending forgot password request:',
          forgotPasswordRequestState.error,
        );
        // Handle error case, show error message to the user
      },
    },
  );

  const handleForgotPasswordFormSubmit = useCallback(
    (variables: { email: string }) => {
      forgotPasswordRequest({ variables });
    },
    [forgotPasswordRequest],
  );

  return (
    <ForgotPasswordTemplate
      isLoading={forgotPasswordRequestState.loading}
      error={forgotPasswordRequestState.error}
      onSubmit={handleForgotPasswordFormSubmit}
    />
  );
}
