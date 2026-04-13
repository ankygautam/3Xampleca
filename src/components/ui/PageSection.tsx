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
    <section className={cn("section-card", className)}>
      <div className="flex flex-col gap-4 border-b border-slate-200/90 px-6 py-5 sm:px-7 sm:py-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold tracking-[-0.025em] text-slate-950">{title}</h2>
          {helperText ? (
            <p className="mt-1.5 max-w-3xl text-sm leading-6 text-slate-500">{helperText}</p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <div className={cn("p-6 sm:p-7", contentClassName)}>{children}</div>
    </section>
  );
}
