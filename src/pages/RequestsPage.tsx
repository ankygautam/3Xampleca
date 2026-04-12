import { CircleHelp, FileClock } from "lucide-react";
import { PageSection } from "../components/ui/PageSection";

export function RequestsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-950">
          Requests
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Employee requests, issue reports, and review workload.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <PageSection title="Open requests" description="Items that still need review or action">
          <div className="space-y-3">
            {[
              "Replacement laptop for Finance",
              "New monitor request for Operations",
              "Docking issue report for Toronto office",
            ].map((item) => (
              <div className="flex gap-3 rounded-xl border border-slate-200 px-4 py-3" key={item}>
                <FileClock className="mt-0.5 h-4 w-4 text-slate-500" />
                <p className="text-sm text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </PageSection>

        <PageSection title="Request categories" description="Current intake mix by type">
          <div className="space-y-3">
            {[
              "Replacement requests · 8",
              "New device requests · 5",
              "Issue reports · 11",
            ].map((item) => (
              <div className="flex gap-3 rounded-xl border border-slate-200 px-4 py-3" key={item}>
                <CircleHelp className="mt-0.5 h-4 w-4 text-slate-500" />
                <p className="text-sm text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </PageSection>
      </div>
    </div>
  );
}
