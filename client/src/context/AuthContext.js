import React, { useContext, createContext, useState } from 'react';
import { useSignUpMutation, useLoginMutation } from '../queries/user-queries';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() =>
    localStorage.getItem('authData')
      ? JSON.parse(localStorage.getItem('authData'))
      : null
  );

  const logout = () => {
    setAuthData(null);
    localStorage.clear();
    window.location.href = '/';
  };

  const authContextData = {
    setAuthData,
    authData,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
