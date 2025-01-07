import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { gql } from '@frontend/gql';
import { route } from '@frontend/route';

import { ForgotPasswordTemplate } from '../templates/ForgotPasswordTemplate';

const FORGOT_PASSWORD_MUTATION = gql(`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`);

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const toast = useToast(); // Chakra UI's toast hook

  const [forgotPasswordRequest, forgotPasswordRequestState] = useMutation(
    FORGOT_PASSWORD_MUTATION,
    {
      onCompleted: () => {
        toast({
          title: 'Email Sent',
          description:
            'An email with instructions to reset your password has been sent.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
        navigate(route.login());
      },
      onError: () => {
        console.error(
          'Error sending forgot password request:',
          forgotPasswordRequestState.error,
        );
        toast({
          title: 'Error',
          description: 'There was an error sending the password reset request.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
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
