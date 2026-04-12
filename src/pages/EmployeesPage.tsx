import {
  ChevronDown,
  LaptopMinimal,
  Plus,
  Search,
  UserRoundPlus,
  Users,
  Workflow,
} from "lucide-react";
import { PageSection } from "../components/ui/PageSection";
import { StatCard } from "../components/ui/StatCard";
import { StatusBadge } from "../components/ui/StatusBadge";

type EmployeeDirectoryStatus = "Active" | "Remote" | "On Leave" | "New Hire";

interface EmployeeRow {
  id: string;
  name: string;
  department: string;
  location: string;
  email: string;
  assignedDevices: string;
  status: EmployeeDirectoryStatus;
}

const summaryCards = [
  {
    title: "Total Employees",
    value: "284",
    subtitle: "Tracked in asset directory",
    helperText: "Across all supported offices",
    icon: Users,
  },
  {
    title: "Active Assignments",
    value: "612",
    subtitle: "Devices currently in use",
    helperText: "Includes laptops, phones, and accessories",
    icon: Workflow,
  },
  {
    title: "Remote Staff",
    value: "76",
    subtitle: "Working outside office locations",
    helperText: "Priority for shipping and swap logistics",
    icon: LaptopMinimal,
  },
  {
    title: "New Hires This Month",
    value: "11",
    subtitle: "Pending onboarding readiness",
    helperText: "Provisioning tracked by IT operations",
    icon: UserRoundPlus,
  },
] as const;

const employeeRows: EmployeeRow[] = [
  {
    id: "emp-001",
    name: "Liam Brooks",
    department: "Operations",
    location: "Calgary",
    email: "liam.brooks@company.com",
    assignedDevices: "3 devices",
    status: "Active",
  },
  {
    id: "emp-002",
    name: "Anika Sharma",
    department: "Finance",
    location: "Calgary",
    email: "anika.sharma@company.com",
    assignedDevices: "2 devices",
    status: "Active",
  },
  {
    id: "emp-003",
    name: "Jordan Patel",
    department: "Legal",
    location: "Toronto",
    email: "jordan.patel@company.com",
    assignedDevices: "2 devices",
    status: "Remote",
  },
  {
    id: "emp-004",
    name: "Sofia Martinez",
    department: "People",
    location: "Vancouver",
    email: "sofia.martinez@company.com",
    assignedDevices: "1 device",
    status: "On Leave",
  },
  {
    id: "emp-005",
    name: "Ethan Walker",
    department: "Design",
    location: "Montreal",
    email: "ethan.walker@company.com",
    assignedDevices: "4 devices",
    status: "Remote",
  },
  {
    id: "emp-006",
    name: "Noah Kim",
    department: "Revenue",
    location: "Toronto",
    email: "noah.kim@company.com",
    assignedDevices: "2 devices",
    status: "New Hire",
  },
];

const departmentDistribution = [
  { department: "Operations", employees: "64 employees", devices: "138 devices" },
  { department: "Finance", employees: "28 employees", devices: "54 devices" },
  { department: "People", employees: "19 employees", devices: "31 devices" },
  { department: "Legal", employees: "14 employees", devices: "27 devices" },
];

export function EmployeesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            Employee directory
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage staff records, device ownership, and support coverage by team.
          </p>
        </div>

        <button
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
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
            value={card.value}
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
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row">
            <label className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:bg-white"
                placeholder="Search by employee name or email"
                type="text"
              />
            </label>

            <button
              className="inline-flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50 md:min-w-[170px]"
              type="button"
            >
              <span>All departments</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>

            <button
              className="inline-flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50 md:min-w-[170px]"
              type="button"
            >
              <span>All locations</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-500">
                  <th className="px-4 py-3.5 font-medium">Employee Name</th>
                  <th className="px-4 py-3.5 font-medium">Department</th>
                  <th className="px-4 py-3.5 font-medium">Location</th>
                  <th className="px-4 py-3.5 font-medium">Email</th>
                  <th className="px-4 py-3.5 font-medium">Assigned Devices</th>
                  <th className="px-4 py-3.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {employeeRows.map((employee) => (
                  <tr key={employee.id} className="transition-colors hover:bg-slate-50/80">
                    <td className="px-4 py-4">
                      <button
                        className="font-medium text-slate-900 transition hover:text-slate-700"
                        type="button"
                      >
                        {employee.name}
                      </button>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{employee.department}</td>
                    <td className="px-4 py-4 text-slate-600">{employee.location}</td>
                    <td className="px-4 py-4 text-slate-600">{employee.email}</td>
                    <td className="px-4 py-4 text-slate-600">{employee.assignedDevices}</td>
                    <td className="px-4 py-4">
                      <StatusBadge value={employee.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
          <p>{employeeRows.length} employees in this view</p>
          <p>Showing current directory records</p>
        </div>
      </PageSection>

      <PageSection
        title="Department distribution"
        subtitle="Current staff footprint and device coverage by team"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {departmentDistribution.map((item) => (
            <div
              className="rounded-xl border border-slate-200 px-4 py-4"
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
