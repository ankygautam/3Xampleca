"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

import { Navbar } from "@/components/Navbar"
import { cn } from "@/lib/utils"

interface PageShellProps {
  eyebrow?: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function PageShell({
  eyebrow,
  title,
  description,
  children,
  className,
}: PageShellProps) {
  return (
    <main
      className={cn(
        "relative min-h-screen overflow-hidden bg-black text-white",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_24%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_20%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.05),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
      <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-white/10 blur-[130px]" />
      <div className="absolute right-[-6rem] top-28 h-80 w-80 rounded-full bg-white/10 blur-[145px]" />

      <div className="relative z-10">
        <Navbar />

        <section className="mx-auto flex w-full max-w-6xl flex-col px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl"
          >
            {eyebrow ? (
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/70">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                {description}
              </p>
            ) : null}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
            className="mt-10 sm:mt-12"
          >
            {children}
          </motion.div>
        </section>
      </div>
    </main>
  )
}
