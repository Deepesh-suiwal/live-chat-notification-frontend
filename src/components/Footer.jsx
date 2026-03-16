import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-300 border-t border-white/10">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-10 h-20 w-20 rounded-full bg-cyan-500/20 blur-2xl" />
        <div className="absolute bottom-0 right-12 h-24 w-24 rounded-full bg-indigo-500/20 blur-2xl" />
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-cyan-300/80">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              Chatverse
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Real-time chat infrastructure with verified onboarding and
              reliable notifications.
            </p>
          </div>

          <div className="space-y-2 text-sm">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Pages
            </p>
            <div className="flex flex-col gap-2">
              <Link to="/" className="hover:text-cyan-200 transition">
                Home
              </Link>
              <Link to="/about" className="hover:text-cyan-200 transition">
                About
              </Link>
              <Link to="/contact" className="hover:text-cyan-200 transition">
                Contact
              </Link>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Support
            </p>
            <div className="flex flex-col gap-2 text-slate-400">
              <span>support@chatverse.app</span>
              <span>Security: security@chatverse.app</span>
              <span className="text-xs text-slate-500">
                Built for teams that ship fast.
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Chatverse. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Status</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
