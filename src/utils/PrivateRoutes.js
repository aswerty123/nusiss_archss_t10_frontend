import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoutes = () => {
    const { user } = useSelector((state) => state.userReducer);
  const { token } = user;

  console.log("token: "+token)
  
  return token ? <Outlet/> : <Navigate to="/login"/>
};
