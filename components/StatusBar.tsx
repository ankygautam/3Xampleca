import { config } from "@/config";

function LiveIndicator() {
  if (!config.isLive) {
    return (
      <span className="inline-flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
        Offline
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-emerald-400/60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
      </span>
      Live now
    </span>
  );
}

export function StatusBar() {
  return (
    <section className="section-shell mt-8">
      <div className="surface-card overflow-x-auto rounded-2xl py-3">
        <div className="flex min-w-max items-center gap-6 px-4 text-sm text-slate-600 dark:text-slate-300 sm:px-6">
          <LiveIndicator />
          <span>{config.streamSchedule}</span>
          <span>{config.liveAppCount} live app examples</span>
          <span>Ideas welcome on X</span>
        </div>
      </div>
    </section>
  );
}
