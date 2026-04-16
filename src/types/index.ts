import type { LucideIcon } from "lucide-react";

export type AssetStatus = "Assigned" | "Available" | "Maintenance" | "Retired";

export type EmployeeStatus = "Active" | "Remote" | "On Leave" | "Inactive" | "New Hire";

export type AssignmentStatus =
  | "Active"
  | "Due Soon"
  | "Overdue"
  | "Returned"
  | "Pending";

export type RequestPriority = "Low" | "Medium" | "High";

export type RequestStatus =
  | "Open"
  | "In Review"
  | "Approved"
  | "Resolved"
  | "Rejected"
  | "Closed";

export type RepairStatus =
  | "Open"
  | "Queued"
  | "Awaiting Parts"
  | "In Progress"
  | "In Repair"
  | "Scheduled"
  | "Completed"
  | "Resolved"
  | "Returned"
  | "Escalated";

export type ContractStatus =
  | "Active"
  | "Renewal Pending"
  | "Renewal Due"
  | "Expired"
  | "Preferred"
  | "Limited";

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
}

export interface Asset {
  id: string;
  assetTag: string;
  type: string;
  brand: string;
  model: string;
  serialNumber: string;
  assignedTo?: string;
  department: string;
  status: AssetStatus;
  warrantyExpiry: string;
  purchaseDate: string;
  location: string;
  vendor: string;
  lastUpdated: string;
}

export interface Employee {
  id: string;
  name: string;
  department: string;
  location: string;
  email: string;
  assignedDevices: number;
  status: EmployeeStatus;
}

export interface Assignment {
  id: string;
  assetTag: string;
  device: string;
  employee: string;
  department: string;
  assignedDate: string;
  expectedReturn?: string;
  status: AssignmentStatus;
  processedBy: string;
}

export interface MaintenanceRecord {
  id: string;
  assetTag: string;
  device: string;
  issue: string;
  vendor: string;
  submittedDate: string;
  eta: string;
  status: RepairStatus;
  outcome: string;
}

export interface ServiceRequest {
  id: string;
  requestId: string;
  type: string;
  employee: string;
  department: string;
  submittedDate: string;
  priority: RequestPriority;
  status: RequestStatus;
  processedBy: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  primaryContact: string;
  email: string;
  contractType: string;
  renewalDate: string;
  status: ContractStatus;
}

export interface WarrantyItem {
  id: string;
  assetTag: string;
  model: string;
  owner: string;
  expiryDate: string;
}

export interface ActivityLog {
  id: string;
  date: string;
  title: string;
  description: string;
  actor: string;
  status: string;
}

export interface ReportMetric {
  id: string;
  label: string;
  value: string;
  subtitle: string;
}

export interface SettingOption {
  id: string;
  label: string;
  value: string;
  description?: string;
  enabled?: boolean;
}

// Backward-compatible aliases for existing imports and earlier scaffolding.
export type MaintenanceLog = MaintenanceRecord;
