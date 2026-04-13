import { useEffect } from "react";
import { Bell, ChevronRight, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { buildBreadcrumbs, getRouteMeta, getUserInitials } from "../../lib/utils";

export function Header() {
  const location = useLocation();
  const routeMeta = getRouteMeta(location.pathname);
  const breadcrumbs = buildBreadcrumbs(location.pathname);
  const { pushToast } = useToast();

  useEffect(() => {
    document.title = `${routeMeta.title} | 3Xampleca`;
  }, [routeMeta.title]);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
              {breadcrumbs.map((crumb, index) => (
                <div className="flex items-center gap-1.5" key={`${crumb.label}-${index}`}>
                  {index > 0 ? <ChevronRight className="h-3.5 w-3.5 text-slate-400" /> : null}
                  {crumb.to ? (
                    <Link className="transition hover:text-slate-700" to={crumb.to}>
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-slate-700">{crumb.label}</span>
                  )}
                </div>
              ))}
            </nav>

            <h1 className="mt-2 truncate text-[1.75rem] font-semibold tracking-[-0.035em] text-slate-950">
              {routeMeta.title}
            </h1>
            <p className="mt-1.5 max-w-3xl text-sm leading-6 text-slate-500">{routeMeta.subtitle}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="toolbar-search hidden min-w-[320px] xl:block">
              <Search className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400" />
              <input
                className="toolbar-input rounded-2xl"
                placeholder="Search assets, requests, employees, or vendors"
                readOnly
                type="text"
                onFocus={() =>
                  pushToast({
                    type: "info",
                    title: "Global search preview",
                    message:
                      "The global search surface is included in this prototype for layout review and workflow planning.",
                  })
                }
              />
            </label>

            <button
              aria-label="Open notifications"
              className="button-icon rounded-2xl"
              onClick={() =>
                pushToast({
                  type: "info",
                  title: "Notifications preview",
                  message:
                    "Notification routing is represented in the portfolio prototype and can be connected to live events later.",
                })
              }
              type="button"
            >
              <Bell className="h-4 w-4" />
            </button>

            <button
              className="flex h-11 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3.5 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-100"
              onClick={() =>
                pushToast({
                  type: "info",
                  title: "Profile menu preview",
                  message:
                    "Role switching and account preferences are available as a future extension of the admin shell.",
                })
              }
              type="button"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                {getUserInitials("Admin User")}
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-medium text-slate-900">Admin User</p>
                <p className="text-xs text-slate-500">IT Operations</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
