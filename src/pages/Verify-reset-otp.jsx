import { useState, useRef } from "react";
import { useNavigate, useLocation, Navigate, Link } from "react-router-dom";
import axios from "axios";

const VerifyResetOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const email = location.state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);

  if (!email) return <Navigate to="/forgot-password" replace />;

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const submit = async (e) => {
    e.preventDefault();
   

    const otpCode = otp.join("");

    if (otpCode.length !== 6) return;

    setLoading(true);

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/users/auth/verify-forgot-password-otp`,
        {
          email,
          otp: otpCode,
        },
        {
          withCredentials: true,
        },
      );

      if (res.status === 200) {
        navigate("/reset-password", {
          state: { email, otp: otpCode },
        });
      }
    } catch (err) {
      console.log(err?.response?.data?.message);
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
            <h2 className="text-2xl font-semibold text-white">Verify OTP</h2>
            <p className="text-sm text-slate-300">
              Enter the 6-digit code sent to your email.
            </p>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-6">
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  value={digit}
                  maxLength={1}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="w-12 h-12 text-center text-xl font-semibold bg-slate-900/60 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-cyan-500 text-slate-950 font-semibold rounded-lg hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/30"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <p className="text-sm text-center text-slate-300">
              <Link to="/login" className="text-cyan-300 hover:text-cyan-200">
                Back to Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyResetOtp;
