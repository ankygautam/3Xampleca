"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface ContentCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function ContentCard({
  children,
  className,
  delay = 0,
}: ContentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),transparent_36%,transparent_64%,rgba(255,255,255,0.04))]" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
