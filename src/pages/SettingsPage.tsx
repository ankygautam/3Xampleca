import { Bell, Building2, Shield } from "lucide-react";
import { PageSection } from "../components/ui/PageSection";

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-950">
          Settings
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Organization preferences, alerts, and access controls.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <PageSection title="Organization settings" description="Business units and inventory defaults">
          <div className="space-y-3">
            {["Company profile", "Office locations", "Asset categories"].map((item) => (
              <div className="flex gap-3 rounded-xl border border-slate-200 px-4 py-3" key={item}>
                <Building2 className="mt-0.5 h-4 w-4 text-slate-500" />
                <p className="text-sm text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </PageSection>

        <PageSection title="Notification settings" description="Operational alerts and routing preferences">
          <div className="space-y-3">
            {["Maintenance alerts", "Warranty reminders", "Approval notifications"].map((item) => (
              <div className="flex gap-3 rounded-xl border border-slate-200 px-4 py-3" key={item}>
                <Bell className="mt-0.5 h-4 w-4 text-slate-500" />
                <p className="text-sm text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </PageSection>

        <PageSection title="Role and permissions" description="Access control and administrative scope">
          <div className="space-y-3">
            {["Admin roles", "Technician roles", "Read-only access"].map((item) => (
              <div className="flex gap-3 rounded-xl border border-slate-200 px-4 py-3" key={item}>
                <Shield className="mt-0.5 h-4 w-4 text-slate-500" />
                <p className="text-sm text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </PageSection>
      </div>
    </div>
  );
}
