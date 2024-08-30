import React from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../feature/user/userSlice";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const user = useSelector(getCurrentUser);
  if (!user?._id) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default PublicRoute;
