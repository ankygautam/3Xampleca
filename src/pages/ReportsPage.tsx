import { Download, PieChart, TrendingUp } from "lucide-react";
import { PageSection } from "../components/ui/PageSection";
import { StatCard } from "../components/ui/StatCard";

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-950">
          Reports
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Snapshot metrics, reporting placeholders, and export controls.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Asset Distribution" value="8 categories" detail="Across all inventory records" />
        <StatCard label="Maintenance Trend" value="12 open" detail="Service queue this week" />
        <StatCard label="Assignment Volume" value="84 changes" detail="Last 30 days" />
        <StatCard label="Warranty Expirations" value="19 upcoming" detail="Next 90 days" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.9fr)]">
        <div className="grid gap-6 lg:grid-cols-2">
          <PageSection title="Asset distribution" description="Chart placeholder">
            <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                <span>Distribution chart area</span>
              </div>
            </div>
          </PageSection>

          <PageSection title="Maintenance trend" description="Chart placeholder">
            <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Trend chart area</span>
              </div>
            </div>
          </PageSection>
        </div>

        <PageSection
          title="Export panel"
          description="Prepare operational reports for internal sharing"
        >
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-medium text-slate-900">Quarterly asset summary</p>
              <p className="mt-1 text-sm text-slate-500">
                Include inventory counts, lifecycle status, and assignment movement.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-medium text-slate-900">Maintenance review</p>
              <p className="mt-1 text-sm text-slate-500">
                Export active repairs, vendors, and turnaround times.
              </p>
            </div>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
              type="button"
            >
              <Download className="h-4 w-4" />
              <span>Export report</span>
            </button>
          </div>
        </PageSection>
      </div>
    </div>
  );
}
