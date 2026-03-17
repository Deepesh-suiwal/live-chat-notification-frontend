import { useEffect, useState } from "react";
import api from "../services/api";

function Settings() {
  const [theme, setTheme] = useState("system");
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [sessions, setSessions] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [sessionsError, setSessionsError] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const handleAction = async (label, action) => {
    setLoading(label);
    setMessage("");
    try {
      await action();
      setMessage(`${label} updated successfully.`);
    } catch (err) {
      setMessage(`${label} failed. Please try again.`);
    } finally {
      setLoading("");
    }
  };

  const handleThemeUpdate = () =>
    handleAction("Theme", () =>
      api.patch("/api/users/settings/theme", { theme }),
    );

  const handleOnlineStatusUpdate = () =>
    handleAction("Online status", () =>
      api.patch("/api/users/settings/online-status", {
        showOnlineStatus: onlineStatus,
      }),
    );

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword) {
      setMessage("Please enter old and new password.");
      return;
    }

    return handleAction("Password", async () => {
      await api.patch("/api/users/settings/change-password", {
        oldPassword,
        newPassword,
        confirmPassword: newPassword,
      });
      setOldPassword("");
      setNewPassword("");
    });
  };

  const handleLogoutAllDevices = () =>
    handleAction("Logout all devices", async () => {
      await api.post("/api/users/settings/logout-all");
      setSessions([]);
    });

  const handleDeleteAccount = async () => {
    if (deleteConfirmText.trim().toUpperCase() !== "DELETE") {
      setMessage("Please type DELETE to confirm.");
      return;
    }
    setLoading("Delete account");
    setMessage("");
    try {
      await api.delete("/api/users/settings/delete-account", {
        data: { confirm: true },
      });
      setMessage("Account deleted successfully.");
      setShowDeleteDialog(false);
      setDeleteConfirmText("");
    } catch (err) {
      setMessage("Account deletion failed. Please try again.");
    } finally {
      setLoading("");
    }
  };

  const handleLogoutSession = (sessionId) =>
    handleAction("Logout session", async () => {
      await api.delete(`/api/users/settings/sessions/${sessionId}`);
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    });

  const normalizeSession = (session, index) => ({
    id: session?._id ?? `session_${index}`,
    device:
      session?.device ??
      session?.userAgent ??
      session?.browser ??
      "Unknown device",
    location: session?.ipAddress ?? "Unknown location",
    lastActive: session?.lastActivity ?? "Recently",
    isCurrent:
      session?.isCurrent ??
      session?.current ??
      session?.isCurrentSession ??
      false,
  });

  const fetchSessions = async () => {
    setSessionsLoading(true);
    setSessionsError("");
    try {
      const res = await api.get("/api/users/settings/sessions");
      console.log(res.data.data);

      const list = res?.data?.data ?? res?.data ?? [];
      const normalized = Array.isArray(list) ? list.map(normalizeSession) : [];
      setSessions(normalized);
    } catch (err) {
      setSessionsError("Failed to load sessions.");
    } finally {
      setSessionsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const canDeleteAccount = deleteConfirmText.trim().toUpperCase() === "DELETE";

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-36 -right-16 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_45%),radial-gradient(circle_at_85%_15%,rgba(99,102,241,0.16),transparent_40%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-20 pt-12 sm:px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Settings
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            Control notifications and privacy.
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Choose what alerts you want and keep your account secure.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              Personalization
            </p>
            <div className="mt-5 space-y-4 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
                <p className="text-sm text-white">Update theme</p>
                <p className="mt-1 text-xs text-slate-400">
                  Choose light, dark, or system default.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["light", "dark", "system"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`rounded-full border px-4 py-2 text-xs transition ${
                        theme === item
                          ? "border-cyan-400/60 text-cyan-200"
                          : "border-white/10 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-200"
                      }`}
                      onClick={() => setTheme(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-3 rounded-full bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-400"
                  onClick={handleThemeUpdate}
                  disabled={loading === "Theme"}
                >
                  {loading === "Theme" ? "Updating..." : "Update theme"}
                </button>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
                <p className="text-sm text-white">Online status</p>
                <p className="mt-1 text-xs text-slate-400">
                  Show when you are available for chat.
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {onlineStatus ? "Visible" : "Hidden"}
                  </span>
                  <button
                    type="button"
                    className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-200"
                    onClick={() => setOnlineStatus((prev) => !prev)}
                  >
                    Toggle
                  </button>
                </div>
                <button
                  type="button"
                  className="mt-3 rounded-full bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-400"
                  onClick={handleOnlineStatusUpdate}
                  disabled={loading === "Online status"}
                >
                  {loading === "Online status"
                    ? "Updating..."
                    : "Update status"}
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              Security
            </p>
            <div className="mt-5 space-y-4 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
                <p className="text-sm text-white">Change password</p>
                <p className="mt-1 text-xs text-slate-400">
                  Rotate your password regularly for better security.
                </p>
                <div className="mt-3 grid grid-cols-1 gap-2">
                  <input
                    type="password"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:border-cyan-400/60 focus:outline-none"
                    placeholder="Old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:border-cyan-400/60 focus:outline-none"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="mt-3 rounded-full border border-white/10 px-4 py-2 text-xs text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-200"
                  onClick={handleChangePassword}
                  disabled={
                    loading === "Password" || !oldPassword || !newPassword
                  }
                >
                  {loading === "Password" ? "Updating..." : "Update password"}
                </button>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
                <p className="text-sm text-white">Logout all devices</p>
                <p className="mt-1 text-xs text-slate-400">
                  End all active sessions across devices.
                </p>
                <button
                  type="button"
                  className="mt-3 rounded-full border border-white/10 px-4 py-2 text-xs text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-200"
                  onClick={handleLogoutAllDevices}
                  disabled={loading === "Logout all devices"}
                >
                  {loading === "Logout all devices"
                    ? "Updating..."
                    : "Logout all devices"}
                </button>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
                <p className="text-sm text-white">Delete account</p>
                <p className="mt-1 text-xs text-amber-200">
                  This action is irreversible.
                </p>
                <button
                  type="button"
                  className="mt-3 rounded-full border border-amber-300/40 px-4 py-2 text-xs text-amber-200 transition hover:border-amber-300 hover:text-amber-100"
                  onClick={() => setShowDeleteDialog(true)}
                  disabled={loading === "Delete account"}
                >
                  {loading === "Delete account"
                    ? "Deleting..."
                    : "Delete account"}
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              Active sessions
            </p>
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {sessionsLoading ? (
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
                  Loading sessions...
                </div>
              ) : sessionsError ? (
                <div className="rounded-2xl border border-amber-300/30 bg-amber-500/10 p-4 text-sm text-amber-200">
                  {sessionsError}
                </div>
              ) : sessions.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
                  No active sessions found.
                </div>
              ) : (
                sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`rounded-2xl border bg-slate-950/70 p-4 text-sm text-slate-300 ${
                      session.isCurrent
                        ? "border-cyan-400/60 shadow-[0_0_0_1px_rgba(34,211,238,0.35)]"
                        : "border-white/10"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-white">
                        {session.device}
                      </p>
                      {session.isCurrent ? (
                        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200">
                          <span className="h-2 w-2 rounded-full bg-cyan-300" />
                          Current session
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-xs text-slate-400">
                      {session.location} • {session.lastActive}
                    </p>
                    <button
                      type="button"
                      className="mt-4 rounded-full border border-white/10 px-4 py-2 text-xs text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-200"
                      onClick={() => handleLogoutSession(session.id)}
                      disabled={
                        loading === "Logout session" || session.isCurrent
                      }
                    >
                      {session.isCurrent
                        ? "Current session"
                        : loading === "Logout session"
                          ? "Logging out..."
                          : "Logout session"}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {showDeleteDialog ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => {
              setShowDeleteDialog(false);
              setDeleteConfirmText("");
            }}
          />
          <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/90 p-6 text-slate-200 shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Delete account</p>
              <button
                type="button"
                className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-300 hover:border-amber-300/60 hover:text-amber-200"
                onClick={() => {
                  setShowDeleteDialog(false);
                  setDeleteConfirmText("");
                }}
              >
                Close
              </button>
            </div>
            <p className="mt-3 text-xs text-amber-200">
              This action is irreversible. Type DELETE to confirm.
            </p>
            <input
              type="text"
              className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 uppercase placeholder:text-slate-500 focus:border-amber-300/70 focus:outline-none"
              placeholder="Type DELETE"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
            />
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-300 transition hover:border-white/30 hover:text-white"
                onClick={() => {
                  setShowDeleteDialog(false);
                  setDeleteConfirmText("");
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-full border border-amber-300/40 px-4 py-2 text-xs text-amber-200 transition hover:border-amber-300 hover:text-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={handleDeleteAccount}
                disabled={loading === "Delete account" || !canDeleteAccount}
              >
                {loading === "Delete account"
                  ? "Deleting..."
                  : "Delete account"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Settings;
