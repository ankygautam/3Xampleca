import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  return (
    <div className="grid min-h-screen bg-slate-100 lg:grid-cols-[272px_minmax(0,1fr)]">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex min-h-screen min-w-0 flex-col bg-slate-100">
        <Header />
        <main className="flex-1">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
