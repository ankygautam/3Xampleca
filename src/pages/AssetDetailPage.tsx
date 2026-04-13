import {
  CalendarClock,
  CheckCircle2,
  CircleUserRound,
  Laptop,
  ShieldCheck,
  ShieldEllipsis,
  Wrench,
} from "lucide-react";
import { useParams } from "react-router-dom";
import {
  assets,
  assignments,
  employees,
  maintenanceHistory,
} from "../data/mockData";
import { useToast } from "../hooks/useToast";
import { PageSection } from "../components/ui/PageSection";
import { StatusBadge } from "../components/ui/StatusBadge";
import type { ActivityLog, Asset, Assignment } from "../types";

const complianceSummary = [
  { label: "Compliance", value: "Compliant" },
  { label: "Last check-in", value: "Apr 11, 2026 · 09:42" },
  { label: "Encryption", value: "BitLocker enabled" },
  { label: "OS version", value: "Windows 11 Enterprise 23H2" },
  { label: "Last audit", value: "Apr 5, 2026" },
] as const;

function InfoPair({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 font-medium text-slate-900">{value}</p>
    </div>
  );
}

export function AssetDetailPage() {
  const { pushToast } = useToast();
  const { id } = useParams();
  const asset = assets.find(
    (item) =>
      item.id.toLowerCase() === (id ?? "").toLowerCase() ||
      item.assetTag.toLowerCase() === (id ?? "").toLowerCase(),
  );

  if (!asset) {
    return (
      <div className="page-stack">
        <div className="page-copy">
          <h2 className="page-title">
            Asset not found
          </h2>
          <p className="page-subtitle">
            We couldn&apos;t find a matching asset record for this route.
          </p>
        </div>
        <PageSection
          title="Asset record unavailable"
          subtitle="Try opening the detail view from the Assets table or use a valid asset ID."
        >
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <p className="text-sm text-slate-600">
              No shared asset entry matched <span className="font-medium text-slate-900">{id}</span>.
            </p>
          </div>
        </PageSection>
      </div>
    );
  }

  const assignment = assignments.find((item) => item.assetTag === asset.assetTag);
  const employee = employees.find((item) => item.name === asset.assignedTo);
  const assetMaintenanceHistory = maintenanceHistory.filter(
    (item) => item.assetTag === asset.assetTag,
  );
  const notes = [
    `${asset.assetTag} is currently tracked under ${asset.department}.`,
    `Primary vendor on record is ${asset.vendor}.`,
    asset.status === "Maintenance"
      ? "This device is in a maintenance cycle and should not be reassigned yet."
      : "This device remains available for standard support and lifecycle review.",
    `Warranty coverage is listed until ${asset.warrantyExpiry}.`,
  ];
  const activityTimeline = buildActivityTimeline(asset, assignment);

  return (
    <div className="page-stack">
      <div className="page-header xl:items-start xl:justify-between">
        <div className="page-copy">
          <h2 className="page-title">
            {asset.assetTag}
          </h2>
          <p className="page-subtitle">
            {asset.type} · {asset.brand} {asset.model}
          </p>
        </div>

        <div className="page-actions">
          <button
            className="button-secondary"
            onClick={() =>
              pushToast({
                type: "info",
                title: "Edit flow preview",
                message:
                  "Asset editing is represented in the prototype and can be connected to persisted inventory records later.",
              })
            }
            type="button"
          >
            Edit Asset
          </button>
          <button
            className="button-secondary"
            onClick={() =>
              pushToast({
                type: "info",
                title: "Assignment flow preview",
                message:
                  "Reassignment is available as a planned workflow and can be connected to employee and return records in production.",
              })
            }
            type="button"
          >
            Assign / Reassign
          </button>
          <button
            className="button-primary"
            onClick={() =>
              pushToast({
                type: "info",
                title: "Maintenance action preview",
                message:
                  "Maintenance escalation is represented here for portfolio review and can be linked to live ticket creation later.",
              })
            }
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
              <InfoPair label="Asset Tag" value={asset.assetTag} />
              <InfoPair label="Type" value={asset.type} />
              <InfoPair label="Brand / Model" value={`${asset.brand} ${asset.model}`} />
              <InfoPair label="Serial Number" value={asset.serialNumber} />
              <div>
                <p className="text-sm text-slate-500">Status</p>
                <div className="mt-2">
                  <StatusBadge value={asset.status} />
                </div>
              </div>
              <InfoPair label="Purchase Date" value={asset.purchaseDate} />
              <InfoPair label="Warranty Expiry" value={asset.warrantyExpiry} />
              <InfoPair label="Location" value={asset.location} />
              <InfoPair label="Vendor" value={asset.vendor} />
            </div>
          </PageSection>

          <PageSection
            title="Assigned employee"
            subtitle="Current ownership and assignment details"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-base font-semibold text-slate-700">
                {getInitials(employee?.name ?? asset.assignedTo ?? "NA")}
              </div>

              <div className="grid flex-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                <div className="sm:col-span-2 xl:col-span-3">
                  <p className="text-base font-semibold text-slate-950">
                    {employee?.name ?? asset.assignedTo ?? "Unassigned"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {employee?.email ?? "No employee contact on record"}
                  </p>
                </div>
                <InfoPair label="Department" value={employee?.department ?? asset.department} />
                <InfoPair label="Location" value={employee?.location ?? asset.location} />
                <div>
                  <p className="text-sm text-slate-500">Assignment Status</p>
                  <div className="mt-2">
                    <StatusBadge value={assignment?.status ?? "Pending"} />
                  </div>
                </div>
                <InfoPair label="Assigned Date" value={assignment?.assignedDate ?? "Not assigned"} />
              </div>
            </div>
          </PageSection>

          <PageSection
            title="Maintenance history"
            subtitle="Service records, vendors, and repair outcomes"
          >
            <div className="table-scroll">
              <table className="table-base">
                <thead className="table-head">
                  <tr>
                    <th className="table-head-cell">Date</th>
                    <th className="table-head-cell">Issue</th>
                    <th className="table-head-cell">Vendor</th>
                    <th className="table-head-cell">Repair Status</th>
                    <th className="table-head-cell">Resolution</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {assetMaintenanceHistory.map((item) => (
                    <tr className="table-row" key={item.id}>
                      <td className="table-cell">{item.submittedDate}</td>
                      <td className="table-cell table-cell-primary">{item.issue}</td>
                      <td className="table-cell">{item.vendor}</td>
                      <td className="table-cell">
                        <StatusBadge value={item.status} />
                      </td>
                      <td className="table-cell">{item.outcome}</td>
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
                  <div className="relative flex gap-3" key={item.id}>
                    {index < activityTimeline.length - 1 ? (
                      <span className="absolute left-[19px] top-10 h-[calc(100%-1.5rem)] w-px bg-slate-200" />
                    ) : null}
                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="pb-4">
                      <p className="font-medium text-slate-900">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{item.description}</p>
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

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function buildActivityTimeline(asset: Asset, assignment?: Assignment) {
  const base: Array<ActivityLog & { icon: typeof Laptop | typeof CircleUserRound | typeof Wrench | typeof ShieldCheck }> = [
    {
      id: `${asset.id}-created`,
      date: asset.purchaseDate,
      title: "Asset created",
      description: "Device record created in inventory.",
      actor: "System",
      status: "Active",
      icon: Laptop,
    },
  ];

  if (assignment) {
    base.push({
      id: `${assignment.id}-assigned`,
      date: assignment.assignedDate,
      title: "Assigned to employee",
      description: `Issued to ${assignment.employee} for ${assignment.department}.`,
      actor: assignment.processedBy,
      status: assignment.status,
      icon: CircleUserRound,
    });
  }

  if (asset.status === "Maintenance") {
    base.push({
      id: `${asset.id}-repair`,
      date: asset.lastUpdated,
      title: "Sent for repair",
      description: `Service cycle is being handled by ${asset.vendor}.`,
      actor: "IT Operations",
      status: "In Repair",
      icon: Wrench,
    });
  }

  base.push({
    id: `${asset.id}-warranty`,
    date: asset.lastUpdated,
    title: "Warranty record updated",
    description: `Coverage remains active until ${asset.warrantyExpiry}.`,
    actor: "IT Operations",
    status: "Active",
    icon: ShieldCheck,
  });

  return base;
}
