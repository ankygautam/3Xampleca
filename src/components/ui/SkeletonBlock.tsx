import { cn } from "../../lib/utils";

interface SkeletonBlockProps {
  className?: string;
}

export function SkeletonBlock({ className }: SkeletonBlockProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-2xl border border-slate-200/60 bg-slate-100/80",
        className,
      )}
    />
  );
}
