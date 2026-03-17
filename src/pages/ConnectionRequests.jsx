import { Link } from "react-router-dom";

const requests = [
  {
    id: 1,
    name: "Aarav Singh",
    note: "Wants to connect about design systems.",
    mutuals: 8,
  },
  {
    id: 2,
    name: "Mira Patel",
    note: "Sent a collab request for product research.",
    mutuals: 3,
  },
  {
    id: 3,
    name: "Kabir Mehta",
    note: "Interested in chatting about front-end roles.",
    mutuals: 5,
  },
];

function ConnectionRequests() {
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
              Connection requests
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              Review who wants to chat with you.
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Accept only the people you trust. Every request includes context
              before you reply.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="rounded-full border border-white/10 px-5 py-2 text-sm text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-200">
              Filter requests
            </button>
            <Link
              to="/notifications"
              className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              View notifications
            </Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {request.name}
                    </p>
                    <p className="text-sm text-slate-300">{request.note}</p>
                    <p className="mt-2 text-xs text-slate-400">
                      {request.mutuals} mutual connections
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-200">
                      View profile
                    </button>
                    <button className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                      Accept
                    </button>
                    <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-indigo-400/50 hover:text-indigo-200">
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                Quick actions
              </p>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  Enable auto-replies for new requests.
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  Set preferred connection topics.
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  Review your safety checklist.
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/10 via-transparent to-indigo-400/10 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                Trust layer
              </p>
              <p className="mt-3 text-sm text-slate-300">
                You control who reaches you. All accepted requests open a private
                chat with clear intent and identity.
              </p>
              <button className="mt-4 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-200">
                Update privacy settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectionRequests;
