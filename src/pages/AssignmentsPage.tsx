import { useMemo, useState, type FormEvent } from "react";
import {
  ChevronDown,
  ClipboardCheck,
  Download,
  PackageCheck,
  Search,
  Undo2,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { assets, assignmentHistory, assignments, employees } from "../data/mockData";
import { Modal } from "../components/ui/Modal";
import { PageSection } from "../components/ui/PageSection";
import { SelectInput, type SelectOption } from "../components/ui/SelectInput";
import { StatCard } from "../components/ui/StatCard";
import { StatusBadge } from "../components/ui/StatusBadge";
import { TextAreaInput } from "../components/ui/TextAreaInput";
import { TextInput } from "../components/ui/TextInput";
import { useToast } from "../hooks/useToast";
import type { Assignment, AssignmentStatus } from "../types";

interface AssignmentFormState {
  assetTag: string;
  employee: string;
  department: string;
  assignedDate: string;
  expectedReturn: string;
  notes: string;
}

const summaryCards = [
  {
    title: "Active Assignments",
    subtitle: "Devices currently in use",
    helperText: "Across employees and shared teams",
    icon: ClipboardCheck,
  },
  {
    title: "Pending Returns",
    subtitle: "Awaiting device handoff",
    helperText: "Tracked through offboarding workflow",
    icon: Undo2,
  },
  {
    title: "Unassigned Assets",
    subtitle: "Ready for deployment",
    helperText: "Available for onboarding and replacements",
    icon: PackageCheck,
  },
  {
    title: "This Month Returns",
    subtitle: "Completed return activity",
    helperText: "Processed by IT operations",
    icon: UserPlus,
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

export function AssignmentsPage() {
  const { pushToast } = useToast();
  const defaultEmployee = employees[0];
  const initialAssignmentForm: AssignmentFormState = {
    assetTag: assets[0]?.assetTag ?? "",
    employee: defaultEmployee?.name ?? "",
    department: defaultEmployee?.department ?? "",
    assignedDate: "",
    expectedReturn: "",
    notes: "",
  };

  const [assignmentItems, setAssignmentItems] = useState<Assignment[]>(assignments);
  const [assignmentHistoryItems, setAssignmentHistoryItems] =
    useState<Assignment[]>(assignmentHistory);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All departments");
  const [selectedAssetType, setSelectedAssetType] = useState("All asset types");
  const [selectedStatus, setSelectedStatus] = useState("All statuses");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignmentForm, setAssignmentForm] =
    useState<AssignmentFormState>(initialAssignmentForm);

  const assetTypeByTag = useMemo(
    () => new Map(assets.map((asset) => [asset.assetTag, asset.type])),
    [],
  );

  const summaryValues = {
    "Active Assignments": assignmentItems.filter((item) => item.status === "Active").length,
    "Pending Returns": assignmentItems.filter((item) => item.status === "Pending").length,
    "Unassigned Assets": assets.filter((item) => item.status === "Available").length,
    "This Month Returns": assignmentHistoryItems.filter((item) => item.status === "Returned").length,
  };

  const departmentOptions = useMemo(
    () => ["All departments", ...new Set(assignmentItems.map((item) => item.department))],
    [assignmentItems],
  );
  const assetTypeOptions = useMemo(
    () => [
      "All asset types",
      ...new Set(assignmentItems.map((item) => assetTypeByTag.get(item.assetTag) ?? "Unknown")),
    ],
    [assignmentItems, assetTypeByTag],
  );
  const statusOptions = useMemo(
    () => ["All statuses", ...new Set(assignmentItems.map((item) => item.status))],
    [assignmentItems],
  );

  const assignmentAssetOptions = useMemo<SelectOption[]>(
    () =>
      assets.map((asset) => ({
        label: `${asset.assetTag} · ${asset.brand} ${asset.model}`,
        value: asset.assetTag,
      })),
    [],
  );
  const employeeOptions = useMemo<SelectOption[]>(
    () =>
      employees.map((employee) => ({
        label: employee.name,
        value: employee.name,
      })),
    [],
  );
  const formDepartmentOptions = useMemo<SelectOption[]>(
    () =>
      [...new Set(employees.map((employee) => employee.department))].map((department) => ({
        label: department,
        value: department,
      })),
    [],
  );

  const filteredAssignments = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return assignmentItems.filter((assignment) => {
      const assetType = assetTypeByTag.get(assignment.assetTag) ?? "Unknown";
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [assignment.assetTag, assignment.employee, assignment.device]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);
      const matchesDepartment =
        selectedDepartment === "All departments" ||
        assignment.department === selectedDepartment;
      const matchesStatus =
        selectedStatus === "All statuses" || assignment.status === selectedStatus;
      const matchesAssetType =
        selectedAssetType === "All asset types" || assetType === selectedAssetType;

      return matchesSearch && matchesDepartment && matchesStatus && matchesAssetType;
    });
  }, [assignmentItems, assetTypeByTag, searchTerm, selectedAssetType, selectedDepartment, selectedStatus]);

  const filteredHistory = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return assignmentHistoryItems.filter((entry) => {
      const assetType = assetTypeByTag.get(entry.assetTag) ?? "Unknown";
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [entry.assetTag, entry.employee, entry.device]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);
      const matchesDepartment =
        selectedDepartment === "All departments" ||
        entry.department === selectedDepartment;
      const matchesAssetType =
        selectedAssetType === "All asset types" || assetType === selectedAssetType;

      return matchesSearch && matchesDepartment && matchesAssetType;
    });
  }, [assignmentHistoryItems, assetTypeByTag, searchTerm, selectedAssetType, selectedDepartment]);

  const awaitingAssignment = useMemo(
    () =>
      assets
        .filter((asset) => {
          const matchesAssetType =
            selectedAssetType === "All asset types" || asset.type === selectedAssetType;
          const matchesSearch =
            searchTerm.trim().length === 0 ||
            [asset.assetTag, asset.brand, asset.model, asset.department]
              .join(" ")
              .toLowerCase()
              .includes(searchTerm.trim().toLowerCase());

          return asset.status === "Available" && matchesAssetType && matchesSearch;
        })
        .slice(0, 3)
        .map((asset) => ({
          assetTag: asset.assetTag,
          device: `${asset.brand} ${asset.model}`,
          note: `Available in ${asset.location} and ready for ${asset.department.toLowerCase()} deployment.`,
        })),
    [searchTerm, selectedAssetType],
  );

  const hasActiveFilters =
    searchTerm.length > 0 ||
    selectedDepartment !== "All departments" ||
    selectedAssetType !== "All asset types" ||
    selectedStatus !== "All statuses";

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedDepartment("All departments");
    setSelectedAssetType("All asset types");
    setSelectedStatus("All statuses");
  };

  const updateAssignmentForm = <K extends keyof AssignmentFormState>(
    key: K,
    value: AssignmentFormState[K],
  ) => {
    setAssignmentForm((current) => ({ ...current, [key]: value }));
  };

  const handleEmployeeChange = (employeeName: string) => {
    const matchedEmployee = employees.find((employee) => employee.name === employeeName);

    setAssignmentForm((current) => ({
      ...current,
      employee: employeeName,
      department: matchedEmployee?.department ?? current.department,
    }));
  };

  const closeAssignModal = () => {
    setIsAssignModalOpen(false);
    setAssignmentForm(initialAssignmentForm);
  };

  const handleAssignSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requiredValues = [
      assignmentForm.assetTag,
      assignmentForm.employee,
      assignmentForm.department,
      assignmentForm.assignedDate,
    ];

    if (requiredValues.some((value) => value.trim().length === 0)) {
      pushToast({
        type: "error",
        title: "Assignment not saved",
        message: "Complete all required assignment fields before continuing.",
      });
      return;
    }

    const selectedAsset = assets.find((asset) => asset.assetTag === assignmentForm.assetTag);
    const createdAssignment: Assignment = {
      id: `asn-${Date.now()}`,
      assetTag: assignmentForm.assetTag,
      device: selectedAsset
        ? `${selectedAsset.brand} ${selectedAsset.model}`
        : "Assigned device",
      employee: assignmentForm.employee,
      department: assignmentForm.department,
      assignedDate: assignmentForm.assignedDate,
      expectedReturn: assignmentForm.expectedReturn || undefined,
      status: "Active",
      processedBy: "Admin User",
    };

    setAssignmentItems((current) => [createdAssignment, ...current]);
    setAssignmentHistoryItems((current) => [createdAssignment, ...current]);
    pushToast({
      type: "success",
      title: "Asset assigned successfully",
      message: `${createdAssignment.assetTag} was assigned to ${createdAssignment.employee}.`,
    });
    closeAssignModal();
  };

  return (
    <>
      <div className="page-stack">
        <div className="page-header">
          <div className="page-copy">
            <h2 className="page-title">
              Assignments
            </h2>
            <p className="page-subtitle">
              Track issued devices, upcoming returns, and assignment activity.
            </p>
          </div>

          <div className="page-actions">
            <button className="button-primary" onClick={() => setIsAssignModalOpen(true)} type="button">
              <UserPlus className="h-4 w-4" />
              <span>Assign Asset</span>
            </button>
            <button
              className="button-secondary"
              onClick={() =>
                pushToast({
                  type: "info",
                  title: "Assignment export preview",
                  message:
                    "Export formatting is ready to connect to downstream reporting or audit workflows.",
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
          title="Active assignments"
          subtitle="Current allocations and pending device returns"
        >
          <div className="toolbar-row">
            <div className="toolbar-group">
              <label className="toolbar-search">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="toolbar-input"
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by asset tag, employee, or device"
                  type="text"
                  value={searchTerm}
                />
              </label>

              <ToolbarSelect
                ariaLabel="Filter assignments by department"
                onChange={setSelectedDepartment}
                options={departmentOptions}
                value={selectedDepartment}
              />

              <ToolbarSelect
                ariaLabel="Filter assignments by asset type"
                onChange={setSelectedAssetType}
                options={assetTypeOptions}
                value={selectedAssetType}
              />

              <ToolbarSelect
                ariaLabel="Filter assignments by status"
                onChange={(value) => setSelectedStatus(value as AssignmentStatus | "All statuses")}
                options={statusOptions}
                value={selectedStatus}
              />
            </div>
          </div>

          <div className="section-meta">
            <p className="section-count">
              {filteredAssignments.length} assignments in this view
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

          {filteredAssignments.length === 0 ? (
            <div className="empty-state-card mt-6">
              <p className="text-base font-medium text-slate-900">No assignments matched these filters.</p>
              <p className="mt-2 text-sm text-slate-500">
                Try a broader search or clear the department, asset type, and status filters.
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
                      <th className="table-head-cell">Assigned To</th>
                      <th className="table-head-cell">Department</th>
                      <th className="table-head-cell">Assigned Date</th>
                      <th className="table-head-cell">Expected Return</th>
                      <th className="table-head-cell">Status</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {filteredAssignments.map((assignment) => (
                      <tr className="table-row" key={assignment.id}>
                        <td className="table-cell">
                          <Link className="interactive-cell" to={`/assets/${assignment.assetTag}`}>
                            {assignment.assetTag}
                          </Link>
                        </td>
                        <td className="table-cell">{assignment.device}</td>
                        <td className="table-cell">
                          <button
                            className="interactive-cell font-medium text-slate-700"
                            onClick={() =>
                              pushToast({
                                type: "info",
                                title: "Employee detail preview",
                                message:
                                  "Employee profile drill-down can be connected to the directory in the next product iteration.",
                              })
                            }
                            type="button"
                          >
                            {assignment.employee}
                          </button>
                        </td>
                        <td className="table-cell">{assignment.department}</td>
                        <td className="table-cell">{assignment.assignedDate}</td>
                        <td className="table-cell">{assignment.expectedReturn ?? "Not set"}</td>
                        <td className="table-cell">
                          <StatusBadge value={assignment.status} />
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
            title="Assignment history"
            subtitle="Recent allocation and return activity"
          >
            <div className="table-scroll">
              <table className="table-base">
                <thead className="table-head">
                  <tr>
                    <th className="table-head-cell">Date</th>
                    <th className="table-head-cell">Asset Tag</th>
                    <th className="table-head-cell">Employee</th>
                    <th className="table-head-cell">Action</th>
                    <th className="table-head-cell">Processed By</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {filteredHistory.map((entry) => (
                    <tr className="table-row" key={entry.id}>
                      <td className="table-cell">{entry.assignedDate}</td>
                      <td className="table-cell">
                        <Link className="interactive-cell" to={`/assets/${entry.assetTag}`}>
                          {entry.assetTag}
                        </Link>
                      </td>
                      <td className="table-cell">{entry.employee}</td>
                      <td className="table-cell">
                        {entry.status === "Returned" ? "Asset returned" : "Asset assigned"}
                      </td>
                      <td className="table-cell">{entry.processedBy}</td>
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
              {awaitingAssignment.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                  No available assets match the current filters.
                </div>
              ) : (
                awaitingAssignment.map((item) => (
                  <div
                    className="rounded-2xl border border-slate-200 px-4 py-4"
                    key={item.assetTag}
                  >
                    <p className="font-medium text-slate-900">{item.assetTag}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.device}</p>
                    <p className="mt-2 text-sm text-slate-500">{item.note}</p>
                  </div>
                ))
              )}
            </div>
          </PageSection>
        </div>
      </div>

      <Modal
        open={isAssignModalOpen}
        onClose={closeAssignModal}
        size="lg"
        subtitle="Prepare a new allocation record for an employee or team."
        title="Assign Asset"
        footer={
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button className="button-secondary" onClick={closeAssignModal} type="button">
              Cancel
            </button>
            <button className="button-primary" form="assign-asset-form" type="submit">
              Save Assignment
            </button>
          </div>
        }
      >
        <form className="grid gap-5 md:grid-cols-2" id="assign-asset-form" onSubmit={handleAssignSubmit}>
          <SelectInput
            label="Asset"
            onChange={(value) => updateAssignmentForm("assetTag", value)}
            options={assignmentAssetOptions}
            required
            value={assignmentForm.assetTag}
          />
          <SelectInput
            label="Employee"
            onChange={handleEmployeeChange}
            options={employeeOptions}
            required
            value={assignmentForm.employee}
          />
          <SelectInput
            label="Department"
            onChange={(value) => updateAssignmentForm("department", value)}
            options={formDepartmentOptions}
            required
            value={assignmentForm.department}
          />
          <TextInput
            label="Assigned date"
            onChange={(value) => updateAssignmentForm("assignedDate", value)}
            required
            type="date"
            value={assignmentForm.assignedDate}
          />
          <TextInput
            helperText="Leave blank if the device is issued without a planned return date."
            label="Expected return"
            onChange={(value) => updateAssignmentForm("expectedReturn", value)}
            type="date"
            value={assignmentForm.expectedReturn}
          />
          <TextAreaInput
            className="md:col-span-2"
            helperText="Capture onboarding context, loaner notes, or approval details."
            label="Assignment notes"
            onChange={(value) => updateAssignmentForm("notes", value)}
            placeholder="Add assignment context for the receiving employee or team."
            value={assignmentForm.notes}
          />
        </form>
      </Modal>
    </>
  );
}
