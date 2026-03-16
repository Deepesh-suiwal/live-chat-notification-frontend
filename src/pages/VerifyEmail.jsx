import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";


const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const inputsRef = useRef([]);

  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  if (!email) {
    return <Navigate to="/register" replace />;
  }

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const otpCode = otp.join("").trim();

    if (otpCode.length !== 6) {
      setErr("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setErr("");

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/users/auth/verify-email`,
        {
          email,
          otp: otpCode,
        }
      );

      if (res.status === 200) {
        console.log("Email verified successfully");

        setTimeout(() => {
          navigate("/login");
        }, 1200);
      }
    } catch (err) {
      const message = err?.response?.data?.message || "Invalid or expired OTP";
      setErr(message);
      console.error(message);
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
        <div className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8 sm:p-10">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold text-white">
              Verify your email
            </h2>
            <p className="text-sm text-slate-300">
              Enter the 6-digit OTP sent to
              <br />
              <span className="font-medium text-white">{email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {err && (
              <div className="bg-red-500/15 text-red-100 border border-red-400/40 text-sm px-3 py-2 rounded-lg">
                {err}
              </div>
            )}

            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  value={digit}
                  maxLength={1}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-xl font-semibold bg-slate-900/60 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-cyan-500 text-slate-950 font-semibold rounded-lg hover:bg-cyan-400 transition flex items-center justify-center shadow-lg shadow-cyan-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                  Verifying...
                </div>
              ) : (
                "Verify Email"
              )}
            </button>
          </form>

          <p className="text-sm text-center text-slate-300 mt-4">
            Didn't receive OTP?{" "}
            <button className="text-cyan-300 hover:text-cyan-200">
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
