import { useMemo, useState, type FormEvent } from "react";
import { ChevronDown, Download, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { assets, vendors } from "../data/mockData";
import { useToast } from "../hooks/useToast";
import { Modal } from "../components/ui/Modal";
import { PageSection } from "../components/ui/PageSection";
import { SelectInput, type SelectOption } from "../components/ui/SelectInput";
import { StatusBadge } from "../components/ui/StatusBadge";
import { TextAreaInput } from "../components/ui/TextAreaInput";
import { TextInput } from "../components/ui/TextInput";
import type { Asset, AssetStatus } from "../types";

type AssetSort = "Last Updated" | "Warranty Expiry";

interface AssetFormState {
  assetTag: string;
  type: string;
  brand: string;
  model: string;
  serialNumber: string;
  purchaseDate: string;
  vendor: string;
  location: string;
  status: AssetStatus;
  notes: string;
}

const initialAssetForm: AssetFormState = {
  assetTag: "",
  type: "Laptop",
  brand: "",
  model: "",
  serialNumber: "",
  purchaseDate: "",
  vendor: vendors[0]?.name ?? "",
  location: "Calgary",
  status: "Available",
  notes: "",
};

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
    <div className="relative md:min-w-[160px]">
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

function formatDisplayDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function deriveWarrantyExpiry(purchaseDate: string) {
  const date = new Date(purchaseDate);
  date.setFullYear(date.getFullYear() + 3);
  return formatDisplayDate(date);
}

export function AssetsPage() {
  const { pushToast } = useToast();
  const [assetItems, setAssetItems] = useState<Asset[]>(assets);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All types");
  const [selectedStatus, setSelectedStatus] = useState("All statuses");
  const [sortBy, setSortBy] = useState<AssetSort>("Last Updated");
  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);
  const [assetForm, setAssetForm] = useState<AssetFormState>(initialAssetForm);

  const typeOptions = useMemo(
    () => ["All types", ...new Set(assetItems.map((asset) => asset.type))],
    [assetItems],
  );
  const statusOptions = useMemo(
    () => ["All statuses", ...new Set(assetItems.map((asset) => asset.status))],
    [assetItems],
  );

  const assetTypeOptions = useMemo<SelectOption[]>(
    () =>
      [...new Set(assetItems.map((asset) => asset.type))].map((type) => ({
        label: type,
        value: type,
      })),
    [assetItems],
  );
  const vendorOptions = useMemo<SelectOption[]>(
    () =>
      [...new Set(vendors.map((vendor) => vendor.name))].map((vendor) => ({
        label: vendor,
        value: vendor,
      })),
    [],
  );
  const locationOptions = useMemo<SelectOption[]>(
    () =>
      [...new Set(assetItems.map((asset) => asset.location))].map((location) => ({
        label: location,
        value: location,
      })),
    [assetItems],
  );
  const assetStatusOptions = useMemo<SelectOption[]>(
    () =>
      [...new Set(assetItems.map((asset) => asset.status))].map((status) => ({
        label: status,
        value: status,
      })),
    [assetItems],
  );

  const filteredAssets = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return [...assetItems]
      .filter((asset) => {
        const matchesSearch =
          normalizedSearch.length === 0 ||
          [
            asset.assetTag,
            asset.brand,
            asset.model,
            asset.assignedTo ?? "",
            asset.department,
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedSearch);

        const matchesType =
          selectedType === "All types" || asset.type === selectedType;
        const matchesStatus =
          selectedStatus === "All statuses" || asset.status === selectedStatus;

        return matchesSearch && matchesType && matchesStatus;
      })
      .sort((first, second) => {
        if (sortBy === "Warranty Expiry") {
          return (
            new Date(first.warrantyExpiry).getTime() -
            new Date(second.warrantyExpiry).getTime()
          );
        }

        return (
          new Date(second.lastUpdated).getTime() -
          new Date(first.lastUpdated).getTime()
        );
      });
  }, [assetItems, searchTerm, selectedStatus, selectedType, sortBy]);

  const hasActiveFilters =
    searchTerm.length > 0 ||
    selectedType !== "All types" ||
    selectedStatus !== "All statuses" ||
    sortBy !== "Last Updated";

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("All types");
    setSelectedStatus("All statuses");
    setSortBy("Last Updated");
  };

  const updateAssetForm = <K extends keyof AssetFormState>(
    key: K,
    value: AssetFormState[K],
  ) => {
    setAssetForm((current) => ({ ...current, [key]: value }));
  };

  const closeAddAssetModal = () => {
    setIsAddAssetOpen(false);
    setAssetForm(initialAssetForm);
  };

  const handleAddAssetSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requiredValues = [
      assetForm.assetTag,
      assetForm.type,
      assetForm.brand,
      assetForm.model,
      assetForm.serialNumber,
      assetForm.purchaseDate,
      assetForm.vendor,
      assetForm.location,
      assetForm.status,
    ];

    if (requiredValues.some((value) => value.trim().length === 0)) {
      pushToast({
        type: "error",
        title: "Add asset failed",
        message: "Complete all required asset fields before saving.",
      });
      return;
    }

    const createdAsset: Asset = {
      id: `asset-${Date.now()}`,
      assetTag: assetForm.assetTag,
      type: assetForm.type,
      brand: assetForm.brand,
      model: assetForm.model,
      serialNumber: assetForm.serialNumber,
      assignedTo: assetForm.status === "Assigned" ? "Pending assignment" : undefined,
      department: assetForm.status === "Available" ? "IT Storage" : "IT Operations",
      status: assetForm.status,
      warrantyExpiry: deriveWarrantyExpiry(assetForm.purchaseDate),
      purchaseDate: formatDisplayDate(new Date(assetForm.purchaseDate)),
      location: assetForm.location,
      vendor: assetForm.vendor,
      lastUpdated: formatDisplayDate(new Date()),
    };

    setAssetItems((current) => [createdAsset, ...current]);
    pushToast({
      type: "success",
      title: "Asset created",
      message: `${createdAsset.assetTag} was added to the inventory.`,
    });
    closeAddAssetModal();
  };

  return (
    <>
      <div className="page-stack">
        <div className="page-header">
          <div className="page-copy">
            <h2 className="page-title">
              Asset inventory
            </h2>
            <p className="page-subtitle">
              Search, filter, and review the current inventory record set.
            </p>
          </div>

          <button
            className="button-primary"
            onClick={() => setIsAddAssetOpen(true)}
            type="button"
          >
            <Plus className="h-4 w-4" />
            <span>Add Asset</span>
          </button>
        </div>

        <PageSection title="Inventory table" description="Device and equipment records">
          <div className="toolbar-row">
            <div className="toolbar-group">
              <label className="toolbar-search">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="toolbar-input"
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search assets, tags, or assignees"
                  type="text"
                  value={searchTerm}
                />
              </label>

              <ToolbarSelect
                ariaLabel="Filter assets by type"
                onChange={setSelectedType}
                options={typeOptions}
                value={selectedType}
              />

              <ToolbarSelect
                ariaLabel="Filter assets by status"
                onChange={(value) => setSelectedStatus(value as AssetStatus | "All statuses")}
                options={statusOptions}
                value={selectedStatus}
              />

              <ToolbarSelect
                ariaLabel="Sort assets"
                onChange={(value) => setSortBy(value as AssetSort)}
                options={["Last Updated", "Warranty Expiry"]}
                value={sortBy}
              />
            </div>

            <button
              className="button-secondary"
              onClick={() =>
                pushToast({
                  type: "info",
                  title: "Export preview",
                  message:
                    "Inventory export is represented in this prototype and can be connected to CSV or PDF generation in production.",
                })
              }
              type="button"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>

          <div className="section-meta">
            <p className="section-count">
              {filteredAssets.length} assets in this view
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

          {filteredAssets.length === 0 ? (
            <div className="empty-state-card mt-6">
              <p className="text-base font-medium text-slate-900">No assets matched these filters.</p>
              <p className="mt-2 text-sm text-slate-500">
                Try a broader search or clear the current type and status filters.
              </p>
              <button
                className="button-secondary mt-5"
                onClick={resetFilters}
                type="button"
              >
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
                      <th className="table-head-cell">Type</th>
                      <th className="table-head-cell">Brand / Model</th>
                      <th className="table-head-cell">Assigned To</th>
                      <th className="table-head-cell">Department</th>
                      <th className="table-head-cell">Status</th>
                      <th className="table-head-cell">Warranty</th>
                      <th className="table-head-cell">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {filteredAssets.map((asset) => (
                      <tr key={asset.id} className="table-row">
                        <td className="table-cell">
                          <Link className="interactive-cell" to={`/assets/${asset.assetTag}`}>
                            {asset.assetTag}
                          </Link>
                        </td>
                        <td className="table-cell">{asset.type}</td>
                        <td className="table-cell">{`${asset.brand} ${asset.model}`}</td>
                        <td className="table-cell">{asset.assignedTo ?? "Unassigned"}</td>
                        <td className="table-cell">{asset.department}</td>
                        <td className="table-cell">
                          <StatusBadge value={asset.status} />
                        </td>
                        <td className="table-cell">{asset.warrantyExpiry}</td>
                        <td className="table-cell">{asset.lastUpdated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </PageSection>
      </div>

      <Modal
        open={isAddAssetOpen}
        onClose={closeAddAssetModal}
        size="lg"
        subtitle="Capture the essential inventory details for a new asset record."
        title="Add Asset"
        footer={
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button className="button-secondary" onClick={closeAddAssetModal} type="button">
              Cancel
            </button>
            <button
              className="button-primary"
              form="add-asset-form"
              type="submit"
            >
              Create Asset Record
            </button>
          </div>
        }
      >
        <form className="grid gap-5 md:grid-cols-2" id="add-asset-form" onSubmit={handleAddAssetSubmit}>
          <TextInput
            label="Asset tag"
            onChange={(value) => updateAssetForm("assetTag", value)}
            placeholder="AST-2408"
            required
            value={assetForm.assetTag}
          />
          <SelectInput
            label="Asset type"
            onChange={(value) => updateAssetForm("type", value)}
            options={assetTypeOptions}
            required
            value={assetForm.type}
          />
          <TextInput
            label="Brand"
            onChange={(value) => updateAssetForm("brand", value)}
            placeholder="Lenovo"
            required
            value={assetForm.brand}
          />
          <TextInput
            label="Model"
            onChange={(value) => updateAssetForm("model", value)}
            placeholder="ThinkPad T14 Gen 5"
            required
            value={assetForm.model}
          />
          <TextInput
            label="Serial number"
            onChange={(value) => updateAssetForm("serialNumber", value)}
            placeholder="LNV-T14-2408"
            required
            value={assetForm.serialNumber}
          />
          <TextInput
            label="Purchase date"
            onChange={(value) => updateAssetForm("purchaseDate", value)}
            required
            type="date"
            value={assetForm.purchaseDate}
          />
          <SelectInput
            label="Vendor"
            onChange={(value) => updateAssetForm("vendor", value)}
            options={vendorOptions}
            required
            value={assetForm.vendor}
          />
          <SelectInput
            label="Location"
            onChange={(value) => updateAssetForm("location", value)}
            options={locationOptions}
            required
            value={assetForm.location}
          />
          <SelectInput
            className="md:col-span-2"
            label="Status"
            onChange={(value) => updateAssetForm("status", value as AssetStatus)}
            options={assetStatusOptions}
            required
            value={assetForm.status}
          />
          <TextAreaInput
            className="md:col-span-2"
            helperText="Internal provisioning notes, warranty context, or storage details."
            label="Notes"
            onChange={(value) => updateAssetForm("notes", value)}
            placeholder="Add any intake or provisioning notes for this asset."
            value={assetForm.notes}
          />
        </form>
      </Modal>
    </>
  );
}
