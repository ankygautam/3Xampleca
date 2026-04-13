import {
  CircleHelp,
  Settings,
  Sparkles,
  UserSquare2,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { navItems } from "../../data/mockData";
import { useToast } from "../../hooks/useToast";
import { cn, getUserInitials } from "../../lib/utils";

const primaryNavItems = navItems.filter((item) => item.id !== "settings");

export function Sidebar() {
  const { pushToast } = useToast();

  return (
    <aside className="flex h-full flex-col border-r border-slate-800/90 bg-slate-950 px-5 py-6 text-slate-100">
      <div>
        <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.06] ring-1 ring-white/10">
              <UserSquare2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[-0.02em] text-white">3xampleca</p>
              <p className="text-xs leading-5 text-slate-400">Internal asset operations</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Operations
          </p>
          <nav className="mt-3 flex flex-col gap-1.5">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-300 transition-all duration-150",
                      "hover:bg-white/[0.06] hover:text-white",
                      isActive &&
                        "bg-white/[0.1] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/8",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-slate-400 transition-colors",
                          isActive && "bg-white/[0.08] text-white",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="truncate">{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
          <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Utilities
          </p>
          <div className="mt-3 space-y-1.5">
            <NavLink
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white",
                  isActive && "bg-white/[0.08] text-white ring-1 ring-white/8",
                )
              }
              to="/settings"
            >
              <Settings className="h-4 w-4 text-slate-400" />
              <span>Settings</span>
            </NavLink>

            <button
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
              onClick={() =>
                pushToast({
                  type: "info",
                  title: "Help center preview",
                  message:
                    "Support documentation and team onboarding links can be connected here in the full product version.",
                })
              }
              type="button"
            >
              <CircleHelp className="h-4 w-4 text-slate-400" />
              <span>Help Center</span>
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.08] text-sm font-semibold text-white">
              {getUserInitials("Admin User")}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">Admin User</p>
              <p className="truncate text-xs text-slate-400">IT Operations</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.04] px-3 py-2.5 text-xs leading-5 text-slate-300">
            <Sparkles className="h-3.5 w-3.5 text-slate-400" />
            <span>Workspace ready for daily operations</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
