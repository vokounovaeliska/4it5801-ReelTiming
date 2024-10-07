import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { gql } from '@frontend/gql';
import { useAuth } from '@frontend/modules/auth';
import { Box, Button } from '@frontend/shared/design-system';
import { TopNavigation } from '@frontend/shared/navigation/organisms/TopNavigation';

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

export function SignInPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [signInRequest, signInRequestState] = useMutation(SIGNIN_MUTATION, {
    onCompleted: ({ signIn: { user, token } }) => {
      auth.signIn({ token, user });
      navigate('/');
    },
    onError: () => {},
  });

  return (
    <Box>
      <TopNavigation />
      <Box p="8">
        <Button
          onClick={() => {
            signInRequest({
              variables: {
                email: 'a@a.com',
                password: 'pass',
              },
            });
          }}
          isLoading={signInRequestState.loading}
        >
          Sign In
        </Button>
        {signInRequestState.error ? (
          <Box color="red">{signInRequestState.error.message}</Box>
        ) : null}
      </Box>
    </Box>
  );
}
