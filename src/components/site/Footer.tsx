import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import { Logo } from "./Logo";
import { CookieSettingsButton } from "./CookieSettingsButton";
import { PROJECTS, RESERVED_SLOTS } from "@/data/projects";
import { CONTACT_EMAIL, GITHUB_URL } from "@/lib/site";

/**
 * Footer mirrors the structure of bot.ovels.in's landing footer:
 * brand block + link columns on a hairline-separated grid, then a
 * bottom bar with copyright and a right-hand meta note.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-[color:var(--line)] bg-[color:var(--ink-2)]" aria-label="Footer">
      {/* faint emerald hairline glow on the top edge */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(94,234,212,0.35)] to-transparent"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(61,189,138,0.06),transparent)]" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-8 pt-14 sm:pt-16">
        <div className="grid gap-10 border-b border-[color:var(--line)] pb-10 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-8">
          {/* brand block — mirrors .landing__footer-brand */}
          <div className="sm:col-span-2 md:col-span-1 md:pr-8">
            <div className="flex items-center gap-2.5">
              <Logo className="h-7 w-7" />
              <span className="font-heading text-lg font-bold tracking-tight text-white">Ovels</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[color:var(--muted-foreground)]">
              An independent studio run by a single developer. The Discord
              bot is live, the AI coach app is on its way to the stores, and
              whatever gets built next will land here too.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[color:var(--brand)] transition-colors hover:text-[color:var(--teal-light)]"
              >
                {CONTACT_EMAIL}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="me noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[color:var(--brand)] transition-colors hover:text-[color:var(--teal-light)]"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                GitHub
                <span className="sr-only"> (Ovels-Devs on GitHub, opens in a new tab)</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* products column */}
          <nav aria-label="Products">
            <p className="label-mono text-[color:var(--muted-foreground)]">Products</p>
            <ul className="mt-4 space-y-3">
              {PROJECTS.map((p) => (
                <li key={p.id}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-baseline gap-2 text-[13px] font-semibold text-[color:var(--foreground)]/80 transition-colors hover:text-[color:var(--teal-light)]"
                  >
                    {p.name}
                    <span className="text-[color:var(--muted-foreground)] transition-colors group-hover:text-[color:var(--brand)]">
                      ↗
                    </span>
                    <span className="font-mono text-[11px] font-normal text-[color:var(--muted-foreground)]">
                      {p.domain}
                    </span>
                  </a>
                </li>
              ))}
              {RESERVED_SLOTS.slice(0, 1).map((s) => (
                <li key={s.index} className="inline-flex items-center gap-2 text-[13px] font-semibold text-[color:var(--muted-foreground)]/70"> {/* /70: 4.97:1 on ink-2 (WCAG AA) */}
                  Slot {s.index} is coming soon
                  <span className="status-dot !h-1.5 !w-1.5 opacity-60" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </nav>

          {/* site column */}
          <nav aria-label="Site">
            <p className="label-mono text-[color:var(--muted-foreground)]">Site</p>
            <ul className="mt-4 space-y-3">
              {[
                { href: "#projects", label: "Projects" },
                { href: "#about", label: "About" },
                { href: "#more", label: "Roadmap" },
                { href: `mailto:${CONTACT_EMAIL}`, label: "Contact" },
                { href: GITHUB_URL, label: "GitHub", external: true },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "me noopener noreferrer" } : {})}
                    className="text-[13px] font-semibold text-[color:var(--foreground)]/80 transition-colors hover:text-[color:var(--teal-light)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* legal column — visible on every page (GDPR / EAA) */}
          <nav aria-label="Legal">
            <p className="label-mono text-[color:var(--muted-foreground)]">Legal</p>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/privacy" className="text-[13px] font-semibold text-[color:var(--foreground)]/80 transition-colors hover:text-[color:var(--teal-light)]">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[13px] font-semibold text-[color:var(--foreground)]/80 transition-colors hover:text-[color:var(--teal-light)]">
                  Terms of service
                </Link>
              </li>
              <li>
                <Link href="/imprint" className="text-[13px] font-semibold text-[color:var(--foreground)]/80 transition-colors hover:text-[color:var(--teal-light)]">
                  Imprint
                </Link>
              </li>
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </nav>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 pt-6 sm:flex-row">
          <p className="text-xs text-[color:var(--muted-foreground)]">
            © {year} Ovels. Made by{" "}
            <a
              href="https://ishan.vip"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[color:var(--teal-light)] underline-offset-2 transition-colors hover:text-[color:var(--mint)] hover:underline"
            >
              Ishan
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
