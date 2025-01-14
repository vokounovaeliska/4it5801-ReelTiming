import { useCallback } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { gql } from '@frontend/gql';
import { GET_PROJECT_BY_PROJECT_USER_TOKEN } from '@frontend/graphql/queries/GetProjectByProjectUserToken';
import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';

import { LogInTemplate } from '../templates/LogInTemplate';

const SIGNIN_MUTATION = gql(`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        id
        name
        email
        surname
        can_create_project
      }
      token
    }
  }
`);

export function LogInPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const invitationToken = searchParams.get('token');
  const projectId = searchParams.get('projectId');
  const { data } = useQuery(GET_PROJECT_BY_PROJECT_USER_TOKEN, {
    variables: { token: invitationToken! },
    skip: !invitationToken,
  });

  const [loginRequest, loginRequestState] = useMutation(SIGNIN_MUTATION, {
    onCompleted: ({ signIn: { user, token } }) => {
      auth.signIn({ token, user });
      if (invitationToken) {
        navigate(`/accept-invitation?token=${invitationToken}`);
      } else if (projectId) {
        navigate(`/projects/${projectId}/timesheets`);
      } else {
        navigate(route.myprojects());
      }
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
      token={invitationToken}
      project={data?.projectUsersByToken?.project}
    />
  );
}
