import React, { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Login from '../layout/login';

const ProtectedRoute = () => {
  return true ? <Outlet /> : <Login />;
};

export default ProtectedRoute;
