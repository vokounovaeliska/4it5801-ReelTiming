import { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAuth } from '@frontend/modules/auth';
import { route } from '@frontend/route';

import { ACTIVATE_PROJECT_USER } from '../../../gql/mutations/ActivateProjectUser';
import { GET_PROJECT_USER_BY_TOKEN } from '../../../gql/queries/GetProjectUserByToken';

const AcceptInvitationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const { user } = useAuth();
  const isAuthenticated = user !== null;

  const { data, loading, error } = useQuery(GET_PROJECT_USER_BY_TOKEN, {
    variables: { token },
    skip: !token,
  });

  const [activateProjectUser] = useMutation(ACTIVATE_PROJECT_USER);

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    if (!isAuthenticated) {
      navigate(`/auth/register?token=${token}`);
      return;
    }
    if (data) {
      const projectUser = data.projectUsersByToken;
      if (!projectUser) {
        console.error('No project user found in data:', data);
        navigate('/error');
        return;
      }
      const { isActive, invitation } = projectUser;
      const trimmedToken = String(token).trim();
      const trimmedInvitation = String(invitation).trim();

      if (trimmedToken === trimmedInvitation && !isActive) {
        console.log('Activating project user...');
        activateProjectUser({ variables: { token: token, userId: user.id } })
          .then(() => {
            // TODO - debug - userid in myprojectspage is different from the one in gql - some query is bad - cant see projects
            navigate(route.myprojects());
          })
          .catch((err) => {
            console.error('Error activating project user:', err);
          });
      } else {
        navigate('/error');
      }
    }
  }, [data, isAuthenticated, token, user, activateProjectUser, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div>Processing invitation...</div>;
};

export default AcceptInvitationPage;
