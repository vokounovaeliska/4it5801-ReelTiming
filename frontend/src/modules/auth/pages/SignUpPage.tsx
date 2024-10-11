import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { Box, Button } from '@frontend/shared/design-system';
import { TopNavigation } from '@frontend/shared/navigation/organisms/TopNavigation';

const SIGNUP_MUTATION = gql(/* GraphQL */ `
  mutation login($email: String!, $name: String!, $password: String!) {
    login(email: $email, name: $name, password: $password) {
      user {
        id
        name
        email
      }
      token
    }
  }
`);

// const SIGNUP_MUTATION = gql(/* GraphQL */ `
//   mutation SignUp(
//     $email: String!
//     $name: String!
//     $password: String!
//     $userName: String!
//     $profileImage: Upload
//   ) {
//     signUp(
//       email: $email
//       name: $name
//       password: $password
//       userName: $userName
//       profileImage: $profileImage
//     ) {
//       user {
//         id
//         name
//         userName
//         profileImageUrl
//       }
//       token
//     }
//   }
// `);

export function SignUpPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [loginReques, loginRequestState] = useMutation(SIGNUP_MUTATION, {
    onCompleted: ({ signUp: { user, token } }) => {
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
            loginReques({
              variables: {
                email: 'a@a.com',
                name: 'John Doe',
                password: 'pass',
              },
            });
          }}
          isLoading={loginRequestState.loading}
        >
          Sign Up
        </Button>
        {loginRequestState.error ? (
          <Box color="red">{loginRequestState.error.message}</Box>
        ) : null}
      </Box>
    </Box>
  );
}
