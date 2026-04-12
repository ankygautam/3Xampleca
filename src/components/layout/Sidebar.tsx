import {
  BarChart3,
  Boxes,
  ClipboardList,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Truck,
  UserSquare2,
  Users,
  Wrench,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";

const navigationItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Assets", path: "/assets", icon: Boxes },
  { label: "Employees", path: "/employees", icon: Users },
  { label: "Assignments", path: "/assignments", icon: ClipboardList },
  { label: "Maintenance", path: "/maintenance", icon: Wrench },
  { label: "Requests", path: "/requests", icon: ShieldCheck },
  { label: "Vendors", path: "/vendors", icon: Truck },
  { label: "Reports", path: "/reports", icon: BarChart3 },
  { label: "Settings", path: "/settings", icon: Settings },
] as const;

export function Sidebar() {
  return (
    <aside className="flex h-full flex-col bg-slate-950 px-4 py-5 text-slate-100 lg:px-5 lg:py-6">
      <div className="flex items-center gap-3 rounded-2xl px-2 py-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
          <UserSquare2 className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-tight text-white">3xampleca</p>
          <p className="text-xs text-slate-400">Asset operations</p>
        </div>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1.5">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors duration-150",
                  "hover:bg-white/6 hover:text-white",
                  isActive && "bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-slate-200" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
          Workspace
        </p>
        <p className="mt-2 text-sm font-medium text-white">Admin</p>
        <p className="mt-1 text-xs text-slate-400">Internal IT management</p>
      </div>
    </aside>
  );
}
