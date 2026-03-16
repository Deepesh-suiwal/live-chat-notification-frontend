import { Link, NavLink } from "react-router-dom";

const linkBase =
  "text-sm text-slate-300 hover:text-cyan-200 transition";

function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="relative">
        <div className="absolute inset-0">
          <div className="absolute -top-6 left-10 h-14 w-14 rounded-full bg-cyan-500/20 blur-2xl" />
          <div className="absolute -top-8 right-12 h-16 w-16 rounded-full bg-indigo-500/20 blur-2xl" />
        </div>
        <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 text-white">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
            <span className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">
              Chatverse
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${linkBase} ${isActive ? "text-cyan-200" : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? "text-cyan-200" : ""}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? "text-cyan-200" : ""}`
              }
            >
              Contact
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden sm:inline-flex text-sm text-slate-300 hover:text-cyan-200 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
