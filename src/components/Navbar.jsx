import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiBell,
  FiMessageSquare,
  FiSearch,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { getSocket, disconnectSocket } from "../socket/socket";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleLogout = async () => {
    try {
      const socket = getSocket();

      if (socket) {
        socket.disconnect();
      }

      await api.get("/api/users/auth/logout");
      setAuth(false);
      // 🔥 MULTI TAB SYNC
      localStorage.setItem("logout", Date.now());
    } catch (error) {
      // Ignore API errors and still force local logout navigation.
    } finally {
      disconnectSocket(); // ensure cleanup
      setMenuOpen(false);
      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="relative">
        <div className="absolute inset-0">
          <div className="absolute -top-8 left-8 h-16 w-16 rounded-full bg-cyan-500/20 blur-2xl" />
          <div className="absolute -top-10 right-10 h-20 w-20 rounded-full bg-indigo-500/20 blur-2xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(56,189,248,0.12),transparent_40%)]" />
        </div>

        <div className="relative mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-linear-to-br from-cyan-400/30 to-indigo-400/30 text-cyan-100">
              <span className="text-sm font-semibold">CV</span>
            </span>
            <div className="hidden flex-col leading-tight sm:flex">
              <span className="text-sm uppercase tracking-[0.32em] text-cyan-200/80">
                Chatverse
              </span>
              <span className="text-xs text-slate-400">
                Connect. Accept. Chat.
              </span>
            </div>
          </Link>

          <div className="hidden flex-1 items-center justify-center md:flex">
            <div className="relative w-full max-w-md">
              <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search people or requests"
                className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-400 focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Link
              to="/requests"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-200"
              aria-label="Connection requests"
            >
              <FiUsers className="text-lg" />
              <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-linear-to-br from-cyan-400 to-indigo-400 text-[10px] font-semibold text-white shadow-[0_0_0_2px_rgba(15,23,42,0.9)]">
                3
              </span>
            </Link>
            <Link
              to="/"
              type="button"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-200"
              aria-label="Messages"
            >
              <FiMessageSquare className="text-lg" />
              <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-linear-to-br from-cyan-400 to-indigo-400 text-[10px] font-semibold text-white shadow-[0_0_0_2px_rgba(15,23,42,0.9)]">
                5
              </span>
            </Link>
            <Link
              to="/notifications"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-200"
              aria-label="Notifications"
            >
              <FiBell className="text-lg" />
              <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-linear-to-br from-cyan-400 to-indigo-400 text-[10px] font-semibold text-white shadow-[0_0_0_2px_rgba(15,23,42,0.9)]">
                2
              </span>
            </Link>
            <div
              className="relative"
              tabIndex={-1}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setMenuOpen(false);
                }
              }}
            >
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-200"
                aria-label="Profile"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <FiUser className="text-lg" />
              </button>
              {menuOpen ? (
                <div
                  className="absolute right-0 mt-3 w-48 rounded-2xl border border-white/10 bg-slate-950/95 p-2 shadow-2xl"
                  role="menu"
                >
                  <Link
                    to="/profile"
                    className="block rounded-xl px-3 py-2 text-sm text-slate-200 transition hover:bg-white/5 hover:text-cyan-200"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block rounded-xl px-3 py-2 text-sm text-slate-200 transition hover:bg-white/5 hover:text-cyan-200"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    type="button"
                    className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-200 transition hover:bg-white/5 hover:text-cyan-200"
                    role="menuitem"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
