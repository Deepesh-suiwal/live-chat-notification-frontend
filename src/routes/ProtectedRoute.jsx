import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { connectSocket } from "../socket/socket";
import { useEffect } from "react";

export default function ProtectedRoute() {
  const { auth } = useAuth();

  useEffect(() => {
    if (auth) {
      connectSocket();
    }
  }, [auth]);

  if (auth === null) {
    return <div>Checking authentication...</div>;
  }

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
