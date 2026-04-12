import {
  ChevronDown,
  Download,
  Search,
  TicketPlus,
  Truck,
  Wrench,
} from "lucide-react";
import { PageSection } from "../components/ui/PageSection";
import { StatCard } from "../components/ui/StatCard";
import { StatusBadge } from "../components/ui/StatusBadge";

type MaintenanceStatus =
  | "Open"
  | "Awaiting Parts"
  | "In Repair"
  | "Scheduled"
  | "Returned"
  | "Escalated";

interface MaintenanceQueueRow {
  assetTag: string;
  device: string;
  reportedIssue: string;
  vendor: string;
  submittedDate: string;
  eta: string;
  repairStatus: MaintenanceStatus;
}

interface RepairHistoryRow {
  date: string;
  assetTag: string;
  action: string;
  owner: string;
  outcome: string;
}

const summaryCards = [
  {
    title: "Open Repairs",
    value: "18",
    subtitle: "Currently active service cases",
    helperText: "Across internal and vendor queues",
    icon: Wrench,
  },
  {
    title: "Awaiting Parts",
    value: "6",
    subtitle: "Blocked on replacement components",
    helperText: "Vendor updates expected this week",
    icon: Truck,
  },
  {
    title: "In Vendor Service",
    value: "11",
    subtitle: "Devices outside internal stock",
    helperText: "Tracked by external repair partners",
    icon: Wrench,
  },
  {
    title: "Returned This Month",
    value: "23",
    subtitle: "Completed service and returned",
    helperText: "Ready for reassignment or stock use",
    icon: Truck,
  },
] as const;

const maintenanceQueue: MaintenanceQueueRow[] = [
  {
    assetTag: "LTP-1931",
    device: "Lenovo ThinkPad T14",
    reportedIssue: "Battery swelling and keyboard replacement",
    vendor: "NorthBridge IT Services",
    submittedDate: "Apr 10, 2026",
    eta: "Apr 18, 2026",
    repairStatus: "In Repair",
  },
  {
    assetTag: "MON-3388",
    device: "Dell UltraSharp 32",
    reportedIssue: "Backlight flicker during extended use",
    vendor: "ScreenWorks Supply",
    submittedDate: "Apr 9, 2026",
    eta: "Apr 16, 2026",
    repairStatus: "Awaiting Parts",
  },
  {
    assetTag: "PHN-0971",
    device: "Apple iPhone 15",
    reportedIssue: "Display unresponsive after system update",
    vendor: "MobileCare Support",
    submittedDate: "Apr 8, 2026",
    eta: "Apr 15, 2026",
    repairStatus: "Open",
  },
  {
    assetTag: "PRF-2207",
    device: "Logitech MX Keys Combo",
    reportedIssue: "Repeated Bluetooth disconnects",
    vendor: "Internal IT Support",
    submittedDate: "Apr 7, 2026",
    eta: "Apr 13, 2026",
    repairStatus: "Scheduled",
  },
  {
    assetTag: "LTP-2142",
    device: "Dell Latitude 7450",
    reportedIssue: "Motherboard instability after repair attempt",
    vendor: "NorthBridge IT Services",
    submittedDate: "Apr 6, 2026",
    eta: "Apr 20, 2026",
    repairStatus: "Escalated",
  },
];

const repairHistory: RepairHistoryRow[] = [
  {
    date: "Apr 11, 2026",
    assetTag: "LTP-1931",
    action: "Diagnostic completed",
    owner: "NorthBridge IT Services",
    outcome: "Keyboard assembly confirmed for replacement",
  },
  {
    date: "Apr 10, 2026",
    assetTag: "MON-3388",
    action: "Parts ordered",
    owner: "ScreenWorks Supply",
    outcome: "Replacement panel expected within three business days",
  },
  {
    date: "Apr 8, 2026",
    assetTag: "PHN-0912",
    action: "Returned to inventory",
    owner: "Internal IT Support",
    outcome: "Device tested and marked available",
  },
  {
    date: "Apr 5, 2026",
    assetTag: "LTP-1781",
    action: "Warranty claim approved",
    owner: "NorthBridge IT Services",
    outcome: "Mainboard service covered under vendor agreement",
  },
];

const vendorPerformance = [
  {
    vendor: "NorthBridge IT Services",
    turnaround: "4.2 days average",
    note: "Strong laptop repair completion rate this quarter",
  },
  {
    vendor: "ScreenWorks Supply",
    turnaround: "5.1 days average",
    note: "Parts availability improving for monitor replacements",
  },
  {
    vendor: "MobileCare Support",
    turnaround: "3.6 days average",
    note: "Fastest response on phone diagnostics and warranty claims",
  },
];

export function MaintenancePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            Maintenance
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Track repair intake, service progress, vendor handling, and return timing.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            type="button"
          >
            <TicketPlus className="h-4 w-4" />
            <span>Create Repair Ticket</span>
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            type="button"
          >
            <Download className="h-4 w-4" />
            <span>Export Log</span>
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            helperText={card.helperText}
            icon={card.icon}
          />
        ))}
      </div>

      <PageSection
        title="Maintenance queue"
        subtitle="Devices currently under review, repair, or vendor handling"
      >
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row">
            <label className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:bg-white"
                placeholder="Search by asset tag, device, or issue"
                type="text"
              />
            </label>

            <button
              className="inline-flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50 md:min-w-[170px]"
              type="button"
            >
              <span>All statuses</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>

            <button
              className="inline-flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50 md:min-w-[180px]"
              type="button"
            >
              <span>All vendors</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>

            <button
              className="inline-flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50 md:min-w-[170px]"
              type="button"
            >
              <span>All asset types</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-500">
                  <th className="px-4 py-3.5 font-medium">Asset Tag</th>
                  <th className="px-4 py-3.5 font-medium">Device</th>
                  <th className="px-4 py-3.5 font-medium">Reported Issue</th>
                  <th className="px-4 py-3.5 font-medium">Vendor</th>
                  <th className="px-4 py-3.5 font-medium">Submitted Date</th>
                  <th className="px-4 py-3.5 font-medium">ETA</th>
                  <th className="px-4 py-3.5 font-medium">Repair Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {maintenanceQueue.map((item) => (
                  <tr
                    key={`${item.assetTag}-${item.submittedDate}`}
                    className="transition-colors hover:bg-slate-50/80"
                  >
                    <td className="px-4 py-4">
                      <button
                        className="font-medium text-slate-900 transition hover:text-slate-700"
                        type="button"
                      >
                        {item.assetTag}
                      </button>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{item.device}</td>
                    <td className="px-4 py-4 text-slate-600">{item.reportedIssue}</td>
                    <td className="px-4 py-4 text-slate-600">{item.vendor}</td>
                    <td className="px-4 py-4 text-slate-600">{item.submittedDate}</td>
                    <td className="px-4 py-4 text-slate-600">{item.eta}</td>
                    <td className="px-4 py-4">
                      <StatusBadge value={item.repairStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PageSection>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)]">
        <PageSection
          title="Repair history"
          subtitle="Recent service events and completed maintenance actions"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="text-left text-slate-500">
                <tr>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Asset Tag</th>
                  <th className="pb-3 font-medium">Action</th>
                  <th className="pb-3 font-medium">Vendor / Technician</th>
                  <th className="pb-3 font-medium">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {repairHistory.map((entry) => (
                  <tr key={`${entry.date}-${entry.assetTag}-${entry.action}`}>
                    <td className="py-4 text-slate-600">{entry.date}</td>
                    <td className="py-4 font-medium text-slate-900">{entry.assetTag}</td>
                    <td className="py-4 text-slate-600">{entry.action}</td>
                    <td className="py-4 text-slate-600">{entry.owner}</td>
                    <td className="py-4 text-slate-600">{entry.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageSection>

        <PageSection
          title="Vendor performance summary"
          subtitle="Recent turnaround and service reliability observations"
        >
          <div className="space-y-3">
            {vendorPerformance.map((item) => (
              <div
                className="rounded-xl border border-slate-200 px-4 py-4"
                key={item.vendor}
              >
                <p className="font-medium text-slate-900">{item.vendor}</p>
                <p className="mt-1 text-sm text-slate-600">{item.turnaround}</p>
                <p className="mt-2 text-sm text-slate-500">{item.note}</p>
              </div>
            ))}
          </div>
        </PageSection>
      </div>
    </div>
  );
}
