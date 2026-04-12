import {
  Link,
  Navigate,
  RouterProvider,
  createHashRouter,
  isRouteErrorResponse,
  useRouteError,
} from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { AssetDetailPage } from "../pages/AssetDetailPage";
import { AssetsPage } from "../pages/AssetsPage";
import { AssignmentsPage } from "../pages/AssignmentsPage";
import { DashboardPage } from "../pages/DashboardPage";
import { EmployeesPage } from "../pages/EmployeesPage";
import { MaintenancePage } from "../pages/MaintenancePage";
import { ReportsPage } from "../pages/ReportsPage";
import { RequestsPage } from "../pages/RequestsPage";
import { SettingsPage } from "../pages/SettingsPage";
import { VendorsPage } from "../pages/VendorsPage";

function RouteErrorBoundary() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : "Something went wrong while loading this page.";

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-panel">
        <p className="text-sm font-medium text-slate-500">Page unavailable</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
          We couldn&apos;t load that route
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">{message}</p>
        <div className="mt-6">
          <Link
            className="inline-flex items-center rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            to="/dashboard"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

const router = createHashRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <RouteErrorBoundary />,
      children: [
        {
          index: true,
          element: <Navigate replace to="/dashboard" />,
        },
        {
          path: "dashboard",
          element: <DashboardPage />,
          handle: { title: "Dashboard" },
        },
        {
          path: "assets",
          element: <AssetsPage />,
          handle: { title: "Assets" },
        },
        {
          path: "assets/:id",
          element: <AssetDetailPage />,
          handle: { title: "Asset Detail" },
        },
        {
          path: "employees",
          element: <EmployeesPage />,
          handle: { title: "Employees" },
        },
        {
          path: "assignments",
          element: <AssignmentsPage />,
          handle: { title: "Assignments" },
        },
        {
          path: "maintenance",
          element: <MaintenancePage />,
          handle: { title: "Maintenance" },
        },
        {
          path: "requests",
          element: <RequestsPage />,
          handle: { title: "Requests" },
        },
        {
          path: "vendors",
          element: <VendorsPage />,
          handle: { title: "Vendors" },
        },
        {
          path: "reports",
          element: <ReportsPage />,
          handle: { title: "Reports" },
        },
        {
          path: "settings",
          element: <SettingsPage />,
          handle: { title: "Settings" },
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
