"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { config } from "@/config";

function truncateAddress(value: string) {
  if (value.length <= 12) {
    return value;
  }

  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

function CopyButton({
  label,
  value,
  onCopied,
}: {
  label: string;
  value: string;
  onCopied: (label: string) => void;
}) {
  const desktopValue = value;
  const mobileValue = useMemo(() => truncateAddress(value), [value]);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    onCopied(label);
  }

  return (
    <div className="surface-card p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 break-all font-mono text-sm text-slate-900 dark:text-slate-100 sm:hidden">
            {mobileValue}
          </p>
          <p className="mt-2 hidden break-all font-mono text-sm text-slate-900 dark:text-slate-100 sm:block">
            {desktopValue}
          </p>
        </div>

        <button
          className="button-secondary shrink-0 sm:min-w-[104px]"
          onClick={handleCopy}
          type="button"
        >
          Copy
        </button>
      </div>
    </div>
  );
}

export function TokenInfo() {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleCopied(label: string) {
    setCopiedLabel(label);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => setCopiedLabel(null), 2200);
  }

  return (
    <section className="section-shell pt-16">
      <div className="space-y-6">
        <div className="surface-card p-6 sm:p-8">
          <p className="eyebrow">Official address</p>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            {config.contractAddressNote}
          </p>
          <div className="mt-6">
            <CopyButton
              label="Contract address (CA)"
              onCopied={handleCopied}
              value={config.contractAddress}
            />
          </div>
          <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/20 dark:text-rose-300">
            Always verify from this site. Never trust addresses from comments or replies.
          </div>
        </div>

        <div className="surface-card p-6 sm:p-8">
          <p className="eyebrow">Support details</p>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            {config.donationAddressNote}
          </p>
          <div className="mt-6">
            <CopyButton
              label="Developer donation address"
              onCopied={handleCopied}
              value={config.donationAddress}
            />
          </div>
        </div>
      </div>

      <div
        className={`fixed bottom-4 right-4 z-50 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-card transition ${
          copiedLabel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        } dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100`}
        role="status"
      >
        {copiedLabel ? `${copiedLabel} copied!` : ""}
      </div>
    </section>
  );
}
