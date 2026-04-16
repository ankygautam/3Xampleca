import {
  Boxes,
  HardDrive,
  ShieldAlert,
  UserCheck,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  assets,
  assignmentHistory,
  assignments,
  maintenanceHistory,
  maintenanceRecords,
  serviceRequests,
  warrantyItems,
} from "../data/mockData";
import { BarChartCard } from "../components/charts/BarChartCard";
import { DonutChartCard } from "../components/charts/DonutChartCard";
import { TrendChartCard } from "../components/charts/TrendChartCard";
import { PageSection } from "../components/ui/PageSection";
import { StatCard } from "../components/ui/StatCard";
import { StatusBadge } from "../components/ui/StatusBadge";
import type { WarrantyItem } from "../types";

const summaryCards = [
  {
    title: "Total Assets",
    subtitle: "Tracked across all offices",
    helperText: "Includes assigned, spare, maintenance, and retired inventory",
    icon: Boxes,
  },
  {
    title: "Assigned Assets",
    subtitle: "Currently in employee use",
    helperText: "Active devices allocated to staff and team pools",
    icon: UserCheck,
  },
  {
    title: "Available Assets",
    subtitle: "Ready for deployment",
    helperText: "Provisioned stock available for onboarding and replacement",
    icon: HardDrive,
  },
  {
    title: "Under Maintenance",
    subtitle: "In active service flow",
    helperText: "Devices waiting on repair, service, or vendor updates",
    icon: Wrench,
  },
  {
    title: "Retired Assets",
    subtitle: "Removed from active inventory",
    helperText: "Archived records retained for audit and lifecycle tracking",
    icon: ShieldAlert,
  },
] as const;

const chartPalette = ["#0f172a", "#334155", "#64748b", "#94a3b8", "#cbd5e1"];

const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });

function getMonthLabel(dateValue: string) {
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) {
    return dateValue;
  }

  return monthFormatter.format(parsed);
}

export function DashboardPage() {
  const totalAssets = assets.length;
  const assignedAssets = assets.filter((asset) => asset.status === "Assigned").length;
  const availableAssets = assets.filter((asset) => asset.status === "Available").length;
  const maintenanceAssets = assets.filter((asset) => asset.status === "Maintenance").length;
  const retiredAssets = assets.filter((asset) => asset.status === "Retired").length;

  const summaryValues = {
    "Total Assets": totalAssets,
    "Assigned Assets": assignedAssets,
    "Available Assets": availableAssets,
    "Under Maintenance": maintenanceAssets,
    "Retired Assets": retiredAssets,
  };

  const assetDistributionData = Array.from(
    assets.reduce((map, asset) => {
      map.set(asset.type, (map.get(asset.type) ?? 0) + 1);
      return map;
    }, new Map<string, number>()),
  )
    .map(([name, value], index) => ({
      name,
      value,
      color: chartPalette[index % chartPalette.length],
    }))
    .sort((first, second) => second.value - first.value);

  const assignmentActivityTrend = Array.from(
    [...assignmentHistory, ...assignments].reduce((map, assignment) => {
      const month = getMonthLabel(assignment.assignedDate);
      map.set(month, (map.get(month) ?? 0) + 1);
      return map;
    }, new Map<string, number>()),
  )
    .map(([label, value]) => ({ label, value }))
    .slice(-6);

  const maintenanceStatusOverview = [
    {
      label: "Open",
      value: [...maintenanceRecords, ...maintenanceHistory].filter(
        (item) => item.status === "Open",
      ).length,
      color: "#0f172a",
    },
    {
      label: "Awaiting Parts",
      value: [...maintenanceRecords, ...maintenanceHistory].filter(
        (item) => item.status === "Awaiting Parts",
      ).length,
      color: "#334155",
    },
    {
      label: "In Repair",
      value: [...maintenanceRecords, ...maintenanceHistory].filter(
        (item) => item.status === "In Repair",
      ).length,
      color: "#64748b",
    },
    {
      label: "Returned",
      value: [...maintenanceRecords, ...maintenanceHistory].filter(
        (item) => item.status === "Returned",
      ).length,
      color: "#94a3b8",
    },
    {
      label: "Escalated",
      value: [...maintenanceRecords, ...maintenanceHistory].filter(
        (item) => item.status === "Escalated",
      ).length,
      color: "#cbd5e1",
    },
  ];

  const recentAssignments = [...assignments]
    .sort(
      (first, second) =>
        new Date(second.assignedDate).getTime() - new Date(first.assignedDate).getTime(),
    )
    .slice(0, 5);

  const maintenanceAlerts = [...maintenanceRecords]
    .sort(
      (first, second) =>
        new Date(second.submittedDate).getTime() - new Date(first.submittedDate).getTime(),
    )
    .slice(0, 4);

  const expiringWarrantyItems = [...warrantyItems]
    .sort(
      (first, second) =>
        new Date(first.expiryDate).getTime() - new Date(second.expiryDate).getTime(),
    )
    .slice(0, 4);

  const recentRequests = [...serviceRequests]
    .sort(
      (first, second) =>
        new Date(second.submittedDate).getTime() - new Date(first.submittedDate).getTime(),
    )
    .slice(0, 4);

  return (
    <div className="page-stack">
      <div className="page-copy">
        <h2 className="page-title">
          Asset operations overview
        </h2>
        <p className="page-subtitle">
          Inventory, assignment activity, service workload, and request intake in one view.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {summaryCards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={String(summaryValues[card.title])}
            subtitle={card.subtitle}
            helperText={card.helperText}
            icon={card.icon}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <DonutChartCard
          title="Asset Distribution"
          subtitle="Current inventory split across major device categories"
          data={assetDistributionData}
          dataKey="value"
          nameKey="name"
          colorKey="color"
          centerLabel="Managed assets"
        />

        <TrendChartCard
          title="Assignment Activity Trend"
          subtitle="Recent monthly assignment movement across current records"
          data={assignmentActivityTrend}
          dataKey="value"
          xAxisKey="label"
          valueLabel="Assignments"
          strokeColor="#0f172a"
          fillColor="#cbd5e1"
        />

        <BarChartCard
          title="Maintenance Status Overview"
          subtitle="Current and recent repair volume by service state"
          data={maintenanceStatusOverview}
          dataKey="value"
          xAxisKey="label"
          colorKey="color"
          valueLabel="Records"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.95fr)]">
        <PageSection
          title="Recent Assignments"
          subtitle="Latest employee allocations and device issue activity"
        >
          <div className="table-scroll">
            <table className="table-base">
              <thead className="table-head">
                <tr>
                  <th className="table-head-cell">Asset Tag</th>
                  <th className="table-head-cell">Device</th>
                  <th className="table-head-cell">Assigned To</th>
                  <th className="table-head-cell">Department</th>
                  <th className="table-head-cell">Date</th>
                  <th className="table-head-cell">Status</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {recentAssignments.map((assignment) => (
                  <tr className="table-row" key={assignment.id}>
                    <td className="table-cell">
                      <Link className="interactive-cell" to={`/assets/${assignment.assetTag}`}>
                        {assignment.assetTag}
                      </Link>
                    </td>
                    <td className="table-cell">{assignment.device}</td>
                    <td className="table-cell">{assignment.employee}</td>
                    <td className="table-cell">{assignment.department}</td>
                    <td className="table-cell">{assignment.assignedDate}</td>
                    <td className="table-cell">
                      <StatusBadge value={assignment.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageSection>

        <PageSection
          title="Maintenance Alerts"
          subtitle="Devices needing repair attention or vendor follow-up"
        >
          <div className="space-y-3">
            {maintenanceAlerts.map((record) => (
              <div className="rounded-2xl border border-slate-200 px-4 py-4" key={record.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-900">{record.assetTag}</p>
                    <p className="mt-1 text-sm text-slate-600">{record.issue}</p>
                  </div>
                  <StatusBadge value={record.status} />
                </div>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm leading-6 text-slate-500">
                  <span>{record.vendor}</span>
                  <span>ETA {record.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </PageSection>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <PageSection
          title="Warranty Expiring Soon"
          subtitle="Assets approaching renewal or coverage review"
        >
          <div className="space-y-3">
            {expiringWarrantyItems.map((item: WarrantyItem) => (
              <div
                className="flex flex-col gap-2 rounded-2xl border border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                key={item.id}
              >
                <div>
                  <p className="font-medium text-slate-900">{item.assetTag}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.model}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.owner}</p>
                </div>
                <p className="text-sm font-medium text-slate-700">{item.expiryDate}</p>
              </div>
            ))}
          </div>
        </PageSection>

        <PageSection
          title="Recent Requests"
          subtitle="Latest employee requests across hardware and support workflows"
        >
          <div className="space-y-3">
            {recentRequests.map((request) => (
              <div className="rounded-2xl border border-slate-200 px-4 py-4" key={request.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-900">{request.requestId}</p>
                    <p className="mt-1 text-sm text-slate-600">{request.type}</p>
                    <p className="mt-1 text-sm text-slate-500">{request.employee}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge value={request.priority} />
                    <StatusBadge value={request.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PageSection>
      </div>
    </div>
  );
}
