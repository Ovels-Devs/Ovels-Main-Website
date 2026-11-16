"use client";

import { ArrowUpRight, ExternalLink } from "lucide-react";
import { PROJECTS, type Project } from "@/data/projects";
import { Reveal } from "./Reveal";
import { BotMock, AppMock, GenericMock } from "./ProjectMockups";
import { useSpotlight, useTilt } from "./pointer";

function Mock({ project }: { project: Project }) {
  if (project.mock === "bot") return <BotMock />;
  if (project.mock === "app") return <AppMock />;
  return <GenericMock label={project.name} />;
}

function ProjectRow({ project, flip }: { project: Project; flip: boolean }) {
  const spot = useSpotlight();
  const tilt = useTilt(4);

  return (
    <article
      id={project.id}
      className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${flip ? "" : ""}`}
    >
      {/* mockup side */}
      <Reveal variant={flip ? "right" : "left"} className={flip ? "lg:order-2" : ""}>
        <div
          className="tilt card-spotlight relative"
          onMouseMove={(e) => {
            spot(e);
            tilt.onMove(e);
          }}
          onMouseLeave={tilt.onLeave}
        >
          {/* glow behind device */}
          <div className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(61,189,138,0.14),transparent)]" />
          <Mock project={project} />
        </div>
      </Reveal>

      {/* content side */}
      <div className={flip ? "lg:order-1" : ""}>
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="font-serif-accent text-6xl font-semibold text-[color:var(--brand)] sm:text-7xl">
              {project.index}
            </span>
            <div>
              <p className="label-mono text-[color:var(--teal-light)]">{project.kind}</p>
              <h3 className="font-heading mt-2 text-3xl font-bold text-white sm:text-4xl">{project.name}</h3>
            </div>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <p className="font-serif-accent mt-6 text-xl text-[color:var(--mint)] sm:text-2xl">
            {project.tagline}
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-[color:var(--muted-foreground)]">
            {project.description}
          </p>
        </Reveal>

        {/* features with per-feature accents (app.ovels.in style) */}
        {project.features.length > 0 && (
          <Reveal delay={160}>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {project.features.map((f) => (
                <div key={f.label} className="glass card-spotlight rounded-xl p-4" onMouseMove={spot}>
                  <div className="flex items-center gap-2.5">
                    <span className="status-dot !h-2 !w-2" style={{ background: f.accent }} />
                    <p className="font-display text-[13px] tracking-[0.14em] text-white">{f.label}</p>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--muted-foreground)]">{f.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* stats strip */}
        {project.stats.length > 0 && (
          <Reveal delay={230}>
            <div className="mt-8 flex divide-x divide-[color:var(--line)] overflow-hidden rounded-2xl border border-[color:var(--line)]">
              {project.stats.map((s) => (
                <div key={s.label} className="flex-1 px-4 py-3.5 text-center">
                  <p className="font-display text-xl font-bold text-white">{s.value}</p>
                  <p className="label-mono mt-1 !text-[0.56rem] text-[color:var(--muted-foreground)]">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* CTAs — the button does the main action, the domain link opens the site */}
        <Reveal delay={300}>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href={project.ctaHref} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
              {project.cta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={`https://${project.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow inline-flex items-center gap-2 text-sm text-[color:var(--teal-light)] transition-colors hover:text-[color:var(--mint)]"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-mono text-[13px] tracking-wide underline-offset-4 hover:underline">{project.domain}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:py-24" aria-label="Ovels projects">
      {/* section header */}
      <div className="mb-20 text-center">
        <Reveal>
          <p className="label-mono inline-flex items-center gap-3 text-[color:var(--teal-light)]">
            <span className="status-dot" aria-hidden="true" />
            The ecosystem
          </p>
        </Reveal>
        <Reveal delay={90}>
          <h2 className="font-heading mx-auto mt-5 max-w-3xl text-balance text-4xl font-bold leading-[1.06] text-white sm:text-5xl">
            Live today, <span className="font-serif-accent text-gradient">built</span> to keep growing.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-5 max-w-xl text-balance text-[color:var(--muted-foreground)]">
            Every project runs on its own site with its own job, and none of
            them decides what Ovels can be next. Adding another means
            editing a single file, and a few slots are already reserved.
          </p>
        </Reveal>
      </div>

      <div className="space-y-28 sm:space-y-36">
        {PROJECTS.map((p, i) => (
          <ProjectRow key={p.id} project={p} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
