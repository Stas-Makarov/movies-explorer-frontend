import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { MAIN_ROUTE } from '../../constants';

const ProtectedRoute = ({children}) => {
  const { user } = useUser();
  return user ? children : <Navigate to={MAIN_ROUTE}/>;
};

export default ProtectedRoute;