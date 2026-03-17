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
              Checking authentication...
            </div>
            <p className="text-sm text-slate-300">
              Hang tight while we verify your session.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
