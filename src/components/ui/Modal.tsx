import { type ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses: Record<NonNullable<ModalProps["size"]>, string> = {
  md: "max-w-2xl",
  lg: "max-w-3xl",
  xl: "max-w-5xl",
};

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = "lg",
  className,
}: ModalProps) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-[3px] sm:p-6"
      onClick={onClose}
      role="dialog"
    >
      <div
        className={cn(
          "flex max-h-[calc(100vh-2rem)] w-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_32px_90px_-36px_rgba(15,23,42,0.35)] sm:max-h-[calc(100vh-4rem)]",
          sizeClasses[size],
          className,
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200/90 px-6 py-5 sm:px-7 sm:py-6">
          <div className="min-w-0">
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-1.5 text-sm leading-6 text-slate-500">{subtitle}</p>
            ) : null}
          </div>

          <button
            aria-label="Close modal"
            className="button-icon h-10 w-10 rounded-xl"
            onClick={onClose}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5 sm:px-7 sm:py-6">{children}</div>

        {footer ? (
          <div className="border-t border-slate-200/90 px-6 py-4 sm:px-7">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
