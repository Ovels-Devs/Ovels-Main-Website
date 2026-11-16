"use client";

import { GitBranch, Mail } from "lucide-react";
import { RESERVED_SLOTS } from "@/data/projects";
import { Reveal } from "./Reveal";

export function MoreComing() {
  return (
    <section id="more" className="relative mx-auto w-full max-w-6xl px-5 py-24 sm:py-32" aria-label="Roadmap">
      <div className="text-center">
        <Reveal>
          <p className="label-mono inline-flex items-center gap-3 text-[color:var(--teal-light)]">
            <span className="status-dot" aria-hidden="true" />
            Roadmap
          </p>
        </Reveal>
        <Reveal delay={90}>
          <h2 className="font-heading mt-5 text-balance text-4xl font-bold leading-[1.06] text-white sm:text-5xl">
            There is always a <span className="font-serif-accent text-gradient">next</span> project.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-5 max-w-xl text-balance text-[color:var(--muted-foreground)]">
            The empty slots below are reserved on purpose. When something
            new is ready, one small entry in the registry fills them in.
          </p>
        </Reveal>
      </div>

      {/* reserved slots */}
      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {RESERVED_SLOTS.map((s, i) => (
          <Reveal key={s.index} delay={i * 140} variant="scale">
            <div className="group relative overflow-hidden rounded-2xl border border-dashed border-[rgba(94,234,212,0.28)] bg-[rgba(255,255,255,0.015)] p-7 transition-colors duration-300 hover:border-[rgba(94,234,212,0.5)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_circle_at_50%_0%,rgba(61,189,138,0.07),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="flex items-center justify-between">
                <span className="font-serif-accent text-5xl font-semibold text-[rgba(183,247,218,0.35)]">{s.index}</span>
                <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] text-[color:var(--teal-light)]">
                  <span className="status-dot !h-1.5 !w-1.5" />
                  Reserved
                </span>
              </div>
              <p className="font-heading mt-6 text-lg font-semibold text-[color:var(--muted-foreground)]">
                {s.hint}
                <span className="caret ml-1 inline-block h-4 w-2 translate-y-0.5 rounded-[2px] bg-[color:var(--brand-bright)]" />
              </p>
              <div className="dash-march mt-7 h-px w-full" />
            </div>
          </Reveal>
        ))}
      </div>

      {/* how a project joins — code chip */}
      <Reveal delay={120} className="mx-auto mt-14 max-w-2xl">
        <div className="glass card-spotlight rounded-2xl p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <GitBranch className="h-4 w-4 text-[color:var(--brand)]" aria-hidden="true" />
            <p className="font-heading text-base font-semibold text-white">Have a project that fits?</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
            Adding a project means editing one file. Drop an entry into the
            registry at src/data/projects.ts and the cards, the footer and
            the reserved slots all update on their own. A name and a domain
            are all it needs:
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-[color:var(--line)] bg-[rgba(2,10,7,0.8)] p-4 font-mono text-[13px] leading-relaxed text-[color:var(--mint)]">
<code>{`// add one entry to RAW_PROJECTS:
{
  name: "Your Tool",
  domain: "yourtool.ovels.in",
  tagline: "One line that sells it.",
}`}</code><span className="caret ml-0.5 inline-block h-3.5 w-1.5 rounded-[2px] bg-[color:var(--brand-bright)] align-middle" />
          </pre>
          <a href="mailto:me@ishan.vip?subject=Proposal%20for%20the%20Ovels%20ecosystem" className="btn-ghost mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[color:var(--mint)]">
            <Mail className="h-4 w-4" aria-hidden="true" />
            Propose a project
          </a>
        </div>
      </Reveal>
    </section>
  );
}
