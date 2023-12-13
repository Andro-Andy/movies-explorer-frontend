import React from 'react';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ROUTER } from '../../utils/config.global';

const ProtectedRoute = () => {
  const currentUser = useContext(CurrentUserContext);

  return currentUser.isLogged ? (
    <Outlet/>
  ) : (
    <Navigate
      to={ROUTER.main}
      replace
    />
  );
};

export default ProtectedRoute;
