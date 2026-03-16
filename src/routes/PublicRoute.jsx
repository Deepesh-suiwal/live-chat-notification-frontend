import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute() {
  const { auth } = useAuth();

  if (auth === null) {
    return <div>Checking authentication...</div>;
  }

  // agar already logged in hai
  if (auth) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}