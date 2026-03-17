import { Link } from "react-router-dom";

const notifications = [
  {
    id: 1,
    title: "Aarav Singh accepted your request",
    time: "2m ago",
    type: "accepted",
  },
  {
    id: 2,
    title: "Mira Patel sent a new connection request",
    time: "1h ago",
    type: "request",
  },
  {
    id: 3,
    title: "Reminder: reply to Kabir Mehta",
    time: "3h ago",
    type: "reminder",
  },
  {
    id: 4,
    title: "New message in Product Collab",
    time: "Yesterday",
    type: "message",
  },
];

function Notifications() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-36 -right-16 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_45%),radial-gradient(circle_at_85%_15%,rgba(99,102,241,0.16),transparent_40%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-20 pt-12 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              Notifications
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              Stay on top of every request and reply.
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Track accepted requests, messages, and reminders in one place.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="rounded-full border border-white/10 px-5 py-2 text-sm text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-200">
              Mark all as read
            </button>
            <Link
              to="/requests"
              className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              View requests
            </Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-4">
            {notifications.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div>
                  <p className="text-sm text-white">{item.title}</p>
                  <p className="mt-2 text-xs text-slate-400">{item.time}</p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                  {item.type}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                Notification settings
              </p>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  Push alerts for new requests.
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  Daily summary at 9:00 AM.
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  Mute messages during focus hours.
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/10 via-transparent to-indigo-400/10 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                Tip
              </p>
              <p className="mt-3 text-sm text-slate-300">
                Keep your request inbox clean so you never miss a new connection.
              </p>
              <button className="mt-4 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-200">
                Manage preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
