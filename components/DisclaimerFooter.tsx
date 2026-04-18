import { config } from "@/config"

export function DisclaimerFooter() {
  return (
    <footer className="section-shell pb-20 pt-16">
      <div className="border-t border-white/10 pt-6 text-sm leading-7 text-slate-400">
        <p>{config.disclaimer}</p>
      </div>
    </footer>
  )
}
