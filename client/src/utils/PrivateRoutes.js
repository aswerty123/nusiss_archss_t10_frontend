import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PrivateRoutes = ({
  redirectPath = '/login',
  children,
}) => {
  const {authData} = useAuth();
  if (!authData) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
