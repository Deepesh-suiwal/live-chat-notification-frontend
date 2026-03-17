import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { connectSocket, disconnectSocket, getSocket } from "../socket/socket";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const res = await api.get("/api/users/auth/check-token");

      const isLoggedIn = res.data.success === true;

      setAuth(isLoggedIn);

      setUser(res.data.user || null);

      // 🔥 SOCKET CONNECT AFTER LOGIN
      if (isLoggedIn && !getSocket()) {
        connectSocket();
      }
    } catch (err) {
      try {
        // 2️⃣ agar fail → refresh token
        await api.post("/api/users/auth/refresh-token");

        // 3️⃣ dobara check-token
        const res = await api.get("/api/users/auth/check-token");

        setAuth(true);
        setUser(res.data.user || null);

        if (!getSocket()) connectSocket();
      } catch (error) {
        // ❌ dono fail → logout
        setAuth(false);
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  /* =========================
     🔥 FORCE LOGOUT (SOCKET)
  ========================= */

  useEffect(() => {
    if (!auth) return; // 🔥 IMPORTANT (no socket if not logged in)

    let socket = getSocket();

    if (!socket) {
      socket = connectSocket();
    }

    const handleForceLogout = () => {
      console.log("🔥 Force logout received");

      disconnectSocket();
      setAuth(false);
      localStorage.setItem("logout", Date.now());

      if (window.location.pathname !== "/login") {
        navigate("/login");
      }
    };

    socket.on("force_logout", handleForceLogout);

    return () => {
      socket.off("force_logout", handleForceLogout);
    };
  }, [auth, navigate]);

  /* =========================
     🔥 MULTI TAB SYNC (GLOBAL)
  ========================= */
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === "logout" && auth !== false) {
        console.log("🔥 Logout from another tab");

        disconnectSocket();
        setAuth(false);

        if (window.location.pathname !== "/login") {
          navigate("/login");
        }
      }

      if (event.key === "login" && auth !== true) {
        console.log("🔥 Login from another tab");

        setAuth(true);
        connectSocket();

        if (window.location.pathname !== "/") {
          navigate("/");
        }
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [auth, navigate]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, checkAuth, user, setUser }}>
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
