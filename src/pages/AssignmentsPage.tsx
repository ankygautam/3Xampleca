import {
  ChevronDown,
  ClipboardCheck,
  Download,
  PackageCheck,
  Search,
  Undo2,
  UserPlus,
} from "lucide-react";
import { PageSection } from "../components/ui/PageSection";
import { StatCard } from "../components/ui/StatCard";
import { StatusBadge } from "../components/ui/StatusBadge";

type AssignmentStatus = "Active" | "Due Soon" | "Overdue" | "Returned" | "Pending";

interface ActiveAssignmentRow {
  assetTag: string;
  device: string;
  assignedTo: string;
  department: string;
  assignedDate: string;
  expectedReturn: string;
  status: AssignmentStatus;
}

interface AssignmentHistoryRow {
  date: string;
  assetTag: string;
  employee: string;
  action: string;
  processedBy: string;
}

const summaryCards = [
  {
    title: "Active Assignments",
    value: "612",
    subtitle: "Devices currently in use",
    helperText: "Across employees and shared teams",
    icon: ClipboardCheck,
  },
  {
    title: "Pending Returns",
    value: "14",
    subtitle: "Awaiting device handoff",
    helperText: "Tracked through offboarding workflow",
    icon: Undo2,
  },
  {
    title: "Unassigned Assets",
    value: "214",
    subtitle: "Ready for deployment",
    helperText: "Available for onboarding and replacements",
    icon: PackageCheck,
  },
  {
    title: "This Month Returns",
    value: "27",
    subtitle: "Completed return activity",
    helperText: "Processed by IT operations",
    icon: UserPlus,
  },
] as const;

const activeAssignments: ActiveAssignmentRow[] = [
  {
    assetTag: "LTP-2048",
    device: "Dell Latitude 7440",
    assignedTo: "Anika Sharma",
    department: "Finance",
    assignedDate: "Feb 11, 2026",
    expectedReturn: "Dec 20, 2026",
    status: "Active",
  },
  {
    assetTag: "MON-3388",
    device: "Dell UltraSharp 32",
    assignedTo: "Jordan Patel",
    department: "Legal",
    assignedDate: "Mar 2, 2026",
    expectedReturn: "Apr 25, 2026",
    status: "Due Soon",
  },
  {
    assetTag: "PHN-1184",
    device: "Apple iPhone 15",
    assignedTo: "Mason Lee",
    department: "Operations",
    assignedDate: "Jan 19, 2026",
    expectedReturn: "Apr 6, 2026",
    status: "Overdue",
  },
  {
    assetTag: "PRF-2207",
    device: "Logitech MX Keys Combo",
    assignedTo: "Sofia Martinez",
    department: "People",
    assignedDate: "Mar 18, 2026",
    expectedReturn: "May 12, 2026",
    status: "Pending",
  },
];

const assignmentHistory: AssignmentHistoryRow[] = [
  {
    date: "Apr 11, 2026",
    assetTag: "LTP-2104",
    employee: "Noah Kim",
    action: "Replacement issued",
    processedBy: "D. Carver",
  },
  {
    date: "Apr 10, 2026",
    assetTag: "MON-3055",
    employee: "Jordan Patel",
    action: "Asset reassigned",
    processedBy: "M. O'Neil",
  },
  {
    date: "Apr 8, 2026",
    assetTag: "TAB-4403",
    employee: "Sofia Martinez",
    action: "Asset returned",
    processedBy: "D. Carver",
  },
  {
    date: "Apr 5, 2026",
    assetTag: "PHN-1011",
    employee: "Liam Brooks",
    action: "Asset assigned",
    processedBy: "K. Ross",
  },
];

const awaitingAssignment = [
  {
    assetTag: "LTP-2142",
    device: "Lenovo ThinkPad T14",
    note: "Reserved for revenue team onboarding",
  },
  {
    assetTag: "MON-3410",
    device: "LG UltraFine 27",
    note: "Pending desk setup in Toronto office",
  },
  {
    assetTag: "PHN-1210",
    device: "Apple iPhone 15",
    note: "Awaiting manager approval before issue",
  },
];

export function AssignmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            Assignments
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Track issued devices, upcoming returns, and assignment activity.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            type="button"
          >
            <UserPlus className="h-4 w-4" />
            <span>Assign Asset</span>
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            type="button"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
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
        title="Active assignments"
        subtitle="Current allocations and pending device returns"
      >
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row">
            <label className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:bg-white"
                placeholder="Search by asset tag, employee, or device"
                type="text"
              />
            </label>

            <button
              className="inline-flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50 md:min-w-[170px]"
              type="button"
            >
              <span>All departments</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>

            <button
              className="inline-flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50 md:min-w-[170px]"
              type="button"
            >
              <span>All asset types</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>

            <button
              className="inline-flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50 md:min-w-[160px]"
              type="button"
            >
              <span>All statuses</span>
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
                  <th className="px-4 py-3.5 font-medium">Assigned To</th>
                  <th className="px-4 py-3.5 font-medium">Department</th>
                  <th className="px-4 py-3.5 font-medium">Assigned Date</th>
                  <th className="px-4 py-3.5 font-medium">Expected Return</th>
                  <th className="px-4 py-3.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {activeAssignments.map((assignment) => (
                  <tr
                    key={`${assignment.assetTag}-${assignment.assignedTo}`}
                    className="transition-colors hover:bg-slate-50/80"
                  >
                    <td className="px-4 py-4">
                      <button
                        className="font-medium text-slate-900 transition hover:text-slate-700"
                        type="button"
                      >
                        {assignment.assetTag}
                      </button>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{assignment.device}</td>
                    <td className="px-4 py-4">
                      <button
                        className="text-slate-700 transition hover:text-slate-900"
                        type="button"
                      >
                        {assignment.assignedTo}
                      </button>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{assignment.department}</td>
                    <td className="px-4 py-4 text-slate-600">{assignment.assignedDate}</td>
                    <td className="px-4 py-4 text-slate-600">{assignment.expectedReturn}</td>
                    <td className="px-4 py-4">
                      <StatusBadge value={assignment.status} />
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
          title="Assignment history"
          subtitle="Recent allocation and return activity"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="text-left text-slate-500">
                <tr>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Asset Tag</th>
                  <th className="pb-3 font-medium">Employee</th>
                  <th className="pb-3 font-medium">Action</th>
                  <th className="pb-3 font-medium">Processed By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {assignmentHistory.map((entry) => (
                  <tr key={`${entry.date}-${entry.assetTag}-${entry.action}`}>
                    <td className="py-4 text-slate-600">{entry.date}</td>
                    <td className="py-4 font-medium text-slate-900">{entry.assetTag}</td>
                    <td className="py-4 text-slate-600">{entry.employee}</td>
                    <td className="py-4 text-slate-600">{entry.action}</td>
                    <td className="py-4 text-slate-600">{entry.processedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageSection>

        <PageSection
          title="Assets awaiting assignment"
          subtitle="Ready stock reserved for onboarding and replacements"
        >
          <div className="space-y-3">
            {awaitingAssignment.map((item) => (
              <div
                className="rounded-xl border border-slate-200 px-4 py-4"
                key={item.assetTag}
              >
                <p className="font-medium text-slate-900">{item.assetTag}</p>
                <p className="mt-1 text-sm text-slate-600">{item.device}</p>
                <p className="mt-2 text-sm text-slate-500">{item.note}</p>
              </div>
            ))}
          </div>
        </PageSection>
      </div>
    </div>
  );
}
