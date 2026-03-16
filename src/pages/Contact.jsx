import React from "react";

function Contact() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/25 blur-3xl" />
        <div className="absolute -bottom-32 -right-10 h-96 w-96 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.15),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.18),transparent_40%)]" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-3xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-10 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-cyan-300/80">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            Contact
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white">
            Let us know what you need.
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Reach the Chatverse team for support, integrations, or partnership
            inquiries. We respond within one business day.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-300">
            <div className="p-4 rounded-2xl border border-white/10 bg-slate-900/40">
              <h3 className="text-white font-semibold mb-2">Email</h3>
              <p>support@chatverse.app</p>
            </div>
            <div className="p-4 rounded-2xl border border-white/10 bg-slate-900/40">
              <h3 className="text-white font-semibold mb-2">Office</h3>
              <p>Remote-first, serving teams worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
