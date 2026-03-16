import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const otp = location.state?.otp;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  if (!email || !otp) return <Navigate to="/forgot-password" replace />;

  const submit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErr("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/users/auth/reset-password`,
        {
          newPassword: password,
          confirmPassword,
        },
        {
          withCredentials: true,
        },
      );

      if (res.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      setErr(error?.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
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
        <form
          onSubmit={submit}
          className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8 sm:p-10 flex flex-col gap-6"
        >
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold text-white">
              Choose a new password
            </h2>
            <p className="text-sm text-slate-300">
              Keep your account secure with a strong password.
            </p>
          </div>

          {err && (
            <div className="bg-red-500/15 text-red-100 border border-red-400/40 text-sm px-3 py-2 rounded-lg">
              {err}
            </div>
          )}

          <label className="flex flex-col gap-2 text-sm text-slate-200">
            New password
            <input
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2.5 bg-slate-900/60 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Confirm password
            <input
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="px-4 py-2.5 bg-slate-900/60 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="py-3 bg-cyan-500 text-slate-950 font-semibold rounded-lg hover:bg-cyan-400 transition flex items-center justify-center shadow-lg shadow-cyan-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
