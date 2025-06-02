// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('access_token');

  const currentPath = window.location.pathname;
  const isCustomer = currentPath.startsWith('/cus');

  const redirectPath = isCustomer ? '/cus/login' : '/cop/login';

  return isAuthenticated ? children : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
