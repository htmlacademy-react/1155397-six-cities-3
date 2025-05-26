import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../const';
import { ReactNode } from 'react';

type PrivateRouteProps = {
    authorizationStatus: AuthorizationStatus;
    children: ReactNode;
}

function PrivateRoute({authorizationStatus, children}: PrivateRouteProps) {
  return authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={'/login'} />;
}

export default PrivateRoute;
