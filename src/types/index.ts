export type AssetStatus =
  | "Assigned"
  | "Available"
  | "Maintenance"
  | "Retired";

export type EmployeeStatus = "Active" | "On Leave" | "Inactive";

export type RequestPriority = "Low" | "Medium" | "High";

export type RequestStatus = "Open" | "In Review" | "Approved" | "Closed";

export type RepairStatus = "Queued" | "In Progress" | "Awaiting Parts" | "Completed";

export type ContractStatus = "Active" | "Renewal Pending" | "Expired";

export interface Asset {
  id: string;
  assetTag: string;
  type: string;
  brand: string;
  model: string;
  serialNumber: string;
  assignedTo?: string;
  status: AssetStatus;
  warrantyExpiry: string;
  purchaseDate: string;
  lastUpdated: string;
}

export interface Employee {
  id: string;
  name: string;
  department: string;
  location: string;
  status: EmployeeStatus;
  assignedDevicesCount: number;
}

export interface Assignment {
  id: string;
  assetId: string;
  employeeId: string;
  assignedDate: string;
  returnedDate?: string;
  status: "Active" | "Returned";
}

export interface MaintenanceLog {
  id: string;
  assetId: string;
  issueSummary: string;
  vendorId: string;
  repairStatus: RepairStatus;
  expectedReturnDate: string;
  openedDate: string;
}

export interface ServiceRequest {
  id: string;
  employeeId: string;
  type: "Replacement" | "New Device" | "Issue Report";
  priority: RequestPriority;
  status: RequestStatus;
  submittedDate: string;
  summary: string;
}

export interface Vendor {
  id: string;
  name: string;
  supportedCategories: string[];
  warrantyContact: string;
  contractStatus: ContractStatus;
}
