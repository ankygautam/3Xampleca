"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { config } from "@/config";

const navLinks = [
  { label: "Vision", href: "/vision" },
  { label: "About", href: "/about" },
  { label: "Token info", href: "/token-info" },
  { label: "X / Twitter", href: config.twitterUrl, external: true },
];

function MenuIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3.75 5h12.5M3.75 10h12.5M3.75 15h12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-2xl">
      <div className="section-shell">
        <div className="flex min-h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center text-lg font-semibold tracking-tight text-white">
            <span className="text-white">3</span>
            <span>xample</span>
          </Link>

          <nav className="hidden items-center gap-1 sm:flex">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-slate-300 transition hover:bg-white/8 hover:text-white"
                  href={link.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  className={`inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium transition ${
                    pathname === link.href
                      ? "bg-white/10 text-white"
                      : "text-slate-300 hover:bg-white/8 hover:text-white"
                  }`}
                  href={link.href}
                >
                  {link.label}
                </Link>
              ),
            )}
            <a
              className="ml-2 inline-flex min-h-11 items-center rounded-xl border border-white/10 bg-white px-4 text-sm font-medium text-black transition hover:bg-white/90"
              href={config.pumpFunUrl}
              rel="noreferrer"
              target="_blank"
            >
              Pump.fun
            </a>
          </nav>

          <button
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/10 text-slate-200 transition hover:border-white/30 hover:text-white sm:hidden"
            onClick={() => setIsOpen((value) => !value)}
            type="button"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-white/10 transition-[max-height,opacity] duration-200 sm:hidden ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="section-shell py-3">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  className="inline-flex min-h-11 items-center justify-start rounded-lg px-3 text-sm font-medium text-slate-300 transition hover:bg-white/8 hover:text-white"
                  href={link.href}
                  rel="noreferrer"
                  target="_blank"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  className={`inline-flex min-h-11 items-center justify-start rounded-lg px-3 text-sm font-medium transition ${
                    pathname === link.href
                      ? "bg-white/10 text-white"
                      : "text-slate-300 hover:bg-white/8 hover:text-white"
                  }`}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ),
            )}
            <a
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-white/10 bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
              href={config.pumpFunUrl}
              rel="noreferrer"
              target="_blank"
            >
              Pump.fun
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
