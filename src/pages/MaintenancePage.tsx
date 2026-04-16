import { useMemo, useState, type FormEvent } from "react";
import {
  ChevronDown,
  Download,
  Search,
  TicketPlus,
  Truck,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import { assets, maintenanceHistory, maintenanceRecords, vendors } from "../data/mockData";
import { Modal } from "../components/ui/Modal";
import { PageSection } from "../components/ui/PageSection";
import { SelectInput, type SelectOption } from "../components/ui/SelectInput";
import { StatCard } from "../components/ui/StatCard";
import { StatusBadge } from "../components/ui/StatusBadge";
import { TextAreaInput } from "../components/ui/TextAreaInput";
import { TextInput } from "../components/ui/TextInput";
import { useToast } from "../hooks/useToast";
import type { MaintenanceRecord, RepairStatus } from "../types";

interface RepairTicketFormState {
  assetTag: string;
  issue: string;
  vendor: string;
  submittedDate: string;
  eta: string;
  status: RepairStatus;
  notes: string;
}

const summaryCards = [
  {
    title: "Open Repairs",
    subtitle: "Currently active service cases",
    helperText: "Across internal and vendor queues",
    icon: Wrench,
  },
  {
    title: "Awaiting Parts",
    subtitle: "Blocked on replacement components",
    helperText: "Vendor updates expected this week",
    icon: Truck,
  },
  {
    title: "In Vendor Service",
    subtitle: "Devices outside internal stock",
    helperText: "Tracked by external repair partners",
    icon: Wrench,
  },
  {
    title: "Returned This Month",
    subtitle: "Completed service and returned",
    helperText: "Ready for reassignment or stock use",
    icon: Truck,
  },
] as const;

function ToolbarSelect({
  value,
  onChange,
  options,
  ariaLabel,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  ariaLabel: string;
}) {
  return (
    <div className="relative md:min-w-[170px]">
      <select
        aria-label={ariaLabel}
        className="toolbar-select"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

export function MaintenancePage() {
  const { pushToast } = useToast();
  const initialRepairTicketForm: RepairTicketFormState = {
    assetTag: maintenanceRecords[0]?.assetTag ?? assets[0]?.assetTag ?? "",
    issue: "",
    vendor: maintenanceRecords[0]?.vendor ?? vendors[0]?.name ?? "",
    submittedDate: "",
    eta: "",
    status: "Open",
    notes: "",
  };

  const [maintenanceItems, setMaintenanceItems] =
    useState<MaintenanceRecord[]>(maintenanceRecords);
  const [maintenanceHistoryItems, setMaintenanceHistoryItems] =
    useState<MaintenanceRecord[]>(maintenanceHistory);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All statuses");
  const [selectedVendor, setSelectedVendor] = useState("All vendors");
  const [selectedAssetType, setSelectedAssetType] = useState("All asset types");
  const [isRepairTicketOpen, setIsRepairTicketOpen] = useState(false);
  const [repairTicketForm, setRepairTicketForm] =
    useState<RepairTicketFormState>(initialRepairTicketForm);

  const assetTypeByTag = useMemo(
    () => new Map(assets.map((asset) => [asset.assetTag, asset.type])),
    [],
  );

  const summaryValues = {
    "Open Repairs": maintenanceItems.filter((item) =>
      ["Open", "In Repair", "Awaiting Parts", "Escalated", "Scheduled"].includes(item.status),
    ).length,
    "Awaiting Parts": maintenanceItems.filter((item) => item.status === "Awaiting Parts").length,
    "In Vendor Service": maintenanceItems.filter((item) =>
      item.vendor !== "Internal IT Support",
    ).length,
    "Returned This Month": maintenanceHistoryItems.filter((item) => item.status === "Returned").length,
  };

  const statusOptions = useMemo(
    () => ["All statuses", ...new Set(maintenanceItems.map((item) => item.status))],
    [maintenanceItems],
  );
  const vendorOptions = useMemo(
    () => ["All vendors", ...new Set(maintenanceItems.map((item) => item.vendor))],
    [maintenanceItems],
  );
  const assetTypeOptions = useMemo(
    () => [
      "All asset types",
      ...new Set(
        maintenanceItems.map((item) => assetTypeByTag.get(item.assetTag) ?? "Unknown"),
      ),
    ],
    [assetTypeByTag, maintenanceItems],
  );

  const repairAssetOptions = useMemo<SelectOption[]>(
    () =>
      assets.map((asset) => ({
        label: `${asset.assetTag} · ${asset.brand} ${asset.model}`,
        value: asset.assetTag,
      })),
    [],
  );
  const repairVendorOptions = useMemo<SelectOption[]>(
    () =>
      vendors.map((vendor) => ({
        label: vendor.name,
        value: vendor.name,
      })),
    [],
  );
  const repairStatusOptions = useMemo<SelectOption[]>(
    () =>
      ["Open", "Scheduled", "In Repair", "Awaiting Parts", "Escalated"].map((status) => ({
        label: status,
        value: status,
      })),
    [],
  );

  const filteredRecords = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return maintenanceItems.filter((item) => {
      const assetType = assetTypeByTag.get(item.assetTag) ?? "Unknown";
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [item.assetTag, item.device, item.issue, item.vendor]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);
      const matchesStatus =
        selectedStatus === "All statuses" || item.status === selectedStatus;
      const matchesVendor =
        selectedVendor === "All vendors" || item.vendor === selectedVendor;
      const matchesAssetType =
        selectedAssetType === "All asset types" || assetType === selectedAssetType;

      return matchesSearch && matchesStatus && matchesVendor && matchesAssetType;
    });
  }, [assetTypeByTag, maintenanceItems, searchTerm, selectedAssetType, selectedStatus, selectedVendor]);

  const filteredHistory = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return maintenanceHistoryItems.filter((item) => {
      const assetType = assetTypeByTag.get(item.assetTag) ?? "Unknown";
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [item.assetTag, item.device, item.issue, item.vendor]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);
      const matchesVendor =
        selectedVendor === "All vendors" || item.vendor === selectedVendor;
      const matchesAssetType =
        selectedAssetType === "All asset types" || assetType === selectedAssetType;

      return matchesSearch && matchesVendor && matchesAssetType;
    });
  }, [assetTypeByTag, maintenanceHistoryItems, searchTerm, selectedAssetType, selectedVendor]);

  const vendorPerformance = vendors
    .filter(
      (vendor) =>
        selectedVendor === "All vendors" || vendor.name === selectedVendor,
    )
    .slice(0, 3)
    .map((vendor, index) => ({
      vendor: vendor.name,
      turnaround: `${(index + 4).toFixed(1)} days average`,
      note: `${vendor.category} coverage remains active for current service demand.`,
    }));

  const hasActiveFilters =
    searchTerm.length > 0 ||
    selectedStatus !== "All statuses" ||
    selectedVendor !== "All vendors" ||
    selectedAssetType !== "All asset types";

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedStatus("All statuses");
    setSelectedVendor("All vendors");
    setSelectedAssetType("All asset types");
  };

  const updateRepairTicketForm = <K extends keyof RepairTicketFormState>(
    key: K,
    value: RepairTicketFormState[K],
  ) => {
    setRepairTicketForm((current) => ({ ...current, [key]: value }));
  };

  const closeRepairTicketModal = () => {
    setIsRepairTicketOpen(false);
    setRepairTicketForm(initialRepairTicketForm);
  };

  const handleRepairTicketSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requiredValues = [
      repairTicketForm.assetTag,
      repairTicketForm.issue,
      repairTicketForm.vendor,
      repairTicketForm.submittedDate,
      repairTicketForm.eta,
      repairTicketForm.status,
    ];

    if (requiredValues.some((value) => value.trim().length === 0)) {
      pushToast({
        type: "error",
        title: "Repair ticket not created",
        message: "Complete all required repair fields before submitting.",
      });
      return;
    }

    const selectedAsset = assets.find((asset) => asset.assetTag === repairTicketForm.assetTag);
    const createdRecord: MaintenanceRecord = {
      id: `mnt-${Date.now()}`,
      assetTag: repairTicketForm.assetTag,
      device: selectedAsset
        ? `${selectedAsset.brand} ${selectedAsset.model}`
        : "Service device",
      issue: repairTicketForm.issue,
      vendor: repairTicketForm.vendor,
      submittedDate: repairTicketForm.submittedDate,
      eta: repairTicketForm.eta,
      status: repairTicketForm.status,
      outcome:
        repairTicketForm.notes.trim() || "Ticket created and awaiting service updates.",
    };

    setMaintenanceItems((current) => [createdRecord, ...current]);
    setMaintenanceHistoryItems((current) => [createdRecord, ...current]);
    pushToast({
      type: "success",
      title: "Repair ticket created",
      message: `${createdRecord.assetTag} was added to the maintenance queue.`,
    });
    closeRepairTicketModal();
  };

  return (
    <>
      <div className="page-stack">
        <div className="page-header">
          <div className="page-copy">
            <h2 className="page-title">
              Maintenance
            </h2>
            <p className="page-subtitle">
              Track repair intake, service progress, vendor handling, and return timing.
            </p>
          </div>

          <div className="page-actions">
            <button className="button-primary" onClick={() => setIsRepairTicketOpen(true)} type="button">
              <TicketPlus className="h-4 w-4" />
              <span>Create Repair Ticket</span>
            </button>
            <button
              className="button-secondary"
              onClick={() =>
                pushToast({
                  type: "info",
                  title: "Service log export preview",
                  message:
                    "Maintenance exports can be connected to vendor reporting and audit trails in a production integration.",
                })
              }
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
              value={String(summaryValues[card.title])}
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
          <div className="toolbar-row">
            <div className="toolbar-group">
              <label className="toolbar-search">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="toolbar-input"
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by asset tag, issue, vendor, or device"
                  type="text"
                  value={searchTerm}
                />
              </label>

              <ToolbarSelect
                ariaLabel="Filter maintenance records by status"
                onChange={(value) => setSelectedStatus(value as RepairStatus | "All statuses")}
                options={statusOptions}
                value={selectedStatus}
              />

              <ToolbarSelect
                ariaLabel="Filter maintenance records by vendor"
                onChange={setSelectedVendor}
                options={vendorOptions}
                value={selectedVendor}
              />

              <ToolbarSelect
                ariaLabel="Filter maintenance records by asset type"
                onChange={setSelectedAssetType}
                options={assetTypeOptions}
                value={selectedAssetType}
              />
            </div>
          </div>

          <div className="section-meta">
            <p className="section-count">
              {filteredRecords.length} repair records in this view
            </p>
            {hasActiveFilters ? (
              <button
                className="filter-reset"
                onClick={resetFilters}
                type="button"
              >
                Reset filters
              </button>
            ) : null}
          </div>

          {filteredRecords.length === 0 ? (
            <div className="empty-state-card mt-6">
              <p className="text-base font-medium text-slate-900">No maintenance records matched these filters.</p>
              <p className="mt-2 text-sm text-slate-500">
                Try a broader search or clear the status, vendor, and asset type filters.
              </p>
              <button className="button-secondary mt-5" onClick={resetFilters} type="button">
                Reset filters
              </button>
            </div>
          ) : (
            <div className="table-shell">
              <div className="table-scroll">
                <table className="table-base">
                  <thead className="table-head">
                    <tr>
                      <th className="table-head-cell">Asset Tag</th>
                      <th className="table-head-cell">Device</th>
                      <th className="table-head-cell">Reported Issue</th>
                      <th className="table-head-cell">Vendor</th>
                      <th className="table-head-cell">Submitted Date</th>
                      <th className="table-head-cell">ETA</th>
                      <th className="table-head-cell">Repair Status</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {filteredRecords.map((item) => (
                      <tr key={item.id} className="transition-colors hover:bg-slate-50/80">
                        <td className="px-4 py-4">
                          <Link className="interactive-cell" to={`/assets/${item.assetTag}`}>
                            {item.assetTag}
                          </Link>
                        </td>
                        <td className="px-4 py-4 text-slate-600">{item.device}</td>
                        <td className="px-4 py-4 text-slate-600">{item.issue}</td>
                        <td className="px-4 py-4 text-slate-600">{item.vendor}</td>
                        <td className="px-4 py-4 text-slate-600">{item.submittedDate}</td>
                        <td className="px-4 py-4 text-slate-600">{item.eta}</td>
                        <td className="px-4 py-4">
                          <StatusBadge value={item.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </PageSection>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)]">
          <PageSection
            title="Repair history"
            subtitle="Recent service events and completed maintenance actions"
          >
            <div className="table-scroll">
              <table className="table-base">
                <thead className="table-head">
                  <tr>
                    <th className="table-head-cell">Date</th>
                    <th className="table-head-cell">Asset Tag</th>
                    <th className="table-head-cell">Action</th>
                    <th className="table-head-cell">Vendor / Technician</th>
                    <th className="table-head-cell">Outcome</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {filteredHistory.map((entry) => (
                    <tr key={entry.id}>
                      <td className="py-4 text-slate-600">{entry.submittedDate}</td>
                      <td className="py-4 font-medium text-slate-900">{entry.assetTag}</td>
                      <td className="py-4 text-slate-600">{entry.issue}</td>
                      <td className="py-4 text-slate-600">{entry.vendor}</td>
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
              {vendorPerformance.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                  No vendor records match the current maintenance filters.
                </div>
              ) : (
                vendorPerformance.map((item) => (
                  <div
                    className="rounded-2xl border border-slate-200 px-4 py-4"
                    key={item.vendor}
                  >
                    <p className="font-medium text-slate-900">{item.vendor}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.turnaround}</p>
                    <p className="mt-2 text-sm text-slate-500">{item.note}</p>
                  </div>
                ))
              )}
            </div>
          </PageSection>
        </div>
      </div>

      <Modal
        open={isRepairTicketOpen}
        onClose={closeRepairTicketModal}
        size="lg"
        subtitle="Capture the initial service details for a repair or vendor handoff."
        title="Create Repair Ticket"
        footer={
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button className="button-secondary" onClick={closeRepairTicketModal} type="button">
              Cancel
            </button>
            <button className="button-primary" form="repair-ticket-form" type="submit">
              Create Ticket
            </button>
          </div>
        }
      >
        <form className="grid gap-5 md:grid-cols-2" id="repair-ticket-form" onSubmit={handleRepairTicketSubmit}>
          <SelectInput
            label="Asset"
            onChange={(value) => updateRepairTicketForm("assetTag", value)}
            options={repairAssetOptions}
            required
            value={repairTicketForm.assetTag}
          />
          <SelectInput
            label="Vendor"
            onChange={(value) => updateRepairTicketForm("vendor", value)}
            options={repairVendorOptions}
            required
            value={repairTicketForm.vendor}
          />
          <TextInput
            className="md:col-span-2"
            label="Issue summary"
            onChange={(value) => updateRepairTicketForm("issue", value)}
            placeholder="Describe the reported issue or service concern"
            required
            value={repairTicketForm.issue}
          />
          <TextInput
            label="Submitted date"
            onChange={(value) => updateRepairTicketForm("submittedDate", value)}
            required
            type="date"
            value={repairTicketForm.submittedDate}
          />
          <TextInput
            label="ETA"
            onChange={(value) => updateRepairTicketForm("eta", value)}
            required
            type="date"
            value={repairTicketForm.eta}
          />
          <SelectInput
            className="md:col-span-2"
            label="Repair status"
            onChange={(value) => updateRepairTicketForm("status", value as RepairStatus)}
            options={repairStatusOptions}
            required
            value={repairTicketForm.status}
          />
          <TextAreaInput
            className="md:col-span-2"
            helperText="Include triage details, parts context, or instructions for the vendor."
            label="Notes"
            onChange={(value) => updateRepairTicketForm("notes", value)}
            placeholder="Add any additional repair notes or technician context."
            value={repairTicketForm.notes}
          />
        </form>
      </Modal>
    </>
  );
}
