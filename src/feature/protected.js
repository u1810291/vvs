import React, { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Login from '../layout/login';
import AuthContext from '../context/authContext';

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  // const [fake, setFake] = useState(true)
  return user ? <Outlet /> : <Login />;
};

export default ProtectedRoute;
