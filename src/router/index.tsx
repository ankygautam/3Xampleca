import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
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
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
