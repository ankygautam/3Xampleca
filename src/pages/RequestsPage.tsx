import {
  ChevronDown,
  CircleHelp,
  Download,
  FileClock,
  Plus,
  Search,
} from "lucide-react";
import { PageSection } from "../components/ui/PageSection";
import { StatCard } from "../components/ui/StatCard";
import { StatusBadge } from "../components/ui/StatusBadge";

type RequestPriority = "High" | "Medium" | "Low";
type RequestStatus = "Open" | "In Review" | "Approved" | "Resolved" | "Rejected";

interface RequestRow {
  requestId: string;
  requestType: string;
  employee: string;
  department: string;
  submittedDate: string;
  priority: RequestPriority;
  status: RequestStatus;
}

interface RequestActivityRow {
  date: string;
  requestId: string;
  employee: string;
  action: string;
  processedBy: string;
}

const summaryCards = [
  {
    title: "Open Requests",
    value: "28",
    subtitle: "Awaiting action or triage",
    helperText: "Across hardware, software, and issue workflows",
    icon: FileClock,
  },
  {
    title: "In Review",
    value: "11",
    subtitle: "Pending approval or follow-up",
    helperText: "Currently with IT operations and team leads",
    icon: CircleHelp,
  },
  {
    title: "High Priority",
    value: "6",
    subtitle: "Needs fast resolution",
    helperText: "Includes productivity blockers and urgent replacements",
    icon: CircleHelp,
  },
  {
    title: "Resolved This Month",
    value: "34",
    subtitle: "Completed service requests",
    helperText: "Closed after fulfillment or issue resolution",
    icon: FileClock,
  },
] as const;

const requests: RequestRow[] = [
  {
    requestId: "REQ-1042",
    requestType: "Replacement laptop",
    employee: "Liam Brooks",
    department: "Operations",
    submittedDate: "Apr 11, 2026",
    priority: "High",
    status: "In Review",
  },
  {
    requestId: "REQ-1038",
    requestType: "New monitor",
    employee: "Anika Sharma",
    department: "Finance",
    submittedDate: "Apr 10, 2026",
    priority: "Medium",
    status: "Approved",
  },
  {
    requestId: "REQ-1033",
    requestType: "Accessory request",
    employee: "Sofia Martinez",
    department: "People",
    submittedDate: "Apr 9, 2026",
    priority: "Low",
    status: "Open",
  },
  {
    requestId: "REQ-1029",
    requestType: "Software access",
    employee: "Jordan Patel",
    department: "Legal",
    submittedDate: "Apr 8, 2026",
    priority: "Medium",
    status: "Resolved",
  },
  {
    requestId: "REQ-1025",
    requestType: "Device issue report",
    employee: "Mason Lee",
    department: "Operations",
    submittedDate: "Apr 7, 2026",
    priority: "High",
    status: "Rejected",
  },
];

const recentActivity: RequestActivityRow[] = [
  {
    date: "Apr 11, 2026",
    requestId: "REQ-1042",
    employee: "Liam Brooks",
    action: "Submitted replacement laptop request",
    processedBy: "Self Service Portal",
  },
  {
    date: "Apr 10, 2026",
    requestId: "REQ-1038",
    employee: "Anika Sharma",
    action: "Approved for procurement",
    processedBy: "N. Grant",
  },
  {
    date: "Apr 9, 2026",
    requestId: "REQ-1031",
    employee: "Noah Kim",
    action: "Escalated for manager review",
    processedBy: "J. Walters",
  },
  {
    date: "Apr 8, 2026",
    requestId: "REQ-1029",
    employee: "Jordan Patel",
    action: "Fulfilled software access request",
    processedBy: "D. Carver",
  },
  {
    date: "Apr 7, 2026",
    requestId: "REQ-1024",
    employee: "Ethan Walker",
    action: "Closed after issue verification",
    processedBy: "K. Ross",
  },
];

const pendingApprovals = [
  {
    requestId: "REQ-1042",
    owner: "Operations",
    note: "Replacement laptop requested after repeated battery failures.",
  },
  {
    requestId: "REQ-1036",
    owner: "Finance",
    note: "Dual-monitor setup requested for month-end reporting support.",
  },
  {
    requestId: "REQ-1031",
    owner: "Revenue",
    note: "Access request needs manager and security sign-off.",
  },
];

export function RequestsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            Requests
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Track employee hardware, software, and support requests from intake to resolution.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            type="button"
          >
            <Plus className="h-4 w-4" />
            <span>New Request</span>
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
        title="Requests queue"
        subtitle="Current service requests across hardware, software, and issue support"
      >
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row">
            <label className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:bg-white"
                placeholder="Search by request ID, employee, or request type"
                type="text"
              />
            </label>

            <button
              className="inline-flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50 md:min-w-[170px]"
              type="button"
            >
              <span>All request types</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>

            <button
              className="inline-flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50 md:min-w-[150px]"
              type="button"
            >
              <span>All priorities</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>

            <button
              className="inline-flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50 md:min-w-[150px]"
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
                  <th className="px-4 py-3.5 font-medium">Request ID</th>
                  <th className="px-4 py-3.5 font-medium">Request Type</th>
                  <th className="px-4 py-3.5 font-medium">Employee</th>
                  <th className="px-4 py-3.5 font-medium">Department</th>
                  <th className="px-4 py-3.5 font-medium">Submitted Date</th>
                  <th className="px-4 py-3.5 font-medium">Priority</th>
                  <th className="px-4 py-3.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {requests.map((request) => (
                  <tr
                    key={request.requestId}
                    className="transition-colors hover:bg-slate-50/80"
                  >
                    <td className="px-4 py-4">
                      <button
                        className="font-medium text-slate-900 transition hover:text-slate-700"
                        type="button"
                      >
                        {request.requestId}
                      </button>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{request.requestType}</td>
                    <td className="px-4 py-4">
                      <button
                        className="text-slate-700 transition hover:text-slate-900"
                        type="button"
                      >
                        {request.employee}
                      </button>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{request.department}</td>
                    <td className="px-4 py-4 text-slate-600">{request.submittedDate}</td>
                    <td className="px-4 py-4">
                      <StatusBadge value={request.priority} />
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge value={request.status} />
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
          title="Recent request activity"
          subtitle="Latest actions across intake, approval, and fulfillment workflows"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="text-left text-slate-500">
                <tr>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Request ID</th>
                  <th className="pb-3 font-medium">Employee</th>
                  <th className="pb-3 font-medium">Action</th>
                  <th className="pb-3 font-medium">Processed By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentActivity.map((entry) => (
                  <tr key={`${entry.date}-${entry.requestId}-${entry.action}`}>
                    <td className="py-4 text-slate-600">{entry.date}</td>
                    <td className="py-4 font-medium text-slate-900">{entry.requestId}</td>
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
          title="Pending approvals"
          subtitle="Requests that still need manager or IT review"
        >
          <div className="space-y-3">
            {pendingApprovals.map((item) => (
              <div
                className="rounded-xl border border-slate-200 px-4 py-4"
                key={item.requestId}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-900">{item.requestId}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.owner}</p>
                  </div>
                  <StatusBadge value="In Review" />
                </div>
                <p className="mt-2 text-sm text-slate-500">{item.note}</p>
              </div>
            ))}
          </div>
        </PageSection>
      </div>
    </div>
  );
}
