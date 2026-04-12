import { ChevronDown, Download, Plus, Search } from "lucide-react";
import { PageSection } from "../components/ui/PageSection";
import { StatusBadge } from "../components/ui/StatusBadge";
import type { AssetStatus } from "../types";

interface AssetRow {
  id: string;
  assetTag: string;
  type: string;
  brandModel: string;
  assignedTo: string;
  department: string;
  status: AssetStatus;
  warranty: string;
  lastUpdated: string;
}

const inventoryRows: AssetRow[] = [
  {
    id: "asset-001",
    assetTag: "LTP-2048",
    type: "Laptop",
    brandModel: "Dell Latitude 7440",
    assignedTo: "Anika Sharma",
    department: "Finance",
    status: "Assigned",
    warranty: "Sep 14, 2027",
    lastUpdated: "Apr 10, 2026",
  },
  {
    id: "asset-002",
    assetTag: "MON-3312",
    type: "Monitor",
    brandModel: "LG UltraFine 27",
    assignedTo: "Unassigned",
    department: "Shared Stock",
    status: "Available",
    warranty: "Jan 12, 2028",
    lastUpdated: "Apr 8, 2026",
  },
  {
    id: "asset-003",
    assetTag: "PHN-1184",
    type: "Phone",
    brandModel: "Apple iPhone 15",
    assignedTo: "Mason Lee",
    department: "Operations",
    status: "Assigned",
    warranty: "Nov 22, 2026",
    lastUpdated: "Apr 9, 2026",
  },
  {
    id: "asset-004",
    assetTag: "LTP-1931",
    type: "Laptop",
    brandModel: "Lenovo ThinkPad T14",
    assignedTo: "Service Center",
    department: "IT Support",
    status: "Maintenance",
    warranty: "Jun 18, 2026",
    lastUpdated: "Apr 11, 2026",
  },
];

export function AssetsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            Asset inventory
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Search, filter, and review the current inventory record set.
          </p>
        </div>

        <button
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          type="button"
        >
          <Plus className="h-4 w-4" />
          <span>Add Asset</span>
        </button>
      </div>

      <PageSection title="Inventory table" description="Device and equipment records">
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row">
            <label className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:bg-white"
                placeholder="Search assets, tags, or assignees"
                type="text"
              />
            </label>
            <button
              className="inline-flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 md:min-w-[160px]"
              type="button"
            >
              <span>Asset type</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>
            <button
              className="inline-flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 md:min-w-[160px]"
              type="button"
            >
              <span>Status</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>
          </div>

          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700"
            type="button"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-500">
                  <th className="px-4 py-3.5 font-medium">Asset Tag</th>
                  <th className="px-4 py-3.5 font-medium">Type</th>
                  <th className="px-4 py-3.5 font-medium">Brand / Model</th>
                  <th className="px-4 py-3.5 font-medium">Assigned To</th>
                  <th className="px-4 py-3.5 font-medium">Department</th>
                  <th className="px-4 py-3.5 font-medium">Status</th>
                  <th className="px-4 py-3.5 font-medium">Warranty</th>
                  <th className="px-4 py-3.5 font-medium">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {inventoryRows.map((asset) => (
                  <tr key={asset.id} className="transition-colors hover:bg-slate-50/80">
                    <td className="px-4 py-4">
                      <button className="font-medium text-slate-900 hover:text-slate-700" type="button">
                        {asset.assetTag}
                      </button>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{asset.type}</td>
                    <td className="px-4 py-4 text-slate-600">{asset.brandModel}</td>
                    <td className="px-4 py-4 text-slate-600">{asset.assignedTo}</td>
                    <td className="px-4 py-4 text-slate-600">{asset.department}</td>
                    <td className="px-4 py-4">
                      <StatusBadge value={asset.status} />
                    </td>
                    <td className="px-4 py-4 text-slate-600">{asset.warranty}</td>
                    <td className="px-4 py-4 text-slate-600">{asset.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
