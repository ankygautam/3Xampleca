import {
  CalendarRange,
  ChevronDown,
  Download,
  LaptopMinimal,
  PackageSearch,
  ShieldAlert,
  Wrench,
} from "lucide-react";
import {
  assets,
  assignmentHistory,
  assignments,
  maintenanceHistory,
  maintenanceRecords,
  vendors,
  warrantyItems,
} from "../data/mockData";
import { BarChartCard } from "../components/charts/BarChartCard";
import { DonutChartCard } from "../components/charts/DonutChartCard";
import { TrendChartCard } from "../components/charts/TrendChartCard";
import { PageSection } from "../components/ui/PageSection";
import { StatCard } from "../components/ui/StatCard";
import { StatusBadge } from "../components/ui/StatusBadge";
import { useToast } from "../hooks/useToast";

const summaryIcons = {
  "Total Managed Assets": PackageSearch,
  "Assignment Rate": LaptopMinimal,
  "Open Repairs": Wrench,
  "Expiring Warranties": ShieldAlert,
} as const;

const chartPalette = ["#0f172a", "#334155", "#64748b", "#94a3b8", "#cbd5e1"];

const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });

function getMonthLabel(dateValue: string) {
  const parsed = new Date(dateValue);

  if (Number.isNaN(parsed.getTime())) {
    return dateValue;
  }

  return monthFormatter.format(parsed);
}

export function ReportsPage() {
  const { pushToast } = useToast();
  const allAssignmentRecords = [...assignmentHistory, ...assignments];
  const allMaintenanceRecords = [...maintenanceHistory, ...maintenanceRecords];

  const totalManagedAssets = assets.length;
  const assignmentRate = Math.round(
    (assets.filter((asset) => asset.status === "Assigned").length / Math.max(totalManagedAssets, 1)) *
      100,
  );
  const openRepairs = allMaintenanceRecords.filter((record) =>
    ["Open", "Awaiting Parts", "In Repair", "Escalated"].includes(record.status),
  ).length;
  const expiringWarrantyCount = warrantyItems.filter((item) => {
    const diff =
      new Date(item.expiryDate).getTime() - new Date("2026-04-12").getTime();
    return diff <= 1000 * 60 * 60 * 24 * 120;
  }).length;

  const summaryMetrics = [
    {
      id: "metric-assets",
      label: "Total Managed Assets",
      value: String(totalManagedAssets),
      subtitle: "Across active, spare, and retired inventory",
    },
    {
      id: "metric-assignment-rate",
      label: "Assignment Rate",
      value: `${assignmentRate}%`,
      subtitle: "Current share of devices issued to teams and employees",
    },
    {
      id: "metric-open-repairs",
      label: "Open Repairs",
      value: String(openRepairs),
      subtitle: "Current maintenance workload across active service records",
    },
    {
      id: "metric-warranty",
      label: "Expiring Warranties",
      value: String(expiringWarrantyCount),
      subtitle: "Assets approaching renewal review in the near term",
    },
  ];

  const assetCategoryDistribution = Array.from(
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

  const monthlyAssignmentTrend = Array.from(
    allAssignmentRecords.reduce((map, assignment) => {
      const month = getMonthLabel(assignment.assignedDate);
      map.set(month, (map.get(month) ?? 0) + 1);
      return map;
    }, new Map<string, number>()),
  )
    .map(([label, value]) => ({ label, value }))
    .slice(-6);

  const maintenanceVolumeByStatus = [
    {
      label: "Open",
      value: allMaintenanceRecords.filter((record) => record.status === "Open").length,
      color: "#0f172a",
    },
    {
      label: "Awaiting Parts",
      value: allMaintenanceRecords.filter((record) => record.status === "Awaiting Parts").length,
      color: "#334155",
    },
    {
      label: "In Repair",
      value: allMaintenanceRecords.filter((record) => record.status === "In Repair").length,
      color: "#64748b",
    },
    {
      label: "Returned",
      value: allMaintenanceRecords.filter((record) => record.status === "Returned").length,
      color: "#94a3b8",
    },
    {
      label: "Escalated",
      value: allMaintenanceRecords.filter((record) => record.status === "Escalated").length,
      color: "#cbd5e1",
    },
  ];

  const departmentDeviceAllocation = Array.from(
    assets.reduce((map, asset) => {
      map.set(asset.department, (map.get(asset.department) ?? 0) + 1);
      return map;
    }, new Map<string, number>()),
  )
    .map(([label, value], index) => ({
      label,
      value,
      color: chartPalette[index % chartPalette.length],
    }))
    .sort((first, second) => second.value - first.value);

  const mostAssignedCategory =
    assetCategoryDistribution[0]?.name ?? "No category available";
  const highestDeviceDepartment =
    departmentDeviceAllocation[0]?.label ?? "No department available";
  const topRepairVendor =
    Array.from(
      allMaintenanceRecords.reduce((map, record) => {
        map.set(record.vendor, (map.get(record.vendor) ?? 0) + 1);
        return map;
      }, new Map<string, number>()),
    ).sort((first, second) => second[1] - first[1])[0]?.[0] ?? vendors[0]?.name ?? "No vendor";
  const overdueRepairCount = allMaintenanceRecords.filter(
    (record) => record.status === "Escalated",
  ).length;

  const insights = [
    {
      label: "Most assigned asset category",
      value: mostAssignedCategory,
      note: "Largest inventory group across the current managed device base.",
    },
    {
      label: "Department with highest device count",
      value: highestDeviceDepartment,
      note: "Based on current inventory ownership and pooled device allocation.",
    },
    {
      label: "Vendor handling most repairs",
      value: topRepairVendor,
      note: "Primary support partner across recent maintenance history and active repair tickets.",
    },
    {
      label: "Overdue repairs or near-term warranty expirations",
      value: `${overdueRepairCount + expiringWarrantyCount}`,
      note: "Items needing close operational follow-up over the next planning cycle.",
    },
  ];

  const sortedWarrantyItems = [...warrantyItems].sort(
    (first, second) =>
      new Date(first.expiryDate).getTime() - new Date(second.expiryDate).getTime(),
  );

  return (
    <div className="page-stack">
      <div className="page-header">
        <div className="page-copy">
          <h2 className="page-title">
            Reports
          </h2>
          <p className="page-subtitle">
            Analyze asset distribution, assignment velocity, repair demand, and warranty risk.
          </p>
        </div>

        <div className="page-actions">
          <button
            className="button-primary"
            onClick={() =>
              pushToast({
                type: "info",
                title: "Report export preview",
                message:
                  "Report export is available as a prototype action and can be connected to PDF or spreadsheet output in production.",
              })
            }
            type="button"
          >
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
          <button
            className="button-secondary"
            onClick={() =>
              pushToast({
                type: "info",
                title: "Scheduling preview",
                message:
                  "Scheduled reporting can be connected to email delivery, webhook automation, or ops review cadences later.",
              })
            }
            type="button"
          >
            <CalendarRange className="h-4 w-4" />
            <span>Schedule Report</span>
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryMetrics.map((metric) => {
          const Icon =
            summaryIcons[metric.label as keyof typeof summaryIcons] ?? PackageSearch;

          return (
            <StatCard
              key={metric.id}
              title={metric.label}
              value={metric.value}
              subtitle={metric.subtitle}
              icon={Icon}
            />
          );
        })}
      </div>

      <PageSection
        title="Reporting Filters"
        subtitle="Adjust the reporting view by time range, team focus, asset class, and output format"
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <button
            className="button-secondary justify-between lg:min-w-[200px]"
            onClick={() =>
              pushToast({
                type: "info",
                title: "Reporting filter preview",
                message:
                  "Date range presets are represented in the portfolio build and can be connected to live filtering logic later.",
              })
            }
            type="button"
          >
            <span>Last 90 days</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          <button
            className="button-secondary justify-between lg:min-w-[190px]"
            onClick={() =>
              pushToast({
                type: "info",
                title: "Department filter preview",
                message:
                  "Department-focused reporting can be connected to saved reporting views in a production release.",
              })
            }
            type="button"
          >
            <span>All departments</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          <button
            className="button-secondary justify-between lg:min-w-[180px]"
            onClick={() =>
              pushToast({
                type: "info",
                title: "Asset class filter preview",
                message:
                  "Asset-type segmentation is ready for a live reporting filter once backend reporting is connected.",
              })
            }
            type="button"
          >
            <span>All asset types</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          <button
            className="button-secondary justify-between lg:min-w-[170px]"
            onClick={() =>
              pushToast({
                type: "info",
                title: "Export format preview",
                message:
                  "Multiple export formats can be attached here when report generation is connected.",
              })
            }
            type="button"
          >
            <span>PDF export</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </PageSection>

      <div className="grid gap-6 xl:grid-cols-2">
        <DonutChartCard
          title="Asset Category Distribution"
          subtitle="Current inventory split across core asset classes"
          data={assetCategoryDistribution}
          dataKey="value"
          nameKey="name"
          colorKey="color"
          centerLabel="Managed assets"
        />

        <TrendChartCard
          title="Monthly Assignment Trend"
          subtitle="Recent assignment volume across active inventory cycles"
          data={monthlyAssignmentTrend}
          dataKey="value"
          xAxisKey="label"
          valueLabel="Assignments"
          strokeColor="#0f172a"
          fillColor="#cbd5e1"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.95fr)]">
        <BarChartCard
          title="Maintenance Volume by Status"
          subtitle="Current and recent repair records grouped by service outcome"
          data={maintenanceVolumeByStatus}
          dataKey="value"
          xAxisKey="label"
          colorKey="color"
          valueLabel="Records"
        />

        <PageSection
          title="KPI Insights"
          subtitle="Operational highlights derived from the current reporting data"
        >
          <div className="space-y-4">
            {insights.map((item) => (
              <div
                className="rounded-2xl border border-slate-200 px-4 py-4"
                key={item.label}
              >
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-slate-600">{item.note}</p>
              </div>
            ))}
          </div>
        </PageSection>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.95fr)]">
        <BarChartCard
          title="Department Device Allocation"
          subtitle="Current device ownership and pooled stock allocation by department"
          data={departmentDeviceAllocation}
          dataKey="value"
          xAxisKey="label"
          colorKey="color"
          valueLabel="Devices"
        />

        <PageSection
          title="Warranty Outlook"
          subtitle="Assets approaching coverage expiration and renewal review"
        >
          <div className="space-y-3">
            {sortedWarrantyItems.map((item) => {
              const daysUntilExpiry = Math.ceil(
                (new Date(item.expiryDate).getTime() - new Date("2026-04-12").getTime()) /
                  (1000 * 60 * 60 * 24),
              );
              const badgeValue = daysUntilExpiry <= 45 ? "High" : "Medium";

              return (
                <div
                  className="rounded-2xl border border-slate-200 px-4 py-4"
                  key={item.id}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-slate-900">{item.assetTag}</p>
                      <p className="mt-1 text-sm text-slate-600">{item.model}</p>
                      <p className="mt-1 text-sm text-slate-500">{item.owner}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-sm font-medium text-slate-700">{item.expiryDate}</p>
                      <StatusBadge value={badgeValue} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </PageSection>
      </div>
    </div>
  );
}
