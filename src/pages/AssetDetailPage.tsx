import {
  CalendarClock,
  CheckCircle2,
  CircleUserRound,
  Laptop,
  ShieldCheck,
  ShieldEllipsis,
  Wrench,
} from "lucide-react";
import { PageSection } from "../components/ui/PageSection";
import { StatusBadge } from "../components/ui/StatusBadge";

const assetProfile = {
  assetTag: "AST-1004",
  type: "Laptop",
  brandModel: "Lenovo ThinkPad T14",
  serialNumber: "LNV-T14-88A104",
  status: "Maintenance" as const,
  purchaseDate: "Sep 18, 2024",
  warrantyExpiry: "Sep 18, 2027",
  location: "Calgary Office",
  vendor: "NorthBridge IT Services",
};

const assignedEmployee = {
  name: "Liam Brooks",
  department: "Operations",
  location: "Calgary",
  email: "liam.brooks@company.com",
  assignedDate: "Feb 14, 2026",
  assignmentStatus: "Active" as const,
};

const maintenanceHistory = [
  {
    date: "Apr 10, 2026",
    issue: "Keyboard intermittently drops keystrokes",
    vendor: "NorthBridge IT Services",
    repairStatus: "In Progress" as const,
    resolution: "Replacement keyboard ordered and diagnostics underway",
  },
  {
    date: "Jan 22, 2026",
    issue: "Battery health below internal threshold",
    vendor: "NorthBridge IT Services",
    repairStatus: "Completed" as const,
    resolution: "Battery replaced and health validation completed",
  },
  {
    date: "Oct 30, 2025",
    issue: "USB-C dock disconnects after sleep",
    vendor: "Internal IT Support",
    repairStatus: "Completed" as const,
    resolution: "Firmware updated and docking profile reset",
  },
];

const notes = [
  "Battery replaced during January service cycle.",
  "Docking issue reported after repeated wake-from-sleep failures.",
  "Warranty claim remains available if keyboard assembly needs full replacement.",
  "Scheduled for refresh review next quarter if repair cycle extends further.",
];

const activityTimeline = [
  {
    title: "Asset created",
    detail: "Device record created in inventory",
    date: "Sep 18, 2024",
    icon: Laptop,
  },
  {
    title: "Assigned to employee",
    detail: "Issued to Liam Brooks for Operations onboarding",
    date: "Feb 14, 2026",
    icon: CircleUserRound,
  },
  {
    title: "Sent for repair",
    detail: "Keyboard issue escalated to vendor service",
    date: "Apr 10, 2026",
    icon: Wrench,
  },
  {
    title: "Warranty record updated",
    detail: "Service notes attached to active warranty profile",
    date: "Apr 11, 2026",
    icon: ShieldCheck,
  },
];

const complianceSummary = [
  { label: "Compliance", value: "Compliant" },
  { label: "Last check-in", value: "Apr 11, 2026 · 09:42" },
  { label: "Encryption", value: "BitLocker enabled" },
  { label: "OS version", value: "Windows 11 Enterprise 23H2" },
  { label: "Last audit", value: "Apr 5, 2026" },
];

function InfoPair({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 font-medium text-slate-900">{value}</p>
    </div>
  );
}

export function AssetDetailPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            {assetProfile.assetTag}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {assetProfile.type} · {assetProfile.brandModel}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            type="button"
          >
            Edit Asset
          </button>
          <button
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            type="button"
          >
            Assign / Reassign
          </button>
          <button
            className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            type="button"
          >
            Mark for Maintenance
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.85fr)]">
        <div className="space-y-6">
          <PageSection
            title="Asset overview"
            subtitle="Core inventory information and lifecycle data"
          >
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              <InfoPair label="Asset Tag" value={assetProfile.assetTag} />
              <InfoPair label="Type" value={assetProfile.type} />
              <InfoPair label="Brand / Model" value={assetProfile.brandModel} />
              <InfoPair label="Serial Number" value={assetProfile.serialNumber} />
              <div>
                <p className="text-sm text-slate-500">Status</p>
                <div className="mt-2">
                  <StatusBadge value={assetProfile.status} />
                </div>
              </div>
              <InfoPair label="Purchase Date" value={assetProfile.purchaseDate} />
              <InfoPair label="Warranty Expiry" value={assetProfile.warrantyExpiry} />
              <InfoPair label="Location" value={assetProfile.location} />
              <InfoPair label="Vendor" value={assetProfile.vendor} />
            </div>
          </PageSection>

          <PageSection
            title="Assigned employee"
            subtitle="Current ownership and assignment details"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-base font-semibold text-slate-700">
                LB
              </div>

              <div className="grid flex-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                <div className="sm:col-span-2 xl:col-span-3">
                  <p className="text-base font-semibold text-slate-950">
                    {assignedEmployee.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{assignedEmployee.email}</p>
                </div>
                <InfoPair label="Department" value={assignedEmployee.department} />
                <InfoPair label="Location" value={assignedEmployee.location} />
                <div>
                  <p className="text-sm text-slate-500">Assignment Status</p>
                  <div className="mt-2">
                    <StatusBadge value={assignedEmployee.assignmentStatus} />
                  </div>
                </div>
                <InfoPair label="Assigned Date" value={assignedEmployee.assignedDate} />
              </div>
            </div>
          </PageSection>

          <PageSection
            title="Maintenance history"
            subtitle="Service records, vendors, and repair outcomes"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="text-left text-slate-500">
                  <tr>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Issue</th>
                    <th className="pb-3 font-medium">Vendor</th>
                    <th className="pb-3 font-medium">Repair Status</th>
                    <th className="pb-3 font-medium">Resolution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {maintenanceHistory.map((item) => (
                    <tr key={`${item.date}-${item.issue}`}>
                      <td className="py-4 text-slate-600">{item.date}</td>
                      <td className="py-4 font-medium text-slate-900">{item.issue}</td>
                      <td className="py-4 text-slate-600">{item.vendor}</td>
                      <td className="py-4">
                        <StatusBadge value={item.repairStatus} />
                      </td>
                      <td className="py-4 text-slate-600">{item.resolution}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PageSection>

          <PageSection title="Notes" subtitle="Internal service and lifecycle notes">
            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                  key={note}
                >
                  <p className="text-sm text-slate-600">{note}</p>
                </div>
              ))}
            </div>
          </PageSection>
        </div>

        <div className="space-y-6">
          <PageSection title="Activity timeline" subtitle="Recent events for this device">
            <div className="space-y-4">
              {activityTimeline.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div className="relative flex gap-3" key={`${item.title}-${item.date}`}>
                    {index < activityTimeline.length - 1 ? (
                      <span className="absolute left-[19px] top-10 h-[calc(100%-1.5rem)] w-px bg-slate-200" />
                    ) : null}
                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="pb-4">
                      <p className="font-medium text-slate-900">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                      <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
                        {item.date}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </PageSection>

          <PageSection title="Security and compliance" subtitle="Current device posture summary">
            <div className="space-y-3">
              {complianceSummary.map((item, index) => (
                <div
                  className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3"
                  key={item.label}
                >
                  <div className="flex items-center gap-3">
                    {index === 0 ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : index === 1 ? (
                      <CalendarClock className="h-4 w-4 text-slate-500" />
                    ) : index === 2 ? (
                      <ShieldCheck className="h-4 w-4 text-slate-500" />
                    ) : (
                      <ShieldEllipsis className="h-4 w-4 text-slate-500" />
                    )}
                    <span className="text-sm text-slate-600">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          </PageSection>
        </div>
      </div>
    </div>
  );
}
