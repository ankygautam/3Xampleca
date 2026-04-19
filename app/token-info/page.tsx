"use client"

import { useState } from "react"
import { Copy } from "lucide-react"

import { DisclaimerFooter } from "@/components/DisclaimerFooter"
import { Button } from "@/components/ui/button"
import { ContentCard } from "@/components/ui/content-card"
import { PageShell } from "@/components/ui/page-shell"
import { config } from "@/config"

function AddressCard({
  title,
  description,
  value,
  delay,
}: {
  title: string
  description: string
  value: string
  delay: number
}) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <ContentCard className="h-full" delay={delay}>
      <div className="flex h-full flex-col gap-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">
            {title}
          </h2>
          <p className="text-base leading-8 text-slate-300">{description}</p>
        </div>

        <div className="mt-auto flex items-start gap-3 rounded-[1.5rem] border border-white/10 bg-black/45 p-4">
          <code className="min-w-0 flex-1 break-all font-mono text-sm leading-7 text-slate-100 sm:text-[0.95rem]">
            {value}
          </code>
          <Button
            aria-label={`Copy ${title}`}
            className={copied ? "border-white/20 bg-white/10 text-white" : ""}
            onClick={handleCopy}
            size="icon"
            type="button"
            variant="outline"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </ContentCard>
  )
}

export default function TokenInfoPage() {
  return (
    <PageShell title="Token info">
      <div className="mx-auto grid max-w-5xl gap-5">
        <AddressCard
          delay={0.05}
          description={config.contractAddressNote}
          title="Contract Address (CA)"
          value={config.contractAddress}
        />
        <AddressCard
          delay={0.13}
          description={config.donationAddressNote}
          title="Developer Donation Address"
          value={config.donationAddress}
        />
      </div>

      <DisclaimerFooter />
    </PageShell>
  )
}
