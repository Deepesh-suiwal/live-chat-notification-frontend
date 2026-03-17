import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { connectSocket } from "../socket/socket";
const Login = () => {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    try {
      await axios.post(
        `${BACKEND_URL}/api/users/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      console.log("Login successful");

      setAuth(true);

      connectSocket();
            // 🔥 LOGIN SYNC (IMPORTANT)
      localStorage.setItem("login", Date.now());

      navigate("/dashboard");
      
    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

      if (!clientId) {
        console.error("Missing Google Client ID");
        return;
      }

      const redirectUri = `${window.location.origin}/user/google/callback`;
      const scope = "openid email profile";

      const googleAuthUrl =
        `https://accounts.google.com/o/oauth2/v2/auth` +
        `?client_id=${clientId}` +
        `&redirect_uri=${redirectUri}` +
        `&response_type=code` +
        `&scope=${encodeURIComponent(scope)}` +
        `&access_type=offline` +
        `&prompt=consent`;

      window.location.href = googleAuthUrl;
    } catch (err) {
      console.error("Google login init failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/25 blur-3xl" />
        <div className="absolute -bottom-32 -right-10 h-96 w-96 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.15),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.18),transparent_40%)]" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          <div className="hidden lg:flex flex-col justify-between p-10 bg-linear-to-br from-slate-900 via-slate-900 to-slate-800 border-r border-white/10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-cyan-300/80">
                <span className="h-2 w-2 rounded-full bg-cyan-300" />
                Chatverse
              </div>
              <h1 className="text-3xl font-semibold leading-tight text-white">
                Welcome back to your
                <span className="text-cyan-300"> live workspace</span>.
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                Jump back into your channels, check alerts, and stay synced
                across devices in seconds.
              </p>
            </div>
            <div className="space-y-4 text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Smart presence and activity tracking
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                One click Google sign in
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                Fast secure session restore
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="p-8 sm:p-10 flex flex-col gap-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-white">Sign in</h2>
              <p className="text-sm text-slate-300">
                Continue where you left off.
              </p>
            </div>

            {err && (
              <div className="bg-red-500/15 text-red-100 border border-red-400/40 text-sm px-3 py-2 rounded-lg">
                {err}
              </div>
            )}

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-3 border border-white/15 rounded-lg py-2.5 text-sm font-medium text-slate-100 hover:bg-white/10 transition"
            >
              <FcGoogle size={20} />
              Sign in with Google
            </button>

            <div className="space-y-4">
              <label className="flex flex-col gap-2 text-sm text-slate-200">
                Email address
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  autoFocus
                  className="px-4 py-2.5 bg-slate-900/60 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm text-slate-200">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="px-4 py-2.5 bg-slate-900/60 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="py-3 bg-cyan-500 text-slate-950 font-semibold rounded-lg hover:bg-cyan-400 transition flex items-center justify-center shadow-lg shadow-cyan-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </button>

            <div className="space-y-2 text-sm text-center text-slate-300">
              <p>
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-cyan-300 font-medium hover:text-cyan-200"
                >
                  Sign up
                </Link>
              </p>
              <p>
                <Link
                  to="/forgot-password"
                  className="text-cyan-300 hover:text-cyan-200"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
