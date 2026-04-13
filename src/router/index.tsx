import { FileSearch } from "lucide-react";
import {
  Link,
  Navigate,
  RouterProvider,
  createHashRouter,
  isRouteErrorResponse,
  useRouteError,
} from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { EmptyState } from "../components/ui/EmptyState";
import { routeMetadata } from "../lib/utils";
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
      <div className="w-full max-w-2xl">
        <EmptyState
          action={
            <Link
              className="button-primary"
              to="/dashboard"
            >
              Go to dashboard
            </Link>
          }
          description={message}
          icon={FileSearch}
          title="We couldn&apos;t load that route"
        />
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="py-6">
      <EmptyState
        action={
          <Link
            className="button-primary"
            to="/dashboard"
          >
            Return to dashboard
          </Link>
        }
        description="Check the address or return to the main workspace to continue."
        icon={FileSearch}
        title="This page isn&apos;t available"
      />
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
          handle: routeMetadata.dashboard,
        },
        {
          path: "assets",
          element: <AssetsPage />,
          handle: routeMetadata.assets,
        },
        {
          path: "assets/:id",
          element: <AssetDetailPage />,
          handle: routeMetadata.assetDetail,
        },
        {
          path: "employees",
          element: <EmployeesPage />,
          handle: routeMetadata.employees,
        },
        {
          path: "assignments",
          element: <AssignmentsPage />,
          handle: routeMetadata.assignments,
        },
        {
          path: "maintenance",
          element: <MaintenancePage />,
          handle: routeMetadata.maintenance,
        },
        {
          path: "requests",
          element: <RequestsPage />,
          handle: routeMetadata.requests,
        },
        {
          path: "vendors",
          element: <VendorsPage />,
          handle: routeMetadata.vendors,
        },
        {
          path: "reports",
          element: <ReportsPage />,
          handle: routeMetadata.reports,
        },
        {
          path: "settings",
          element: <SettingsPage />,
          handle: routeMetadata.settings,
        },
        {
          path: "*",
          element: <NotFoundPage />,
          handle: routeMetadata.notFound,
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
