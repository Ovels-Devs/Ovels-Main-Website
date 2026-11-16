"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { CONTACT_EMAIL, GITHUB_URL } from "@/lib/site";

const LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#more", label: "Roadmap" },
  { href: GITHUB_URL, label: "GitHub", external: true },
  { href: `mailto:${CONTACT_EMAIL}`, label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the mobile menu (keyboard support)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      <nav
        aria-label="Main"
        className={`nav-in glass flex items-center gap-1 rounded-full py-2 pl-4 pr-2 transition-all duration-300 ${
          scrolled ? "shadow-[0_10px_40px_rgba(2,10,7,0.6)]" : ""
        }`}
      >
        <a href="#top" className="group mr-2 flex items-center gap-2.5" aria-label="Ovels home">
          <Logo className="h-7 w-7 transition-transform duration-500 group-hover:scale-105" />
          <span className="font-display text-lg font-bold tracking-wide text-white">Ovels</span>
        </a>

        <div className="hidden items-center md:flex">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.external ? { target: "_blank", rel: "me noopener noreferrer" } : {})}
              className="rounded-full px-4 py-2 text-sm text-[color:var(--muted-foreground)] transition-colors hover:bg-white/5 hover:text-[color:var(--mint)]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#projects"
          className="btn-primary ml-2 hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold sm:inline-flex"
        >
          <span className="status-dot" aria-hidden="true" />
          Explore the ecosystem
        </a>

        {/* mobile burger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line)] text-[color:var(--mint)] md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span className={`absolute left-0 top-0 h-0.5 w-4 rounded bg-current transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-4 rounded bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-3 h-0.5 w-4 rounded bg-current transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      {/* mobile menu */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-x-4 top-20 z-40 origin-top rounded-2xl border border-[color:var(--line)] bg-[#0a1a13]/95 p-3 backdrop-blur-xl transition-all duration-300 md:hidden ${
          // "invisible" when closed removes the links from keyboard focus order
          open ? "visible scale-100 opacity-100" : "invisible pointer-events-none scale-95 opacity-0"
        }`}
      >
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            {...(l.external ? { target: "_blank", rel: "me noopener noreferrer" } : {})}
            onClick={() => setOpen(false)}
            className="block rounded-xl px-4 py-3 text-sm text-[color:var(--muted-foreground)] transition-colors hover:bg-white/5 hover:text-[color:var(--mint)]"
          >
            {l.label}
          </a>
        ))}
        <a href="#projects" onClick={() => setOpen(false)} className="btn-primary mt-2 block rounded-xl px-4 py-3 text-center text-sm font-semibold">
          Explore the ecosystem
        </a>
      </div>
    </header>
  );
}
