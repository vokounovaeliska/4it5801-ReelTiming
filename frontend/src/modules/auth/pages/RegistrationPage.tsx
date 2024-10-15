import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';

import { RegisterTemplate } from '../templates/RegisterTemplate';

const SIGNUP_MUTATION = gql(/* GraphQL */ `
  mutation SignUp(
    $email: String!
    $name: String!
    $password: String!
    $username: String!
  ) {
    signUp(
      email: $email
      name: $name
      password: $password
      username: $username
    ) {
      user {
        id
        name
        surname
      }
      token
    }
  }
`);

export function RegistrationPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [signupRequest, signupRequestState] = useMutation(SIGNUP_MUTATION, {
    onCompleted: ({ signUp: { user, token } }) => {
      auth.signIn({ token, user });
      navigate(route.myprojects());
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
    <>
      <RegisterTemplate
        isLoading={signupRequestState.loading}
        error={signupRequestState.error}
        onSubmit={handleSignUpFormSubmit}
      />
    </>
  );
}
