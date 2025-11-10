import React, { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./context/AuthContext";

const PrivetRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  const location = useLocation();
  //console.log(location);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate state={location?.pathname} to="/login"></Navigate>;
};

export default PrivetRoute;
