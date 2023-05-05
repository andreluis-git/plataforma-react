import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { token, setToken } = useAuth();
  const localToken = localStorage.getItem("token");

  useEffect(() => {
    if (localToken) {
      setToken(localToken);
    }
  });

  const location = useLocation();

  if (!token && !localToken) {
    // user is not authenticated
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
