import { Outlet, Navigate } from 'react-router-dom';

export const PrivateRoutes = ({
  isAllowed,
  redirectPath = '/login',
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
