import {
  Bell,
  ChevronDown,
  RefreshCcw,
  Save,
  Shield,
  Workflow,
} from "lucide-react";
import {
  assetCategorySettings,
  notificationSettings,
  organizationSettings,
  refreshRuleSettings,
  requestWorkflowSettings,
  roleSettings,
} from "../data/mockData";
import { PageSection } from "../components/ui/PageSection";
import { StatCard } from "../components/ui/StatCard";
import { useToast } from "../hooks/useToast";
import type { SettingOption } from "../types";

const summaryCards = [
  {
    title: "Active Policies",
    subtitle: "Operational controls in use",
    helperText: "Applies to provisioning, repair, and lifecycle workflows",
    icon: Shield,
  },
  {
    title: "Notification Rules",
    subtitle: "Automated alert settings",
    helperText: "Email and escalation routing currently enabled",
    icon: Bell,
  },
  {
    title: "Role Profiles",
    subtitle: "Configured permission groups",
    helperText: "Used across IT, operations, and read-only access",
    icon: Shield,
  },
  {
    title: "Workflow Templates",
    subtitle: "Request and service stages",
    helperText: "Shared across intake, approval, and fulfillment",
    icon: Workflow,
  },
] as const;

function InputField({ label, value }: Pick<SettingOption, "label" | "value">) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        {value}
      </div>
    </div>
  );
}

function ToggleRow({ label, description, enabled }: SettingOption) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 px-4 py-4">
      <div>
        <p className="font-medium text-slate-900">{label}</p>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      <div className={`flex h-7 w-12 shrink-0 items-center rounded-full px-1 ${enabled ? "bg-slate-900" : "bg-slate-200"}`}>
        <div className={`h-5 w-5 rounded-full bg-white ${enabled ? "ml-auto" : ""}`} />
      </div>
    </div>
  );
}

export function SettingsPage() {
  const { pushToast } = useToast();
  const summaryValues = {
    "Active Policies": organizationSettings.length + refreshRuleSettings.length,
    "Notification Rules": notificationSettings.length,
    "Role Profiles": roleSettings.length,
    "Workflow Templates": requestWorkflowSettings.length,
  };

  return (
    <div className="page-stack">
      <div className="page-header">
        <div className="page-copy">
          <h2 className="page-title">
            Settings
          </h2>
          <p className="page-subtitle">
            Configure organization defaults, workflows, notifications, and access controls.
          </p>
        </div>

        <div className="page-actions">
          <button
            className="button-primary"
            onClick={() =>
              pushToast({
                type: "success",
                title: "Settings snapshot saved",
                message:
                  "This prototype stores configuration changes locally for presentation and workflow review.",
              })
            }
            type="button"
          >
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </button>
          <button
            className="button-secondary"
            onClick={() =>
              pushToast({
                type: "info",
                title: "Settings reset preview",
                message:
                  "Reset behavior is represented in the UI and can be wired to persisted organization defaults later.",
              })
            }
            type="button"
          >
            <RefreshCcw className="h-4 w-4" />
            <span>Reset</span>
          </button>
        </div>
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

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)]">
        <div className="space-y-6">
          <PageSection
            title="Organization settings"
            subtitle="Core company profile and default asset configuration"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {organizationSettings.map((setting) => (
                <InputField key={setting.id} label={setting.label} value={setting.value} />
              ))}
            </div>
          </PageSection>

          <PageSection
            title="Asset categories"
            subtitle="Managed inventory groups and category definitions"
            action={
              <button
                className="button-secondary h-10 px-3"
                onClick={() =>
                  pushToast({
                    type: "info",
                    title: "Category management preview",
                    message:
                      "Category creation is included as a workflow surface and can be connected to admin-managed taxonomy controls.",
                  })
                }
                type="button"
              >
                <span>Add category</span>
              </button>
            }
          >
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {assetCategorySettings.map((item) => (
                <div
                  className="rounded-xl border border-slate-200 px-4 py-4"
                  key={item.id}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-slate-900">{item.label}</p>
                    <button
                      className="text-sm font-medium text-slate-500 transition hover:text-slate-700"
                      onClick={() =>
                        pushToast({
                          type: "info",
                          title: "Edit flow preview",
                          message: `Editing for ${item.label} can be connected to persisted settings in a production implementation.`,
                        })
                      }
                      type="button"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">{item.value}</p>
                </div>
              ))}
            </div>
          </PageSection>

          <PageSection
            title="Request workflow rules"
            subtitle="Current intake and fulfillment stages for internal requests"
          >
            <div className="space-y-3">
              {requestWorkflowSettings.map((item, index) => (
                <div
                  className="flex items-start gap-4 rounded-xl border border-slate-200 px-4 py-4"
                  key={item.id}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-slate-900">{item.label}</p>
                      <button
                        className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-700"
                        onClick={() =>
                          pushToast({
                            type: "info",
                            title: "Workflow ordering preview",
                            message:
                              "Request stage ordering is represented in the prototype and can be made fully sortable later.",
                          })
                        }
                        type="button"
                      >
                        <span>Order</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </PageSection>
        </div>

        <div className="space-y-6">
          <PageSection
            title="Notifications"
            subtitle="Alert routing and reminder preferences"
          >
            <div className="space-y-3">
              {notificationSettings.map((rule) => (
                <ToggleRow key={rule.id} {...rule} />
              ))}
            </div>
          </PageSection>

          <PageSection
            title="Roles and permissions"
            subtitle="Access profiles for internal teams"
          >
            <div className="space-y-3">
              {roleSettings.map((role) => (
                <div
                  className="rounded-xl border border-slate-200 px-4 py-4"
                  key={role.id}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                      <Shield className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{role.label}</p>
                      <p className="mt-1 text-sm text-slate-500">{role.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PageSection>

          <PageSection
            title="Device refresh rules"
            subtitle="Lifecycle defaults for standard replacement planning"
          >
            <div className="space-y-3">
              {refreshRuleSettings.map((item) => (
                <div
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4"
                  key={item.id}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-slate-900">{item.label}</p>
                    <p className="text-sm font-medium text-slate-700">{item.value}</p>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">{item.description}</p>
                </div>
              ))}
            </div>
          </PageSection>
        </div>
      </div>
    </div>
  );
}
