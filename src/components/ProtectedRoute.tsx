import React from 'react';
import { Navigate } from 'react-router-dom';

// Route cho mọi user đã đăng nhập
export const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Nếu chưa đăng nhập, chuyển hướng về /login
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Route dành riêng cho admin
export const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isAdmin) {
    // Nếu không phải admin, chuyển hướng về trang 404
    return <Navigate to="/404" replace />;
  }

  return children;
};
