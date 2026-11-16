"use client";

import { useCallback } from "react";
import { ArrowDown, Boxes, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";

export function Hero() {
  const onSpot = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  return (
    <section
      id="top"
      onMouseMove={onSpot}
      className="relative flex min-h-screen flex-col overflow-hidden"
      aria-label="Ovels introduction"
    >
      {/* layered background: aurora blobs + grid + mouse spotlight */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="aurora-blob aurora-a" />
        <div className="aurora-blob aurora-b" />
        <div className="aurora-blob aurora-c" />
        <div className="bg-grid absolute inset-0" />
        <div className="hero-spot absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[color:var(--ink)]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-5 pb-24 pt-36 text-center sm:pt-40">
        {/* announcement pill */}
        <div className="hero-enter glass mb-7 inline-flex items-center gap-3 rounded-full py-1.5 pl-2 pr-5" style={{ animationDelay: "0.05s" }}>
          <span className="label-mono inline-flex items-center gap-2 rounded-full bg-[rgba(61,189,138,0.14)] px-3 py-1.5 !text-[0.62rem] text-[color:var(--teal-light)]">
            <span className="status-dot" aria-hidden="true" />
            New
          </span>
          <span className="text-sm text-[color:var(--muted-foreground)]">
            Everything Ovels ships now lives here, and more is on the way
          </span>
        </div>

        {/* OVELS wordmark — purely presentational: the page h1 below and
            the nav logo already carry the name for assistive tech. */}
        <div className="hero-enter relative mb-7 flex items-center justify-center" style={{ animationDelay: "0.18s" }}>
          <div className="absolute -inset-x-24 -inset-y-14 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(61,189,138,0.22),transparent)] glow-breathe" aria-hidden="true" />
          <div className="orbit-ring-2 absolute -inset-x-14 -inset-y-9" aria-hidden="true">
            <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--sky)] shadow-[0_0_12px_rgba(95,168,211,0.9)]" />
          </div>
          <div className="orbit-ring absolute -inset-x-7 -inset-y-4" aria-hidden="true">
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--brand-bright)] shadow-[0_0_12px_rgba(45,212,191,0.9)]" />
          </div>
          <p aria-hidden="true" className="font-display hero-enter m-0 select-none text-[clamp(4.2rem,17vw,11rem)] font-extrabold leading-none text-white [text-shadow:0_0_60px_rgba(61,189,138,0.35)]">
            Ovels
          </p>
        </div>

        {/* headline */}
        <h1 className="font-heading hero-enter max-w-4xl text-balance text-[clamp(1.9rem,5.2vw,3.4rem)] font-bold leading-[1.08] text-white" style={{ animationDelay: "0.32s" }}>
          Software built by <span className="font-serif-accent text-gradient">one person</span>, one project at a time.
        </h1>

        <p className="hero-enter mt-7 max-w-2xl text-balance text-base leading-relaxed text-[color:var(--muted-foreground)] sm:text-lg" style={{ animationDelay: "0.44s" }}>
          Ovels is the name I build under. It started with a free Discord
          bot for moderation, tickets, music and giveaways, and an AI
          fitness coach app. What comes next could be a web app, a game
          or a simple tool, and it will live on this same page.
        </p>

        {/* CTAs */}
        <div className="hero-enter mt-9 flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: "0.56s" }}>
          <a href="#projects" className="btn-primary inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold">
            <Boxes className="h-4 w-4" aria-hidden="true" />
            Explore the projects
          </a>
          <a href="#about" className="btn-ghost link-arrow inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-[color:var(--mint)]">
            Who is Ovels
            <span className="arrow" aria-hidden="true">↓</span>
          </a>
        </div>

        {/* mini feature pills */}
        <Reveal delay={650} className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {["Free at the core", "Local first", "Built by a single developer", "More coming"].map((t) => (
            <span key={t} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-[color:var(--muted-foreground)]">
              <Sparkles className="h-3 w-3 text-[color:var(--teal-light)]" aria-hidden="true" />
              {t}
            </span>
          ))}
        </Reveal>

        {/* scroll hint — flows with the content so it can never cover the pills */}
        <Reveal delay={800} className="mt-8 hidden justify-center sm:flex">
          <a
            href="#about"
            aria-label="Scroll to about section"
            className="glass flex h-11 w-11 items-center justify-center rounded-full text-[color:var(--teal-light)] transition-transform duration-300 hover:translate-y-1"
          >
            <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
