import { Bell, Search } from "lucide-react";
import { useMatches } from "react-router-dom";

interface RouteHandle {
  title?: string;
}

export function Header() {
  const matches = useMatches();
  const currentMatch = matches[matches.length - 1];
  const routeHandle = currentMatch?.handle as RouteHandle | undefined;
  const pageTitle = routeHandle?.title ?? "Dashboard";

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-semibold tracking-tight text-slate-950">
            {pageTitle}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage assets, requests, and internal device operations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="relative hidden min-w-[280px] items-center xl:flex">
            <Search className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400" />
            <input
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:bg-white"
              placeholder="Search assets, employees, or requests"
              type="text"
            />
          </label>

          <button
            aria-label="Open notifications"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
            type="button"
          >
            <Bell className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
              AU
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-slate-900">Admin User</p>
              <p className="text-xs text-slate-500">IT Operations</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
