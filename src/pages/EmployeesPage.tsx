import { useMemo, useState } from "react";
import {
  ChevronDown,
  LaptopMinimal,
  Plus,
  Search,
  UserRoundPlus,
  Users,
  Workflow,
} from "lucide-react";
import { assignments, employees } from "../data/mockData";
import { useToast } from "../hooks/useToast";
import { PageSection } from "../components/ui/PageSection";
import { StatCard } from "../components/ui/StatCard";
import { StatusBadge } from "../components/ui/StatusBadge";
import type { Employee, EmployeeStatus } from "../types";

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

const summaryCards = [
  {
    title: "Total Employees",
    subtitle: "Tracked in asset directory",
    helperText: "Across all supported offices",
    icon: Users,
  },
  {
    title: "Active Assignments",
    subtitle: "Devices currently in use",
    helperText: "Includes laptops, phones, and accessories",
    icon: Workflow,
  },
  {
    title: "Remote Staff",
    subtitle: "Working outside office locations",
    helperText: "Priority for shipping and swap logistics",
    icon: LaptopMinimal,
  },
  {
    title: "New Hires This Month",
    subtitle: "Pending onboarding readiness",
    helperText: "Provisioning tracked by IT operations",
    icon: UserRoundPlus,
  },
] as const;

export function EmployeesPage() {
  const { pushToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All departments");
  const [selectedStatus, setSelectedStatus] = useState("All statuses");

  const summaryValues = {
    "Total Employees": employees.length,
    "Active Assignments": assignments.filter((item) => item.status === "Active").length,
    "Remote Staff": employees.filter((item) => item.status === "Remote").length,
    "New Hires This Month": employees.filter((item) => item.status === "New Hire").length,
  };

  const departmentOptions = useMemo(
    () => ["All departments", ...new Set(employees.map((employee) => employee.department))],
    [],
  );
  const statusOptions = useMemo(
    () => ["All statuses", ...new Set(employees.map((employee) => employee.status))],
    [],
  );

  const filteredEmployees = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return employees.filter((employee) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [employee.name, employee.email, employee.department, employee.location]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesDepartment =
        selectedDepartment === "All departments" ||
        employee.department === selectedDepartment;
      const matchesStatus =
        selectedStatus === "All statuses" || employee.status === selectedStatus;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [searchTerm, selectedDepartment, selectedStatus]);

  const departmentDistribution = Array.from(
    filteredEmployees.reduce((map, employee) => {
      const current = map.get(employee.department) ?? { employees: 0, devices: 0 };
      map.set(employee.department, {
        employees: current.employees + 1,
        devices: current.devices + employee.assignedDevices,
      });
      return map;
    }, new Map<string, { employees: number; devices: number }>()),
  ).map(([department, stats]) => ({
    department,
    employees: `${stats.employees} employees`,
    devices: `${stats.devices} devices`,
  }));

  const hasActiveFilters =
    searchTerm.length > 0 ||
    selectedDepartment !== "All departments" ||
    selectedStatus !== "All statuses";

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedDepartment("All departments");
    setSelectedStatus("All statuses");
  };

  return (
    <div className="page-stack">
      <div className="page-header">
        <div className="page-copy">
          <h2 className="page-title">
            Employee directory
          </h2>
          <p className="page-subtitle">
            Manage staff records, device ownership, and support coverage by team.
          </p>
        </div>

        <button
          className="button-primary"
          onClick={() =>
            pushToast({
              type: "info",
              title: "Employee creation preview",
              message:
                "Employee onboarding and directory sync can be connected to HRIS or identity systems in the production version.",
            })
          }
          type="button"
        >
          <Plus className="h-4 w-4" />
          <span>Add Employee</span>
        </button>
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
        title="Directory"
        subtitle="Current employee records and assigned device visibility"
      >
        <div className="toolbar-row">
          <div className="toolbar-group">
            <label className="toolbar-search">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                className="toolbar-input"
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by employee name, email, department, or location"
                type="text"
                value={searchTerm}
              />
            </label>

            <ToolbarSelect
              ariaLabel="Filter employees by department"
              onChange={setSelectedDepartment}
              options={departmentOptions}
              value={selectedDepartment}
            />

            <ToolbarSelect
              ariaLabel="Filter employees by status"
              onChange={(value) => setSelectedStatus(value as EmployeeStatus | "All statuses")}
              options={statusOptions}
              value={selectedStatus}
            />
          </div>
        </div>

        <div className="section-meta">
          <p className="section-count">
            {filteredEmployees.length} employees in this view
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

        {filteredEmployees.length === 0 ? (
          <div className="empty-state-card mt-6">
            <p className="text-base font-medium text-slate-900">No employees matched these filters.</p>
            <p className="mt-2 text-sm text-slate-500">
              Try a broader search or clear the department and status filters.
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
                    <th className="table-head-cell">Employee Name</th>
                    <th className="table-head-cell">Department</th>
                    <th className="table-head-cell">Location</th>
                    <th className="table-head-cell">Email</th>
                    <th className="table-head-cell">Assigned Devices</th>
                    <th className="table-head-cell">Status</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {filteredEmployees.map((employee: Employee) => (
                    <tr key={employee.id} className="table-row">
                      <td className="table-cell">
                        <button
                          className="interactive-cell"
                          onClick={() =>
                            pushToast({
                              type: "info",
                              title: "Employee profile preview",
                              message:
                                "A dedicated employee detail route can be layered onto this directory in the next iteration.",
                            })
                          }
                          type="button"
                        >
                          {employee.name}
                        </button>
                      </td>
                      <td className="table-cell">{employee.department}</td>
                      <td className="table-cell">{employee.location}</td>
                      <td className="table-cell">{employee.email}</td>
                      <td className="table-cell">{`${employee.assignedDevices} devices`}</td>
                      <td className="table-cell">
                        <StatusBadge value={employee.status} />
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
        title="Department distribution"
        subtitle="Current staff footprint and device coverage by team"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {departmentDistribution.map((item) => (
            <div
              className="rounded-2xl border border-slate-200 px-4 py-4"
              key={item.department}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-slate-900">{item.department}</p>
                <span className="text-sm text-slate-500">{item.employees}</span>
              </div>
              <p className="mt-2 text-sm text-slate-500">{item.devices}</p>
            </div>
          ))}
        </div>
      </PageSection>
    </div>
  );
}
