import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { cn } from "../../lib/utils";

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastProps extends ToastItem {
  onDismiss: (id: string) => void;
}

const toastStyles: Record<ToastType, string> = {
  success: "border-emerald-200 bg-white text-slate-900",
  error: "border-rose-200 bg-white text-slate-900",
  info: "border-sky-200 bg-white text-slate-900",
};

const iconStyles: Record<ToastType, string> = {
  success: "text-emerald-600",
  error: "text-rose-600",
  info: "text-sky-600",
};

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
} satisfies Record<ToastType, typeof CheckCircle2>;

export function Toast({ id, type, title, message, onDismiss }: ToastProps) {
  const Icon = icons[type];

  return (
    <div
      className={cn(
        "toast-enter pointer-events-auto w-full rounded-[20px] border px-4 py-3.5 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.32)]",
        toastStyles[type],
      )}
      role="status"
    >
      <div className="flex items-start gap-3">
        <div className={cn("mt-0.5 shrink-0", iconStyles[type])}>
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          {message ? (
            <p className="mt-1 text-sm leading-6 text-slate-500">{message}</p>
          ) : null}
        </div>

        <button
          aria-label="Dismiss toast"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          onClick={() => onDismiss(id)}
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
