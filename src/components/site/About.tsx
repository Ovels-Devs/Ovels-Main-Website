"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Gauge, HeartHandshake } from "lucide-react";
import { Reveal } from "./Reveal";

/** Count-up written from scratch: IntersectionObserver + requestAnimationFrame easing. */
function CountUp({ to, suffix = "", duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const t0 = performance.now();
            const tick = (t: number) => {
              const p = Math.min(1, (t - t0) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(Math.round(to * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    accent: "var(--brand)",
    title: "Free at the core",
    body: "The parts people rely on every day cost nothing. Paid extras can come later, but the essentials of every product stay free.",
  },
  {
    icon: Gauge,
    accent: "var(--sky)",
    title: "Fast, focused tools",
    body: "Every product does one job and does it well. No bloat, no setup marathons, no twenty step onboarding. The platform can change, the focus does not.",
  },
  {
    icon: HeartHandshake,
    accent: "var(--amber)",
    title: "Private by default",
    body: "Local first wherever that makes sense, and only the data a feature genuinely needs. Nothing extra, nothing sold.",
  },
];

const STATS: { to: number; suffix: string; label: string }[] = [
  { to: 2, suffix: "", label: "live products" },
  { to: 13, suffix: "+", label: "modules across them" },
  { to: 1, suffix: "", label: "builder behind it all" },
  { to: 0, suffix: "", label: "limits on project types" },
];

export function About() {
  return (
    <section id="about" className="relative mx-auto w-full max-w-6xl px-5 py-28 sm:py-36" aria-label="About Ovels">
      <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div>
          <Reveal>
            <p className="label-mono flex items-center gap-3 text-[color:var(--teal-light)]">
              <span className="status-dot" aria-hidden="true" />
              Who is Ovels
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="font-heading mt-5 text-balance text-4xl font-bold leading-[1.06] text-white sm:text-5xl">
              One developer with a habit of shipping <span className="font-serif-accent text-gradient">useful</span> software.
            </h2>
          </Reveal>
          <Reveal delay={170}>
            <p className="mt-7 max-w-xl leading-relaxed text-[color:var(--muted-foreground)]">
              Ovels is built and run by a single developer,{" "}
              <a
                href="https://ishan.vip"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[color:var(--teal-light)] underline underline-offset-2 transition-colors hover:text-[color:var(--mint)]"
              >
                Ishan Jaiswal
              </a>
              . It began with tools for an online community and it is not
              tied to any one product or platform. A Discord bot and an AI
              coach are live today. Tomorrow it could be a web app, a game
              or a developer tool. Every release has to pass the same test:
              would I still use it myself after the first week?
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-5 max-w-xl leading-relaxed text-[color:var(--muted-foreground)]">
              Everything released here shares the same look: calm dark
              surfaces, emerald light and no clutter. If a tool is not
              genuinely useful, it does not ship.
            </p>
          </Reveal>

          {/* animated stats */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 110} variant="scale" className="glass rounded-2xl p-5 text-center">
                <p className="font-display text-4xl font-bold text-[color:var(--brand)]">
                  <CountUp to={s.to} suffix={s.suffix} />
                </p>
                <p className="label-mono mt-2 !text-[0.6rem] text-[color:var(--muted-foreground)]">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* principles */}
        <div className="flex flex-col justify-center gap-5">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 130} variant={i % 2 ? "right" : "left"}>
              <div className="glass card-spotlight group rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[color:var(--line)]"
                    style={{ background: `color-mix(in srgb, ${p.accent} 12%, transparent)` }}
                  >
                    <p.icon className="h-5 w-5" style={{ color: p.accent }} aria-hidden="true" />
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-white">{p.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted-foreground)]">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
