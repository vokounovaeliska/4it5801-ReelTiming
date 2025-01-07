import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { gql } from '@frontend/gql';
import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';

import { RegisterTemplate } from '../templates/RegisterTemplate';

const SIGNUP_MUTATION = gql(`
  mutation SignUp(
    $email: String!
    $name: String!
    $surname: String!
    $password: String!
  ) {
    signUp(email: $email, name: $name, surname: $surname, password: $password) {
      user {
        id
        name
        email
        surname
      }
      token
    }
  }
`);

export function RegistrationPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const invitationToken = searchParams.get('token'); // Get the token from query parameters
  const [signupRequest, signupRequestState] = useMutation(SIGNUP_MUTATION, {
    onCompleted: ({ signUp: { user, token } }) => {
      auth.signIn({ token, user });
      if (invitationToken != null) {
        navigate(`/accept-invitation?token=${invitationToken}`);
      } else {
        navigate(route.myprojects());
      }
    },
    onError: () => {},
  });

  const handleSignUpFormSubmit = useCallback(
    (variables: {
      email: string;
      name: string;
      surname: string;
      password: string;
    }) => {
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
        token={invitationToken}
      />
    </>
  );
}
