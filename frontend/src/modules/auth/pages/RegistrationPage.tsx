import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';

import { RegisterTemplate } from '../templates/RegisterTemplate';

const LOGIN_MUTATION = gql(/* GraphQL */ `
  mutation SignUp($email: String!, $name: String!, $password: String!) {
    login(email: $email, name: $name, password: $password) {
      user {
        id
        name
      }
      token
    }
  }
`);

export function RegistrationPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [signupRequest, signupRequestState] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ signUp: { user, token } }) => {
      auth.signIn({ token, user });
      navigate('/');
    },
    onError: () => {},
  });

  const handleSignUpFormSubmit = useCallback(
    (variables: { email: string; name: string; password: string }) => {
      signupRequest({ variables });
    },
    [signupRequest],
  );

  return (
    <RegisterTemplate
      isLoading={signupRequestState.loading}
      error={signupRequestState.error}
      onSubmit={handleSignUpFormSubmit}
    />
  );
}
