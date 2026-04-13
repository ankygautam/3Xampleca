import { useMemo, useState, type FormEvent } from "react";
import {
  ChevronDown,
  CircleHelp,
  Download,
  FileClock,
  Plus,
  Search,
} from "lucide-react";
import { employees, requestActivity, serviceRequests } from "../data/mockData";
import { Modal } from "../components/ui/Modal";
import { PageSection } from "../components/ui/PageSection";
import { SelectInput, type SelectOption } from "../components/ui/SelectInput";
import { StatCard } from "../components/ui/StatCard";
import { StatusBadge } from "../components/ui/StatusBadge";
import { TextAreaInput } from "../components/ui/TextAreaInput";
import { TextInput } from "../components/ui/TextInput";
import { useToast } from "../hooks/useToast";
import type { RequestPriority, RequestStatus, ServiceRequest } from "../types";

interface RequestFormState {
  type: string;
  employee: string;
  department: string;
  priority: RequestPriority;
  submittedDate: string;
  description: string;
}

interface RequestActivityRow {
  id: string;
  date: string;
  requestId: string;
  employee: string;
  action: string;
  processedBy: string;
}

const summaryCards = [
  {
    title: "Open Requests",
    subtitle: "Awaiting action or triage",
    helperText: "Across hardware, software, and issue workflows",
    icon: FileClock,
  },
  {
    title: "In Review",
    subtitle: "Pending approval or follow-up",
    helperText: "Currently with IT operations and team leads",
    icon: CircleHelp,
  },
  {
    title: "High Priority",
    subtitle: "Needs fast resolution",
    helperText: "Includes productivity blockers and urgent replacements",
    icon: CircleHelp,
  },
  {
    title: "Resolved This Month",
    subtitle: "Completed service requests",
    helperText: "Closed after fulfillment or issue resolution",
    icon: FileClock,
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
    <div className="relative md:min-w-[150px]">
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

export function RequestsPage() {
  const { pushToast } = useToast();
  const defaultEmployee = employees[0];
  const initialRequestForm: RequestFormState = {
    type: serviceRequests[0]?.type ?? "Replacement laptop",
    employee: defaultEmployee?.name ?? "",
    department: defaultEmployee?.department ?? "",
    priority: "Medium",
    submittedDate: "",
    description: "",
  };

  const [requestItems, setRequestItems] = useState<ServiceRequest[]>(serviceRequests);
  const [requestActivityItems, setRequestActivityItems] = useState<RequestActivityRow[]>(
    requestActivity.map((activity, index) => ({
      id: activity.id,
      date: activity.date,
      requestId: serviceRequests[index]?.requestId ?? `REQ-${1000 + index}`,
      employee: serviceRequests[index]?.employee ?? activity.actor,
      action: activity.title,
      processedBy: serviceRequests[index]?.processedBy ?? activity.actor,
    })),
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All request types");
  const [selectedPriority, setSelectedPriority] = useState("All priorities");
  const [selectedStatus, setSelectedStatus] = useState("All statuses");
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestForm, setRequestForm] = useState<RequestFormState>(initialRequestForm);

  const summaryValues = {
    "Open Requests": requestItems.filter((item) => item.status === "Open").length,
    "In Review": requestItems.filter((item) => item.status === "In Review").length,
    "High Priority": requestItems.filter((item) => item.priority === "High").length,
    "Resolved This Month": requestItems.filter((item) => item.status === "Resolved").length,
  };

  const typeOptions = useMemo(
    () => ["All request types", ...new Set(requestItems.map((item) => item.type))],
    [requestItems],
  );
  const priorityOptions = useMemo(
    () => ["All priorities", ...new Set(requestItems.map((item) => item.priority))],
    [requestItems],
  );
  const statusOptions = useMemo(
    () => ["All statuses", ...new Set(requestItems.map((item) => item.status))],
    [requestItems],
  );

  const requestTypeOptions = useMemo<SelectOption[]>(
    () =>
      [...new Set(requestItems.map((item) => item.type))].map((type) => ({
        label: type,
        value: type,
      })),
    [requestItems],
  );
  const employeeOptions = useMemo<SelectOption[]>(
    () =>
      employees.map((employee) => ({
        label: employee.name,
        value: employee.name,
      })),
    [],
  );
  const departmentOptions = useMemo<SelectOption[]>(
    () =>
      [...new Set(employees.map((employee) => employee.department))].map((department) => ({
        label: department,
        value: department,
      })),
    [],
  );
  const requestPriorityOptions = useMemo<SelectOption[]>(
    () =>
      ["Low", "Medium", "High"].map((priority) => ({
        label: priority,
        value: priority,
      })),
    [],
  );

  const filteredRequests = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return requestItems.filter((request) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [request.requestId, request.employee, request.department, request.type]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);
      const matchesType =
        selectedType === "All request types" || request.type === selectedType;
      const matchesPriority =
        selectedPriority === "All priorities" || request.priority === selectedPriority;
      const matchesStatus =
        selectedStatus === "All statuses" || request.status === selectedStatus;

      return matchesSearch && matchesType && matchesPriority && matchesStatus;
    });
  }, [requestItems, searchTerm, selectedPriority, selectedStatus, selectedType]);

  const visibleRequestIds = new Set(filteredRequests.map((request) => request.requestId));
  const filteredActivity = requestActivityItems.filter((entry) =>
    !searchTerm &&
    selectedType === "All request types" &&
    selectedPriority === "All priorities" &&
    selectedStatus === "All statuses"
      ? true
      : visibleRequestIds.has(entry.requestId),
  );

  const pendingApprovals = filteredRequests
    .filter((item) => item.status === "In Review")
    .slice(0, 3)
    .map((item) => ({
      requestId: item.requestId,
      owner: item.department,
      note: `${item.type} is waiting on review from ${item.processedBy}.`,
    }));

  const hasActiveFilters =
    searchTerm.length > 0 ||
    selectedType !== "All request types" ||
    selectedPriority !== "All priorities" ||
    selectedStatus !== "All statuses";

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("All request types");
    setSelectedPriority("All priorities");
    setSelectedStatus("All statuses");
  };

  const updateRequestForm = <K extends keyof RequestFormState>(
    key: K,
    value: RequestFormState[K],
  ) => {
    setRequestForm((current) => ({ ...current, [key]: value }));
  };

  const handleRequestEmployeeChange = (employeeName: string) => {
    const matchedEmployee = employees.find((employee) => employee.name === employeeName);

    setRequestForm((current) => ({
      ...current,
      employee: employeeName,
      department: matchedEmployee?.department ?? current.department,
    }));
  };

  const closeRequestModal = () => {
    setIsRequestModalOpen(false);
    setRequestForm(initialRequestForm);
  };

  const handleRequestSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requiredValues = [
      requestForm.type,
      requestForm.employee,
      requestForm.department,
      requestForm.priority,
      requestForm.submittedDate,
      requestForm.description,
    ];

    if (requiredValues.some((value) => value.trim().length === 0)) {
      pushToast({
        type: "error",
        title: "Request not submitted",
        message: "Complete all required request fields before submitting.",
      });
      return;
    }

    const nextRequestId = `REQ-${1000 + requestItems.length + 1}`;
    const createdRequest: ServiceRequest = {
      id: `req-${Date.now()}`,
      requestId: nextRequestId,
      type: requestForm.type,
      employee: requestForm.employee,
      department: requestForm.department,
      submittedDate: requestForm.submittedDate,
      priority: requestForm.priority,
      status: "Open",
      processedBy: "Self Service Portal",
    };

    setRequestItems((current) => [createdRequest, ...current]);
    setRequestActivityItems((current) => [
      {
        id: `reqact-${Date.now()}`,
        date: requestForm.submittedDate,
        requestId: createdRequest.requestId,
        employee: createdRequest.employee,
        action: "Submitted new request",
        processedBy: createdRequest.processedBy,
      },
      ...current,
    ]);
    pushToast({
      type: "success",
      title: "Request submitted",
      message: `${createdRequest.requestId} is now in the request queue.`,
    });
    closeRequestModal();
  };

  return (
    <>
      <div className="page-stack">
        <div className="page-header">
          <div className="page-copy">
            <h2 className="page-title">
              Requests
            </h2>
            <p className="page-subtitle">
              Track employee hardware, software, and support requests from intake to resolution.
            </p>
          </div>

          <div className="page-actions">
            <button className="button-primary" onClick={() => setIsRequestModalOpen(true)} type="button">
              <Plus className="h-4 w-4" />
              <span>New Request</span>
            </button>
            <button
              className="button-secondary"
              onClick={() =>
                pushToast({
                  type: "info",
                  title: "Request export preview",
                  message:
                    "Request exports can be connected to service reporting or approval audit logs in a production release.",
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
          title="Requests queue"
          subtitle="Current service requests across hardware, software, and issue support"
        >
          <div className="toolbar-row">
            <div className="toolbar-group">
              <label className="toolbar-search">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="toolbar-input"
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by request id, employee, department, or request type"
                  type="text"
                  value={searchTerm}
                />
              </label>

              <ToolbarSelect
                ariaLabel="Filter requests by type"
                onChange={setSelectedType}
                options={typeOptions}
                value={selectedType}
              />

              <ToolbarSelect
                ariaLabel="Filter requests by priority"
                onChange={(value) => setSelectedPriority(value as RequestPriority | "All priorities")}
                options={priorityOptions}
                value={selectedPriority}
              />

              <ToolbarSelect
                ariaLabel="Filter requests by status"
                onChange={(value) => setSelectedStatus(value as RequestStatus | "All statuses")}
                options={statusOptions}
                value={selectedStatus}
              />
            </div>
          </div>

          <div className="section-meta">
            <p className="section-count">
              {filteredRequests.length} requests in this view
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

          {filteredRequests.length === 0 ? (
            <div className="empty-state-card mt-6">
              <p className="text-base font-medium text-slate-900">No requests matched these filters.</p>
              <p className="mt-2 text-sm text-slate-500">
                Try a broader search or clear the request type, priority, and status filters.
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
                      <th className="table-head-cell">Request ID</th>
                      <th className="table-head-cell">Request Type</th>
                      <th className="table-head-cell">Employee</th>
                      <th className="table-head-cell">Department</th>
                      <th className="table-head-cell">Submitted Date</th>
                      <th className="table-head-cell">Priority</th>
                      <th className="table-head-cell">Status</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {filteredRequests.map((request) => (
                      <tr
                        key={request.id}
                        className="transition-colors hover:bg-slate-50/80"
                      >
                        <td className="px-4 py-4">
                          <button
                            className="interactive-cell"
                            onClick={() =>
                              pushToast({
                                type: "info",
                                title: "Request detail preview",
                                message:
                                  "A dedicated request detail route can be added to support approvals, comments, and audit history.",
                              })
                            }
                            type="button"
                          >
                            {request.requestId}
                          </button>
                        </td>
                        <td className="px-4 py-4 text-slate-600">{request.type}</td>
                        <td className="px-4 py-4">
                          <button
                            className="interactive-cell font-medium text-slate-700"
                            onClick={() =>
                              pushToast({
                                type: "info",
                                title: "Employee detail preview",
                                message:
                                  "Employee drill-down can be connected here to support request context and device history.",
                              })
                            }
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
          )}
        </PageSection>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)]">
          <PageSection
            title="Recent request activity"
            subtitle="Latest actions across intake, approval, and fulfillment workflows"
          >
            <div className="table-scroll">
              <table className="table-base">
                <thead className="table-head">
                  <tr>
                    <th className="table-head-cell">Date</th>
                    <th className="table-head-cell">Request ID</th>
                    <th className="table-head-cell">Employee</th>
                    <th className="table-head-cell">Action</th>
                    <th className="table-head-cell">Processed By</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {filteredActivity.map((entry) => (
                    <tr key={entry.id}>
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
              {pendingApprovals.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                  No approval items match the current request filters.
                </div>
              ) : (
                pendingApprovals.map((item) => (
                  <div
                    className="rounded-2xl border border-slate-200 px-4 py-4"
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
                ))
              )}
            </div>
          </PageSection>
        </div>
      </div>

      <Modal
        open={isRequestModalOpen}
        onClose={closeRequestModal}
        size="lg"
        subtitle="Capture the request details for hardware, software, or support intake."
        title="New Request"
        footer={
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button className="button-secondary" onClick={closeRequestModal} type="button">
              Cancel
            </button>
            <button className="button-primary" form="new-request-form" type="submit">
              Submit Request
            </button>
          </div>
        }
      >
        <form className="grid gap-5 md:grid-cols-2" id="new-request-form" onSubmit={handleRequestSubmit}>
          <SelectInput
            label="Request type"
            onChange={(value) => updateRequestForm("type", value)}
            options={requestTypeOptions}
            required
            value={requestForm.type}
          />
          <SelectInput
            label="Employee"
            onChange={handleRequestEmployeeChange}
            options={employeeOptions}
            required
            value={requestForm.employee}
          />
          <SelectInput
            label="Department"
            onChange={(value) => updateRequestForm("department", value)}
            options={departmentOptions}
            required
            value={requestForm.department}
          />
          <SelectInput
            label="Priority"
            onChange={(value) => updateRequestForm("priority", value as RequestPriority)}
            options={requestPriorityOptions}
            required
            value={requestForm.priority}
          />
          <TextInput
            className="md:col-span-2"
            label="Submitted date"
            onChange={(value) => updateRequestForm("submittedDate", value)}
            required
            type="date"
            value={requestForm.submittedDate}
          />
          <TextAreaInput
            className="md:col-span-2"
            helperText="Describe the request context, required hardware, or access issue."
            label="Description"
            onChange={(value) => updateRequestForm("description", value)}
            placeholder="Add a concise request summary and any supporting details."
            required
            rows={5}
            value={requestForm.description}
          />
        </form>
      </Modal>
    </>
  );
}
