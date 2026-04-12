import type {
  AssetStatus,
  ContractStatus,
  EmployeeStatus,
  RepairStatus,
  RequestPriority,
  RequestStatus,
} from "../../types";
import { cn } from "../../lib/utils";

export type StatusBadgeValue =
  | AssetStatus
  | EmployeeStatus
  | RequestPriority
  | RequestStatus
  | RepairStatus
  | ContractStatus
  | "Active"
  | "Remote"
  | "New Hire"
  | "Assigned"
  | "Available"
  | "Maintenance"
  | "Retired"
  | "Open"
  | "In Review"
  | "Resolved"
  | "Due Soon"
  | "Overdue"
  | "Pending"
  | "In Repair"
  | "Scheduled"
  | "Escalated"
  | "High"
  | "Medium"
  | "Low"
  | "Returned";

const badgeStyles: Record<StatusBadgeValue, string> = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Remote: "bg-sky-50 text-sky-700 ring-sky-600/20",
  "New Hire": "bg-violet-50 text-violet-700 ring-violet-600/20",
  Assigned: "bg-blue-50 text-blue-700 ring-blue-600/20",
  Available: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Maintenance: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Retired: "bg-slate-100 text-slate-700 ring-slate-500/20",
  Open: "bg-blue-50 text-blue-700 ring-blue-600/20",
  "In Review": "bg-violet-50 text-violet-700 ring-violet-600/20",
  Resolved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  "Due Soon": "bg-amber-50 text-amber-700 ring-amber-600/20",
  Overdue: "bg-rose-50 text-rose-700 ring-rose-600/20",
  Pending: "bg-slate-100 text-slate-700 ring-slate-500/20",
  "In Repair": "bg-blue-50 text-blue-700 ring-blue-600/20",
  Scheduled: "bg-violet-50 text-violet-700 ring-violet-600/20",
  Escalated: "bg-rose-50 text-rose-700 ring-rose-600/20",
  High: "bg-rose-50 text-rose-700 ring-rose-600/20",
  Medium: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Low: "bg-slate-100 text-slate-700 ring-slate-500/20",
  "On Leave": "bg-amber-50 text-amber-700 ring-amber-600/20",
  Inactive: "bg-slate-100 text-slate-700 ring-slate-500/20",
  Approved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Closed: "bg-slate-100 text-slate-700 ring-slate-500/20",
  Queued: "bg-slate-100 text-slate-700 ring-slate-500/20",
  "In Progress": "bg-amber-50 text-amber-700 ring-amber-600/20",
  "Awaiting Parts": "bg-orange-50 text-orange-700 ring-orange-600/20",
  Completed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  "Renewal Pending": "bg-amber-50 text-amber-700 ring-amber-600/20",
  Expired: "bg-rose-50 text-rose-700 ring-rose-600/20",
  Returned: "bg-slate-100 text-slate-700 ring-slate-500/20",
};

interface StatusBadgeProps {
  value: StatusBadgeValue;
  className?: string;
}

export function StatusBadge({ value, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        badgeStyles[value],
        className,
      )}
    >
      {value}
    </span>
  );
}
