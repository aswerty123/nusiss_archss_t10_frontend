import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { authData } = useAuth();

  return (
    <Route
      {...rest}
      element={authData ? <Component /> : <Navigate to="/login" replace />}
    />
  );
};


