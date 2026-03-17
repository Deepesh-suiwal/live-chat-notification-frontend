import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-slate-950 text-slate-300">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-10 h-24 w-24 rounded-full bg-cyan-500/20 blur-2xl" />
        <div className="absolute bottom-0 right-12 h-28 w-28 rounded-full bg-indigo-500/20 blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_90%,rgba(99,102,241,0.12),transparent_40%)]" />
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-cyan-200/80">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              Chatverse
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              A connection-first chat app where every conversation starts with
              a request, acceptance, and a secure space to talk.
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-slate-400">
              <span className="rounded-full border border-white/10 px-3 py-1">
                End-to-end ready
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1">
                Presence indicators
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1">
                Multi-device
              </span>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Product
            </p>
            <div className="flex flex-col gap-2">
              <Link to="/" className="hover:text-cyan-200 transition">
                Home
              </Link>
              <Link to="/about" className="hover:text-cyan-200 transition">
                Why Chatverse
              </Link>
              <Link to="/contact" className="hover:text-cyan-200 transition">
                Contact
              </Link>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Community
            </p>
            <div className="flex flex-col gap-2 text-slate-400">
              <span>Safety center</span>
              <span>Guidelines</span>
              <span>Developer API</span>
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
                Built for intentional conversations.
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
