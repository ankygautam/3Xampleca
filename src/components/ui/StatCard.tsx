import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

interface StatCardProps {
  title?: string;
  label?: string;
  value: string;
  subtitle?: string;
  detail?: string;
  helperText?: string;
  trend?: string;
  icon?: LucideIcon;
  className?: string;
}

export function StatCard({
  title,
  label,
  value,
  subtitle,
  detail,
  helperText,
  trend,
  icon: Icon,
  className,
}: StatCardProps) {
  const heading = title ?? label ?? "";
  const supportingText = helperText ?? detail;

  return (
    <section
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-panel",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{heading}</p>
          {subtitle ? <p className="mt-1 text-sm text-slate-400">{subtitle}</p> : null}
        </div>

        {Icon ? (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
            <Icon className="h-4 w-4" />
          </div>
        ) : null}
      </div>

      <div className="mt-5">
        <p className="text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
        {trend ? <p className="mt-2 text-sm font-medium text-slate-700">{trend}</p> : null}
        {supportingText ? <p className="mt-1 text-sm text-slate-500">{supportingText}</p> : null}
      </div>
    </section>
  );
}
