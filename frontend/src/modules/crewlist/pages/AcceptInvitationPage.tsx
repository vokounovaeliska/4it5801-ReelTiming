import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ADD_CAR } from '@frontend/gql/mutations/AddCar';
import { UPDATE_AND_ACTIVATE_PROJECT_USER } from '@frontend/gql/mutations/UpdateAdActivateProjectUser';
import { GET_DEPARTMENTS } from '@frontend/gql/queries/GetDepartments';
import { useAuth } from '@frontend/modules/auth';
import { Car, CarStatement } from '@frontend/modules/timesheets/interfaces';
import { route } from '@frontend/route';
import { showErrorToast } from '@frontend/shared/design-system/molecules/toastUtils';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';
import { NotFoundPage } from '@frontend/shared/navigation/pages/NotFoundPage';
import { crewListFormValues } from '@frontend/zod/schemas';

import { GET_PROJECT_USER_BY_TOKEN } from '../../../gql/queries/GetProjectUserByToken';
import { AcceptInvitationTemplate } from '../templates/AcceptInvitationTemplate';

export function AcceptInvitationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const { user } = useAuth();
  const isAuthenticated = user !== null;

  const { data, loading, error } = useQuery(GET_PROJECT_USER_BY_TOKEN, {
    variables: { token },
    skip: !token,
  });

  const [UpdateAdActivateProjectUser] = useMutation(
    UPDATE_AND_ACTIVATE_PROJECT_USER,
  );

  const [addCar] = useMutation(ADD_CAR);

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    if (!isAuthenticated) {
      navigate(`${route.login()}${`?token=${token}`}`);
      return;
    }
  }, [isAuthenticated, token, navigate]);

  const {
    data: departmentsData,
    loading: departmentsLoading,
    error: departmentsError,
  } = useQuery(GET_DEPARTMENTS);

  const departments = departmentsData?.departments || [];
  const projectUser = data?.projectUsersByToken;

  const addCarsForUser = async (cars: Car[]) => {
    for (const car of cars) {
      await addCar({
        variables: {
          kilometerRate: car.kilometer_rate,
          kilometerAllow: car.kilometer_allow,
          name: car.name,
          projectUserId: projectUser.id,
        },
      });
    }
  };

  const handleFormSubmit = (formData: crewListFormValues, cars: Car[]) => {
    UpdateAdActivateProjectUser({
      variables: {
        updateProjectUserId: projectUser.id!,
        data: {
          user_id: user?.id!,
          project_id: projectUser.project?.id!,
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          phone_number: formData.phone_number,
          position: formData.position,
          department_id: formData.department,
          is_active: true,
          role: projectUser.role,
          rate_id: projectUser.rate?.id,
        },
        updateRateData: {
          standard_rate: formData.standard_rate,
          compensation_rate: formData.compensation_rate,
          overtime_hour1: formData.overtime_hour1,
          overtime_hour2: formData.overtime_hour2,
          overtime_hour3: formData.overtime_hour3,
          overtime_hour4: formData.overtime_hour4,
        },
        rateId: projectUser.rate?.id,
      },
    })
      .then(() => addCarsForUser(cars))
      .then(() => {
        navigate(`/projects/${projectUser.project?.id}`);
      })
      .catch((err) => {
        console.error('Error activating project user:', err);
        if (
          err.graphQLErrors?.some((error: { message: string | string[] }) => {
            return (
              error.message.includes('Duplicate entry') ||
              error.message.includes('already exists')
            );
          })
        ) {
          showErrorToast('You have already joined this project before!');
        } else {
          showErrorToast('An unexpected error occurred!');
          console.error(err.message);
        }
      });
  };

  const [carData, setCarData] = useState<Car[]>([]);
  const [carStatementsData] = useState<CarStatement[]>([]);

  const handleCarCollectionChange = (cars: Car[]) => {
    setCarData(cars);
    console.log('Updated car collection in parent:', cars);
  };

  if (loading || departmentsLoading) return <p>Loading...</p>;
  if (error || departmentsError)
    return <p>Error: {error?.message ?? departmentsError?.message}</p>;

  if (!user) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <Navbar children={undefined} />
      <AcceptInvitationTemplate
        onSubmit={handleFormSubmit}
        onCarCollectionChange={handleCarCollectionChange}
        projectUserData={projectUser}
        departments={departments}
        errorMessage={error}
        isLoading={loading}
        cars={carData}
        carStatements={carStatementsData}
      />
      <Footer />
    </div>
  );
}
