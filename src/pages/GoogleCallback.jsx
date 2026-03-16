import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { connectSocket } from "../socket/socket";


const GoogleCallback = () => {
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { setAuth } = useAuth();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (!code) {
      console.error("No code from Google");
      return;
    }

    const login = async () => {
      try {
        const res = await axios.post(
          `${BACKEND_URL}/api/users/auth/google-login`,
          {
            code,
          },
          {
            withCredentials: true,
          },
        );
        console.log("Google login successful");
        setAuth(true);

        connectSocket();

        navigate("/dashboard");
      } catch (err) {
        console.error("Google login failed", err);
      }
    };

    login();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/25 blur-3xl" />
        <div className="absolute -bottom-32 -right-10 h-96 w-96 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.15),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.18),transparent_40%)]" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8 sm:p-10 text-center space-y-4">
          <div className="mx-auto h-12 w-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          <div className="text-lg font-semibold text-white">
            Logging in with Google...
          </div>
          <p className="text-sm text-slate-300">
            Hang tight while we secure your session.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoogleCallback;
