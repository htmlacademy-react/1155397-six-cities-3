import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAppSelector } from '../../store/hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthStatus } from '../../store/slices/user-slice';

type PrivateRouteProps = {
    children: ReactNode;
}

function PrivateRoute({children}: PrivateRouteProps) {
  const authStatus = useAppSelector(getAuthStatus);

  return authStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={AppRoute.Login} />;

}

export default PrivateRoute;
