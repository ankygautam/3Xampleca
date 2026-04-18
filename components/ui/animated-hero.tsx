"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import {
  Sparkles,
  Video,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { config } from "@/config"

export function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(
    () => ["agentic", "creative", "live", "daily", "real"],
    [],
  )

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setTitleNumber((current) => (current === titles.length - 1 ? 0 : current + 1))
    }, 2000)

    return () => window.clearTimeout(timeoutId)
  }, [titleNumber, titles])

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_24%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_20%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.06),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
      <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-white/10 blur-[130px]" />
      <div className="absolute right-[-6rem] top-28 h-80 w-80 rounded-full bg-white/10 blur-[145px]" />

      <div className="section-shell relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="max-w-4xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-white/80 backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5" />
              AI Agentic Web Application Examples
            </div>

            <h1 className="mt-6 text-[2.6rem] font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
              <span className="block">Build AI-powered</span>
              <span className="block">web apps that feel</span>
              <span className="relative mt-2 flex min-h-[1.15em] items-center justify-center overflow-hidden text-white">
                {titles.map((title, index) => (
                  <motion.span
                    key={title}
                    className="absolute bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: -90 }}
                    transition={{ type: "spring", stiffness: 60, damping: 16 }}
                    animate={
                      titleNumber === index
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: titleNumber > index ? -110 : 110 }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <div className="mt-6 space-y-3 text-base leading-8 text-slate-300 sm:text-lg">
              <p>
                3xample is a public showcase for AI-agentic web applications built
                as real examples.
              </p>
            </div>

            <div className="mt-7 flex justify-center">
              <Button asChild size="lg" variant="outline" className="gap-3">
                <a href={config.pumpFunUrl} rel="noreferrer" target="_blank">
                  Watch livestreams <Video className="h-4 w-4" />
                </a>
              </Button>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
