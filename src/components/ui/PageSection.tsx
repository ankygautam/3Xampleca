import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface PageSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function PageSection({
  title,
  subtitle,
  description,
  action,
  children,
  className,
  contentClassName,
}: PageSectionProps) {
  const helperText = subtitle ?? description;

  return (
    <section
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-panel",
        className,
      )}
    >
      <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold tracking-tight text-slate-950">{title}</h2>
          {helperText ? (
            <p className="mt-1 text-sm text-slate-500">{helperText}</p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <div className={cn("p-6", contentClassName)}>{children}</div>
    </section>
  );
}
