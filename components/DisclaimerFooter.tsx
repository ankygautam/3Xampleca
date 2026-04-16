import { config } from "@/config";

export function DisclaimerFooter() {
  return (
    <footer className="section-shell pb-20 pt-16">
      <div className="border-t border-slate-200 pt-6 text-sm leading-6 text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <p>{config.disclaimer}</p>
      </div>
    </footer>
  );
}
