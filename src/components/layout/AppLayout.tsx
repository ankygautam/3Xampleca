import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  return (
    <div className="grid min-h-screen bg-[#f3f6fb] lg:grid-cols-[296px_minmax(0,1fr)]">
      <div className="hidden lg:block">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
      </div>

      <div className="min-w-0 bg-transparent">
        <Header />
        <main className="min-h-[calc(100vh-101px)] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.92),_rgba(248,250,252,0.98)_32%,_rgba(243,246,251,1))]">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <Outlet />
            <footer className="flex flex-col gap-2 border-t border-slate-200/80 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <p>3Xampleca portfolio prototype</p>
              <p>Mock environment for asset lifecycle visibility, maintenance operations, and reporting workflows.</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
