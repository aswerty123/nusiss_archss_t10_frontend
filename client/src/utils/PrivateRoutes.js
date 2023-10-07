import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PrivateRoutes = ({
  isAllowed,
  redirectPath = '/login',
  children,
}) => {
  // const {authData} = useAuth();
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
