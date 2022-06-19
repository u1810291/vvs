import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import {matchPath, Outlet} from 'react-router-dom';
import {AuthContextProvider, useAuth} from 'context/auth';
import {useEvent} from '@react-aria/utils';
import {LOGIN_PAGE} from './login/routes';

const AuthConsumer = props => {
  const {isAuthorized} = useAuth();
  useEffect(() => {
    console.log(matchPath('login'));
    if (isAuthorized) return;
  }, [isAuthorized])

  return isAuthorized ? <Outlet /> : null;
}

const ProtectedRoute = () => {
  return (
    <AuthContextProvider>
      <AuthConsumer/>
    </AuthContextProvider>
  );
};

export default ProtectedRoute;
