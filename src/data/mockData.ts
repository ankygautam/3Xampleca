import type {
  Asset,
  Assignment,
  Employee,
  MaintenanceLog,
  ServiceRequest,
  Vendor,
} from "../types";

export const assets: Asset[] = [
  {
    id: "asset-1",
    assetTag: "LTP-2048",
    type: "Laptop",
    brand: "Dell",
    model: "Latitude 7440",
    serialNumber: "DL7440-98421",
    assignedTo: "emp-1",
    status: "Assigned",
    warrantyExpiry: "2027-09-14",
    purchaseDate: "2024-09-14",
    lastUpdated: "2026-04-10",
  },
  {
    id: "asset-2",
    assetTag: "MON-3312",
    type: "Monitor",
    brand: "LG",
    model: "UltraFine 27",
    serialNumber: "LG27-3312",
    status: "Available",
    warrantyExpiry: "2028-01-12",
    purchaseDate: "2025-01-12",
    lastUpdated: "2026-04-08",
  },
  {
    id: "asset-3",
    assetTag: "PHN-1184",
    type: "Mobile",
    brand: "Apple",
    model: "iPhone 15",
    serialNumber: "APL15-1184",
    assignedTo: "emp-2",
    status: "Assigned",
    warrantyExpiry: "2026-11-22",
    purchaseDate: "2024-11-22",
    lastUpdated: "2026-04-09",
  },
  {
    id: "asset-4",
    assetTag: "LTP-1931",
    type: "Laptop",
    brand: "Lenovo",
    model: "ThinkPad T14",
    serialNumber: "LNV-T14-1931",
    status: "Maintenance",
    warrantyExpiry: "2026-06-18",
    purchaseDate: "2023-06-18",
    lastUpdated: "2026-04-11",
  },
  {
    id: "asset-5",
    assetTag: "TAB-4403",
    type: "Tablet",
    brand: "Microsoft",
    model: "Surface Pro 10",
    serialNumber: "MSP10-4403",
    status: "Retired",
    warrantyExpiry: "2025-12-01",
    purchaseDate: "2022-12-01",
    lastUpdated: "2026-03-21",
  },
];

export const employees: Employee[] = [
  {
    id: "emp-1",
    name: "Anika Sharma",
    department: "Finance",
    location: "Calgary",
    status: "Active",
    assignedDevicesCount: 2,
  },
  {
    id: "emp-2",
    name: "Mason Lee",
    department: "Operations",
    location: "Toronto",
    status: "Active",
    assignedDevicesCount: 3,
  },
  {
    id: "emp-3",
    name: "Sofia Martinez",
    department: "People",
    location: "Vancouver",
    status: "On Leave",
    assignedDevicesCount: 1,
  },
];

export const assignments: Assignment[] = [
  {
    id: "asn-1",
    assetId: "asset-1",
    employeeId: "emp-1",
    assignedDate: "2026-02-11",
    status: "Active",
  },
  {
    id: "asn-2",
    assetId: "asset-3",
    employeeId: "emp-2",
    assignedDate: "2026-01-19",
    status: "Active",
  },
  {
    id: "asn-3",
    assetId: "asset-5",
    employeeId: "emp-3",
    assignedDate: "2025-04-18",
    returnedDate: "2026-03-12",
    status: "Returned",
  },
];

export const maintenanceLogs: MaintenanceLog[] = [
  {
    id: "mnt-1",
    assetId: "asset-4",
    issueSummary: "Battery swelling and keyboard replacement",
    vendorId: "vendor-1",
    repairStatus: "In Progress",
    expectedReturnDate: "2026-04-18",
    openedDate: "2026-04-06",
  },
];

export const requests: ServiceRequest[] = [
  {
    id: "req-1",
    employeeId: "emp-1",
    type: "Replacement",
    priority: "High",
    status: "In Review",
    submittedDate: "2026-04-10",
    summary: "Replacement laptop requested for performance issues",
  },
  {
    id: "req-2",
    employeeId: "emp-2",
    type: "Issue Report",
    priority: "Medium",
    status: "Open",
    submittedDate: "2026-04-09",
    summary: "Docking station intermittently disconnects",
  },
];

export const vendors: Vendor[] = [
  {
    id: "vendor-1",
    name: "NorthBridge IT Services",
    supportedCategories: ["Laptop", "Mobile"],
    warrantyContact: "support@northbridge-it.com",
    contractStatus: "Active",
  },
  {
    id: "vendor-2",
    name: "ScreenWorks Supply",
    supportedCategories: ["Monitor", "Accessories"],
    warrantyContact: "service@screenworks.io",
    contractStatus: "Renewal Pending",
  },
];
