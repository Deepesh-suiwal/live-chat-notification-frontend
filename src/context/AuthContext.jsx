import { createContext, useContext, useEffect, useState } from "react";
import instance from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const checkAuth = async () => {
    try {
      const res = await instance.get("/api/users/auth/check-token", {
        withCredentials: true,
      });

      setAuth(res.data.success === true);
    } catch (err) {
      setAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
