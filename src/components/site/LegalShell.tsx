import Link from "next/link";
import { Logo } from "./Logo";
import { Footer } from "./Footer";

/**
 * Shared shell for /privacy, /terms and /imprint — same design
 * language as the hub, with a compact header, prose styling and the
 * global footer (which carries the legal links on every page).
 */
export function LegalShell({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[color:var(--ink)]">
      <header className="border-b border-[color:var(--line)]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
          <Link href="/" className="group flex items-center gap-2.5" aria-label="Back to the Ovels homepage">
            <Logo className="h-7 w-7 transition-transform duration-500 group-hover:scale-105" />
            <span className="font-heading text-lg font-bold tracking-tight text-white">Ovels</span>
          </Link>
          <Link
            href="/"
            className="btn-ghost inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-[color:var(--mint)]"
          >
            <span aria-hidden="true">←</span> Back to the hub
          </Link>
        </div>
      </header>

      <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-5 pb-24 pt-14 sm:pt-20">
        <p className="label-mono flex items-center gap-3 text-[color:var(--teal-light)]">
          <span className="status-dot" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="font-heading mt-5 text-4xl font-bold leading-[1.06] tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {updated && (
          <p className="mt-4 text-sm text-[color:var(--muted-foreground)]">Last updated: {updated}</p>
        )}
        <div className="legal-prose mt-12">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
