import { useMemo, useState, type FormEvent } from "react";
import {
  BriefcaseBusiness,
  ChevronDown,
  Download,
  Handshake,
  Plus,
  Search,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { vendors } from "../data/mockData";
import { Modal } from "../components/ui/Modal";
import { PageSection } from "../components/ui/PageSection";
import { SelectInput, type SelectOption } from "../components/ui/SelectInput";
import { StatCard } from "../components/ui/StatCard";
import { StatusBadge } from "../components/ui/StatusBadge";
import { TextAreaInput } from "../components/ui/TextAreaInput";
import { TextInput } from "../components/ui/TextInput";
import { useToast } from "../hooks/useToast";
import type { ContractStatus, Vendor } from "../types";

interface VendorFormState {
  name: string;
  category: string;
  primaryContact: string;
  email: string;
  contractType: string;
  renewalDate: string;
  status: ContractStatus;
  notes: string;
}

const summaryCards = [
  {
    title: "Active Vendors",
    subtitle: "Approved external partners",
    helperText: "Includes suppliers, repair services, and warranty contacts",
    icon: BriefcaseBusiness,
  },
  {
    title: "Support Contracts",
    subtitle: "Currently in effect",
    helperText: "Covering repair, fulfillment, and device support",
    icon: Handshake,
  },
  {
    title: "Warranty Partners",
    subtitle: "Manufacturer-backed coverage",
    helperText: "Used for laptops, phones, and accessories",
    icon: ShieldCheck,
  },
  {
    title: "Renewals This Quarter",
    subtitle: "Contracts nearing review",
    helperText: "Requires procurement or operations follow-up",
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

export function VendorsPage() {
  const { pushToast } = useToast();
  const initialVendorForm: VendorFormState = {
    name: "",
    category: vendors[0]?.category ?? "",
    primaryContact: "",
    email: "",
    contractType: "",
    renewalDate: "",
    status: "Active",
    notes: "",
  };

  const [vendorItems, setVendorItems] = useState<Vendor[]>(vendors);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [selectedStatus, setSelectedStatus] = useState("All contract statuses");
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [vendorForm, setVendorForm] = useState<VendorFormState>(initialVendorForm);

  const summaryValues = {
    "Active Vendors": vendorItems.filter((item) =>
      ["Active", "Preferred"].includes(item.status),
    ).length,
    "Support Contracts": vendorItems.length,
    "Warranty Partners": vendorItems.filter((item) =>
      item.category.toLowerCase().includes("vendor") || item.contractType.toLowerCase().includes("warranty"),
    ).length,
    "Renewals This Quarter": vendorItems.filter((item) =>
      ["Renewal Due", "Expired", "Limited"].includes(item.status),
    ).length,
  };

  const categoryOptions = useMemo(
    () => ["All categories", ...new Set(vendorItems.map((vendor) => vendor.category))],
    [vendorItems],
  );
  const statusOptions = useMemo(
    () => ["All contract statuses", ...new Set(vendorItems.map((vendor) => vendor.status))],
    [vendorItems],
  );

  const vendorCategoryOptions = useMemo<SelectOption[]>(
    () =>
      [...new Set(vendorItems.map((vendor) => vendor.category))].map((category) => ({
        label: category,
        value: category,
      })),
    [vendorItems],
  );
  const contractStatusOptions = useMemo<SelectOption[]>(
    () =>
      ["Active", "Renewal Due", "Expired", "Preferred", "Limited"].map((status) => ({
        label: status,
        value: status,
      })),
    [],
  );

  const filteredVendors = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return vendorItems.filter((vendor) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [vendor.name, vendor.category, vendor.primaryContact, vendor.email]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);
      const matchesCategory =
        selectedCategory === "All categories" || vendor.category === selectedCategory;
      const matchesStatus =
        selectedStatus === "All contract statuses" || vendor.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [vendorItems, searchTerm, selectedCategory, selectedStatus]);

  const recentInteractions = filteredVendors.slice(0, 3).map((vendor, index) => ({
    id: vendor.id,
    date: `Apr ${11 - index}, 2026`,
    vendorName: vendor.name,
    summary: `${vendor.contractType} reviewed for ${vendor.category.toLowerCase()} coverage.`,
    owner: index === 0 ? "IT Operations" : index === 1 ? "Procurement" : "Support Lead",
  }));

  const hasActiveFilters =
    searchTerm.length > 0 ||
    selectedCategory !== "All categories" ||
    selectedStatus !== "All contract statuses";

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All categories");
    setSelectedStatus("All contract statuses");
  };

  const updateVendorForm = <K extends keyof VendorFormState>(
    key: K,
    value: VendorFormState[K],
  ) => {
    setVendorForm((current) => ({ ...current, [key]: value }));
  };

  const closeVendorModal = () => {
    setIsVendorModalOpen(false);
    setVendorForm(initialVendorForm);
  };

  const handleVendorSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requiredValues = [
      vendorForm.name,
      vendorForm.category,
      vendorForm.primaryContact,
      vendorForm.email,
      vendorForm.contractType,
      vendorForm.renewalDate,
      vendorForm.status,
    ];

    if (requiredValues.some((value) => value.trim().length === 0)) {
      pushToast({
        type: "error",
        title: "Vendor not added",
        message: "Complete all required vendor fields before saving.",
      });
      return;
    }

    const createdVendor: Vendor = {
      id: `vendor-${Date.now()}`,
      name: vendorForm.name,
      category: vendorForm.category,
      primaryContact: vendorForm.primaryContact,
      email: vendorForm.email,
      contractType: vendorForm.contractType,
      renewalDate: vendorForm.renewalDate,
      status: vendorForm.status,
    };

    setVendorItems((current) => [createdVendor, ...current]);
    pushToast({
      type: "success",
      title: "Vendor added",
      message: `${createdVendor.name} was added to the vendor directory.`,
    });
    closeVendorModal();
  };

  return (
    <>
      <div className="page-stack">
        <div className="page-header">
          <div className="page-copy">
            <h2 className="page-title">
              Vendors
            </h2>
            <p className="page-subtitle">
              Manage hardware suppliers, support partners, warranty contacts, and service contracts.
            </p>
          </div>

          <div className="page-actions">
            <button className="button-primary" onClick={() => setIsVendorModalOpen(true)} type="button">
              <Plus className="h-4 w-4" />
              <span>Add Vendor</span>
            </button>
            <button
              className="button-secondary"
              onClick={() =>
                pushToast({
                  type: "info",
                  title: "Vendor export preview",
                  message:
                    "Vendor exports can be connected to procurement reporting and contract review workflows in production.",
                })
              }
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
              value={String(summaryValues[card.title])}
              subtitle={card.subtitle}
              helperText={card.helperText}
              icon={card.icon}
            />
          ))}
        </div>

        <PageSection
          title="Vendor directory"
          subtitle="Current suppliers, support partners, and service agreements"
        >
          <div className="toolbar-row">
            <div className="toolbar-group">
              <label className="toolbar-search">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="toolbar-input"
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by vendor name, category, contact, or email"
                  type="text"
                  value={searchTerm}
                />
              </label>

              <ToolbarSelect
                ariaLabel="Filter vendors by category"
                onChange={setSelectedCategory}
                options={categoryOptions}
                value={selectedCategory}
              />

              <ToolbarSelect
                ariaLabel="Filter vendors by contract status"
                onChange={(value) => setSelectedStatus(value as ContractStatus | "All contract statuses")}
                options={statusOptions}
                value={selectedStatus}
              />
            </div>
          </div>

          <div className="section-meta">
            <p className="section-count">
              {filteredVendors.length} vendors in this view
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

          {filteredVendors.length === 0 ? (
            <div className="empty-state-card mt-6">
              <p className="text-base font-medium text-slate-900">No vendors matched these filters.</p>
              <p className="mt-2 text-sm text-slate-500">
                Try a broader search or clear the category and contract status filters.
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
                      <th className="table-head-cell">Vendor Name</th>
                      <th className="table-head-cell">Category</th>
                      <th className="table-head-cell">Primary Contact</th>
                      <th className="table-head-cell">Email</th>
                      <th className="table-head-cell">Contract Type</th>
                      <th className="table-head-cell">Renewal Date</th>
                      <th className="table-head-cell">Status</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {filteredVendors.map((vendor) => (
                      <tr
                        key={vendor.id}
                        className="transition-colors hover:bg-slate-50/80"
                      >
                        <td className="px-4 py-4">
                          <button
                            className="interactive-cell"
                            onClick={() =>
                              pushToast({
                                type: "info",
                                title: "Vendor profile preview",
                                message:
                                  "A dedicated vendor profile view can be connected here for contract history and escalation details.",
                              })
                            }
                            type="button"
                          >
                            {vendor.name}
                          </button>
                        </td>
                        <td className="px-4 py-4 text-slate-600">{vendor.category}</td>
                        <td className="px-4 py-4 text-slate-600">{vendor.primaryContact}</td>
                        <td className="px-4 py-4 text-slate-600">{vendor.email}</td>
                        <td className="px-4 py-4 text-slate-600">{vendor.contractType}</td>
                        <td className="px-4 py-4 text-slate-600">{vendor.renewalDate}</td>
                        <td className="px-4 py-4">
                          <StatusBadge value={vendor.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </PageSection>

        <PageSection
          title="Recent vendor interactions"
          subtitle="Latest contract, warranty, and service follow-ups"
        >
          <div className="grid gap-4 xl:grid-cols-3">
            {recentInteractions.length === 0 ? (
                <div className="empty-state-card xl:col-span-3">
                <p className="text-base font-medium text-slate-900">No recent interactions matched these filters.</p>
                <p className="mt-2 text-sm text-slate-500">
                  Reset the current filters to see the recent vendor follow-ups again.
                </p>
              </div>
            ) : (
              recentInteractions.map((item) => (
                <div
                  className="rounded-2xl border border-slate-200 px-4 py-4"
                  key={item.id}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                      <Handshake className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{item.vendorName}</p>
                      <p className="mt-1 text-sm text-slate-500">{item.date}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-600">{item.summary}</p>
                  <p className="mt-3 text-sm text-slate-500">Owner: {item.owner}</p>
                </div>
              ))
            )}
          </div>
        </PageSection>
      </div>

      <Modal
        open={isVendorModalOpen}
        onClose={closeVendorModal}
        size="lg"
        subtitle="Add a supplier, warranty contact, or support partner to the vendor directory."
        title="Add Vendor"
        footer={
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button className="button-secondary" onClick={closeVendorModal} type="button">
              Cancel
            </button>
            <button className="button-primary" form="add-vendor-form" type="submit">
              Save Vendor
            </button>
          </div>
        }
      >
        <form className="grid gap-5 md:grid-cols-2" id="add-vendor-form" onSubmit={handleVendorSubmit}>
          <TextInput
            label="Vendor name"
            onChange={(value) => updateVendorForm("name", value)}
            placeholder="NorthBridge IT Services"
            required
            value={vendorForm.name}
          />
          <SelectInput
            label="Category"
            onChange={(value) => updateVendorForm("category", value)}
            options={vendorCategoryOptions}
            required
            value={vendorForm.category}
          />
          <TextInput
            label="Primary contact"
            onChange={(value) => updateVendorForm("primaryContact", value)}
            placeholder="Nina Grant"
            required
            value={vendorForm.primaryContact}
          />
          <TextInput
            label="Email"
            onChange={(value) => updateVendorForm("email", value)}
            placeholder="nina.grant@northbridgeit.com"
            required
            type="email"
            value={vendorForm.email}
          />
          <TextInput
            label="Contract type"
            onChange={(value) => updateVendorForm("contractType", value)}
            placeholder="Enterprise repair support"
            required
            value={vendorForm.contractType}
          />
          <TextInput
            label="Renewal date"
            onChange={(value) => updateVendorForm("renewalDate", value)}
            required
            type="date"
            value={vendorForm.renewalDate}
          />
          <SelectInput
            className="md:col-span-2"
            label="Status"
            onChange={(value) => updateVendorForm("status", value as ContractStatus)}
            options={contractStatusOptions}
            required
            value={vendorForm.status}
          />
          <TextAreaInput
            className="md:col-span-2"
            helperText="Capture contract notes, escalation guidance, or procurement context."
            label="Notes"
            onChange={(value) => updateVendorForm("notes", value)}
            placeholder="Add internal notes for this vendor relationship."
            value={vendorForm.notes}
          />
        </form>
      </Modal>
    </>
  );
}
