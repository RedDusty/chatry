import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useTypedSelector } from "redux/useTypedRedux";

const ProtectedRoute = () => {
  const location = useLocation();
  const userUID = useTypedSelector((s) => s.user.uid);

  if (userUID === null || userUID.length === 0) {
    return <Navigate to={"/auth/login"} state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
