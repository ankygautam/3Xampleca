import { BriefcaseBusiness, Handshake } from "lucide-react";
import { PageSection } from "../components/ui/PageSection";

export function VendorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-950">
          Vendors
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Service partners, warranty contacts, and support coverage.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <PageSection title="Vendor list" description="Current support and procurement partners">
          <div className="space-y-3">
            {[
              "NorthBridge IT Services",
              "ScreenWorks Supply",
              "MobileCare Support",
            ].map((item) => (
              <div className="flex gap-3 rounded-xl border border-slate-200 px-4 py-3" key={item}>
                <BriefcaseBusiness className="mt-0.5 h-4 w-4 text-slate-500" />
                <p className="text-sm text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </PageSection>

        <PageSection title="Support contracts" description="Agreement coverage and renewal status">
          <div className="space-y-3">
            {[
              "Laptop support renewal due in June",
              "Monitor supply agreement active through Q4",
              "Mobile repair agreement under review",
            ].map((item) => (
              <div className="flex gap-3 rounded-xl border border-slate-200 px-4 py-3" key={item}>
                <Handshake className="mt-0.5 h-4 w-4 text-slate-500" />
                <p className="text-sm text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </PageSection>
      </div>
    </div>
  );
}
