import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/25 blur-3xl" />
        <div className="absolute -bottom-32 -right-10 h-96 w-96 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.15),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.18),transparent_40%)]" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-3xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-cyan-300/80">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            Chatverse
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white">
            Live conversations, perfectly synced.
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Your chat workspace with instant alerts, rich profiles, and secure
            verification. Built to keep teams connected in real time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/register"
              className="px-5 py-2.5 bg-cyan-500 text-slate-950 font-semibold rounded-lg hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/30"
            >
              Create account
            </Link>
            <Link
              to="/login"
              className="px-5 py-2.5 border border-white/20 rounded-lg text-slate-100 hover:bg-white/10 transition"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
