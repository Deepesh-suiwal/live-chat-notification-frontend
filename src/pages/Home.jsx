
function Home() {
  const users = [
    {
      id: 1,
      name: "Aarav Singh",
      role: "Product Designer",
      status: "online",
      lastMessage: "Sent the updated wireframes.",
      time: "2m",
      unread: 2,
    },
    {
      id: 2,
      name: "Mira Patel",
      role: "Frontend Engineer",
      status: "busy",
      lastMessage: "Can we sync after standup?",
      time: "12m",
      unread: 0,
    },
    {
      id: 3,
      name: "Noah Chen",
      role: "Founder",
      status: "online",
      lastMessage: "Investor deck needs final review.",
      time: "1h",
      unread: 4,
    },
    {
      id: 4,
      name: "Zoya Khan",
      role: "Growth Lead",
      status: "offline",
      lastMessage: "Thanks! Will reply tomorrow.",
      time: "Yesterday",
      unread: 0,
    },
  ];

  const messages = [
    {
      id: 1,
      from: "them",
      text: "Hey! Just shared the new onboarding flow.",
      time: "10:12 AM",
    },
    {
      id: 2,
      from: "me",
      text: "Got it. The progress steps look clean. Let me review the copy.",
      time: "10:13 AM",
    },
    {
      id: 3,
      from: "them",
      text: "Great. Also added an accessibility pass to the checklist.",
      time: "10:14 AM",
    },
    {
      id: 4,
      from: "me",
      text: "Perfect. I'll update the CTA button styles and send back.",
      time: "10:16 AM",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-12 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-28 -right-10 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(56,189,248,0.16),transparent_40%),radial-gradient(circle_at_85%_12%,rgba(99,102,241,0.18),transparent_45%)]" />
      </div>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:pb-24">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              Chat workspace
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              Keep the people list on the left, chat on the right.
            </h1>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              4 active chats
            </span>
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-cyan-200">
              Live
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr]">
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">People</p>
              <button className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-200">
                New
              </button>
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Search chats..."
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:border-cyan-400/60 focus:outline-none"
              />
            </div>
            <div className="mt-4 space-y-3">
              {users.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-left transition hover:border-cyan-400/40 hover:bg-slate-950/80"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400/60 to-indigo-400/60 p-[1px]">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                          {user.name
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-slate-950 ${
                            user.status === "online"
                              ? "bg-emerald-400"
                              : user.status === "busy"
                                ? "bg-amber-400"
                                : "bg-slate-500"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="text-sm text-white">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.role}</p>
                      </div>
                    </div>
                    <div className="text-right text-[10px] text-slate-400">
                      <p>{user.time}</p>
                      {user.unread > 0 ? (
                        <span className="mt-1 inline-flex items-center justify-center rounded-full bg-cyan-500 px-2 py-0.5 text-[10px] font-semibold text-slate-950">
                          {user.unread}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-slate-400">
                    {user.lastMessage}
                  </p>
                </button>
              ))}
            </div>
          </aside>

          <section className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-gradient-to-br from-cyan-400/60 to-indigo-400/60 p-[1px]">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                    AS
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Aarav Singh</p>
                  <p className="text-xs text-emerald-300">Online now</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <button className="rounded-full border border-white/10 px-3 py-1 transition hover:border-cyan-400/40 hover:text-cyan-200">
                  Call
                </button>
                <button className="rounded-full border border-white/10 px-3 py-1 transition hover:border-cyan-400/40 hover:text-cyan-200">
                  Share
                </button>
                <button className="rounded-full border border-white/10 px-3 py-1 transition hover:border-cyan-400/40 hover:text-cyan-200">
                  More
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              <div className="mx-auto w-fit rounded-full border border-white/10 bg-slate-950/70 px-4 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-400">
                Today
              </div>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.from === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      message.from === "me"
                        ? "bg-cyan-500/20 text-cyan-100"
                        : "bg-white/10 text-slate-200"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className="mt-2 text-[10px] text-slate-400">
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 px-6 py-4">
              <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
                <button className="text-xs text-slate-400 transition hover:text-cyan-200">
                  + Attach
                </button>
                <input
                  type="text"
                  placeholder="Write a message..."
                  className="flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
                />
                <button className="rounded-full bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-400">
                  Send
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

export default Home;
