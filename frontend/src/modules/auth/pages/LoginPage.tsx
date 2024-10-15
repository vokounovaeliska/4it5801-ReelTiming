import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';

import { LogInTemplate } from '../templates/LogInTemplate';

const SIGNIN_MUTATION = gql(/* GraphQL */ `
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        id
        name
        email
      }
      token
    }
  }
`);

export function LogInPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [loginRequest, loginRequestState] = useMutation(SIGNIN_MUTATION, {
    onCompleted: ({ signIn: { user, token } }) => {
      auth.signIn({ token, user });
      navigate(route.myprojects());
    },
    onError: () => {},
  });

  const handleLogInFormSubmit = useCallback(
    (variables: { email: string; password: string }) => {
      loginRequest({ variables });
    },
    [loginRequest],
  );

  return (
    <LogInTemplate
      isLoading={loginRequestState.loading}
      error={loginRequestState.error}
      onSubmit={handleLogInFormSubmit}
    />
  );
}
