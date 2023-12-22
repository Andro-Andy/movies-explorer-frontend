import React from 'react';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


const ProtectedRoute = () => {
  const currentUser = useContext(CurrentUserContext);

  return currentUser.isLogged ? (
    <Outlet />
  ) : (
    <Navigate
      to={'/'}
      replace
    />
  );
};

export default ProtectedRoute;
