import {
  Boxes,
  HardDrive,
  ShieldAlert,
  UserCheck,
  Wrench,
} from "lucide-react";
import { PageSection } from "../components/ui/PageSection";
import { StatCard } from "../components/ui/StatCard";
import { StatusBadge } from "../components/ui/StatusBadge";

interface AssignmentRow {
  assetTag: string;
  device: string;
  assignedTo: string;
  department: string;
  date: string;
  status: "Active" | "Returned";
}

interface MaintenanceAlert {
  assetTag: string;
  issue: string;
  vendor: string;
  repairStatus: "Queued" | "In Progress" | "Awaiting Parts";
  eta: string;
}

interface WarrantyItem {
  assetTag: string;
  model: string;
  assignedUser: string;
  warrantyExpiry: string;
}

interface RequestItem {
  type: string;
  requester: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In Review" | "Resolved";
}

const summaryCards = [
  {
    title: "Total Assets",
    value: "1,284",
    subtitle: "Tracked across all offices",
    helperText: "Includes active, spare, and retired inventory",
    icon: Boxes,
  },
  {
    title: "Assigned Assets",
    value: "1,006",
    subtitle: "Currently in use",
    helperText: "Issued to employees and shared teams",
    icon: UserCheck,
  },
  {
    title: "Available Assets",
    value: "214",
    subtitle: "Ready for deployment",
    helperText: "Provisioned stock in warehouse and regional cabinets",
    icon: HardDrive,
  },
  {
    title: "Under Maintenance",
    value: "48",
    subtitle: "Being repaired",
    helperText: "Vendor turnaround monitored weekly",
    icon: Wrench,
  },
  {
    title: "Retired Assets",
    value: "16",
    subtitle: "Archived this quarter",
    helperText: "Removed from active assignment pool",
    icon: ShieldAlert,
  },
] as const;

const recentAssignments: AssignmentRow[] = [
  {
    assetTag: "LTP-2048",
    device: "Dell Latitude 7440",
    assignedTo: "Anika Sharma",
    department: "Finance",
    date: "Apr 11, 2026",
    status: "Active",
  },
  {
    assetTag: "PHN-1184",
    device: "Apple iPhone 15",
    assignedTo: "Mason Lee",
    department: "Operations",
    date: "Apr 10, 2026",
    status: "Active",
  },
  {
    assetTag: "MON-3388",
    device: "Dell UltraSharp 32",
    assignedTo: "Jordan Patel",
    department: "Legal",
    date: "Apr 9, 2026",
    status: "Active",
  },
  {
    assetTag: "TAB-4403",
    device: "Surface Pro 10",
    assignedTo: "Sofia Martinez",
    department: "People",
    date: "Apr 8, 2026",
    status: "Returned",
  },
];

const maintenanceAlerts: MaintenanceAlert[] = [
  {
    assetTag: "LTP-1931",
    issue: "Battery swelling and keyboard replacement",
    vendor: "NorthBridge IT Services",
    repairStatus: "In Progress",
    eta: "Apr 18, 2026",
  },
  {
    assetTag: "DOC-7811",
    issue: "Print quality degradation",
    vendor: "ScreenWorks Supply",
    repairStatus: "Queued",
    eta: "Apr 16, 2026",
  },
  {
    assetTag: "PHN-0971",
    issue: "Display flicker after update",
    vendor: "MobileCare Support",
    repairStatus: "Awaiting Parts",
    eta: "Apr 22, 2026",
  },
];

const warrantyExpiringSoon: WarrantyItem[] = [
  {
    assetTag: "LTP-1931",
    model: "Lenovo ThinkPad T14",
    assignedUser: "IT Support Pool",
    warrantyExpiry: "Jun 18, 2026",
  },
  {
    assetTag: "PRF-2207",
    model: "Logitech MX Keys Combo",
    assignedUser: "Sofia Martinez",
    warrantyExpiry: "Aug 3, 2026",
  },
  {
    assetTag: "PHN-1184",
    model: "Apple iPhone 15",
    assignedUser: "Mason Lee",
    warrantyExpiry: "Nov 22, 2026",
  },
];

const recentRequests: RequestItem[] = [
  {
    type: "Replacement request",
    requester: "Anika Sharma",
    priority: "High",
    status: "In Review",
  },
  {
    type: "New device request",
    requester: "Jordan Patel",
    priority: "Medium",
    status: "Open",
  },
  {
    type: "Issue report",
    requester: "Mason Lee",
    priority: "Medium",
    status: "Resolved",
  },
  {
    type: "Accessory request",
    requester: "Sofia Martinez",
    priority: "Low",
    status: "Open",
  },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-950">
          Asset operations overview
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Summary of inventory status, assignments, repairs, and incoming requests.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
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

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <PageSection
          title="Recent Assignments"
          subtitle="Latest changes to asset ownership and issue status"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="text-left text-slate-500">
                <tr>
                  <th className="pb-3 font-medium">Asset Tag</th>
                  <th className="pb-3 font-medium">Device</th>
                  <th className="pb-3 font-medium">Assigned To</th>
                  <th className="pb-3 font-medium">Department</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentAssignments.map((assignment) => (
                  <tr key={`${assignment.assetTag}-${assignment.date}`}>
                    <td className="py-4 font-medium text-slate-900">{assignment.assetTag}</td>
                    <td className="py-4 text-slate-600">{assignment.device}</td>
                    <td className="py-4 text-slate-600">{assignment.assignedTo}</td>
                    <td className="py-4 text-slate-600">{assignment.department}</td>
                    <td className="py-4 text-slate-600">{assignment.date}</td>
                    <td className="py-4">
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
          subtitle="Devices currently in service or waiting for repair work"
        >
          <div className="space-y-3">
            {maintenanceAlerts.map((item) => (
              <div
                className="rounded-xl border border-slate-200 px-4 py-4"
                key={`${item.assetTag}-${item.issue}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-900">{item.assetTag}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.issue}</p>
                  </div>
                  <StatusBadge value={item.repairStatus} />
                </div>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                  <span>{item.vendor}</span>
                  <span>ETA {item.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </PageSection>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <PageSection
          title="Warranty Expiring Soon"
          subtitle="Assets requiring renewal review in the upcoming cycle"
        >
          <div className="space-y-3">
            {warrantyExpiringSoon.map((asset) => (
              <div
                className="flex flex-col gap-2 rounded-xl border border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                key={asset.assetTag}
              >
                <div>
                  <p className="font-medium text-slate-900">{asset.assetTag}</p>
                  <p className="mt-1 text-sm text-slate-600">{asset.model}</p>
                  <p className="mt-1 text-sm text-slate-500">{asset.assignedUser}</p>
                </div>
                <p className="text-sm font-medium text-slate-700">{asset.warrantyExpiry}</p>
              </div>
            ))}
          </div>
        </PageSection>

        <PageSection
          title="Recent Requests"
          subtitle="Current intake across replacement, issue, and accessory requests"
        >
          <div className="space-y-3">
            {recentRequests.map((request) => (
              <div
                className="rounded-xl border border-slate-200 px-4 py-4"
                key={`${request.type}-${request.requester}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-900">{request.type}</p>
                    <p className="mt-1 text-sm text-slate-500">{request.requester}</p>
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
