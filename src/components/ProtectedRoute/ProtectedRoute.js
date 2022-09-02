import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

const ProtectedRoute = ({children}) => {
  const user = useUser();
  return user ? children : <Navigate to="/"/>;
};

export default ProtectedRoute;