/**
 * ============================================================
 * OVELS PROJECT REGISTRY — the only file you touch to add a project
 * ------------------------------------------------------------
 * Drop ONE entry into RAW_PROJECTS below and the whole site picks
 * it up automatically: project card, showcase visual, footer
 * product list, numbering, links. No other file needs to change.
 *
 * Minimum viable entry (everything else is auto-filled):
 *
 *   { name: "Your Tool", domain: "yourtool.ovels.in" }
 *
 * Optional overrides:
 *   kind, status, tagline, description, features, stats,
 *   mock ("bot" | "app" | "generic"), cta, ctaHref (the big button's
 *   target, e.g. an invite link), id, index, href.
 *
 * `mock` picks the showcase visual: "bot" and "app" reuse the
 * hand-built mockups; "generic" renders a clean placeholder tile.
 * Need a bespoke visual? Add a component in ProjectMockups.tsx.
 * ============================================================
 */

export type ProjectFeature = {
  label: string;
  detail: string;
  accent: string; // hex — per-feature accent like on app.ovels.in
};

export type Project = {
  id: string;
  index: string; // display number, e.g. "01"
  name: string;
  kind: string; // mono label above the name
  domain: string;
  href: string;
  ctaHref: string; // where the big button goes (defaults to the site)
  status: string;
  tagline: string;
  description: string;
  features: ProjectFeature[];
  stats: { value: string; label: string }[];
  mock: "bot" | "app" | "generic";
  cta: string;
};

/** Anything except `name` is optional — missing fields get sensible defaults. */
export type ProjectInput = Partial<Omit<Project, "name">> & { name: string };

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "project"
  );
}

function finalizeProject(input: ProjectInput, position: number): Project {
  const domain = input.domain ?? `${slugify(input.name).replace(/-/g, "")}.ovels.in`;
  return {
    id: input.id ?? slugify(input.name),
    index: input.index ?? String(position + 1).padStart(2, "0"),
    name: input.name,
    kind: input.kind ?? "Ovels project",
    domain,
    href: input.href ?? `https://${domain}`,
    ctaHref: input.ctaHref ?? input.href ?? `https://${domain}`,
    status: input.status ?? "Live",
    tagline: input.tagline ?? "The next piece of the ecosystem.",
    description:
      input.description ??
      "Details are on their way. This card exists because one registry entry was all it took.",
    features: input.features ?? [],
    stats: input.stats ?? [],
    mock: input.mock ?? "generic",
    cta: input.cta ?? "Visit the site",
  };
}

const RAW_PROJECTS: ProjectInput[] = [
  {
    id: "bot",
    name: "Ovels Bot",
    kind: "Discord bot and web dashboard",
    domain: "bot.ovels.in",
    status: "Bot online",
    tagline: "The Discord bot that actually runs your server.",
    description:
      "A free Discord bot covering moderation, automod, tickets, giveaways, music, leveling and minigames. Set it up in minutes from a clean web dashboard. No config files and no command syntax to memorize, every module is a toggle.",
    features: [
      { label: "Moderation", detail: "Warnings, automod and a mod log that writes itself.", accent: "#3dbd8a" },
      { label: "Tickets", detail: "Structured support threads without the chaos.", accent: "#5eead4" },
      { label: "Music", detail: "Playback straight in voice, tuned to stay smooth.", accent: "#5fa8d3" },
      { label: "Minigames", detail: "Leveling and games that keep members around.", accent: "#d9954f" },
    ],
    stats: [
      { value: "7", label: "modules" },
      { value: "0", label: "config files" },
      { value: "24/7", label: "online" },
    ],
    mock: "bot",
    cta: "Add it to your server",
    // the real invite link from bot.ovels.in, so the button does what it says
    ctaHref:
      "https://discord.com/oauth2/authorize?client_id=1542119464277909604&scope=bot%20applications.commands&permissions=2146958847",
  },
  {
    id: "app",
    name: "Ovels App",
    kind: "AI training and nutrition coach",
    domain: "app.ovels.in",
    status: "Coming soon to stores",
    tagline: "One AI that reads every set and every meal.",
    description:
      "Scan a plate from a photo, get workout plans built around the equipment you actually own, and coach with an AI that already knows today's calories and last week's lifts. Local first: your data stays on your phone.",
    features: [
      { label: "Meal scanner", detail: "Photo, text or barcode, macros logged in seconds.", accent: "#d9954f" },
      { label: "Workout log", detail: "AI plans with progressive overload tracking.", accent: "#5fa8d3" },
      { label: "AI coach", detail: "Runs on your device when the hardware supports it.", accent: "#3dbd8a" },
      { label: "Local first", detail: "Analytics only if you opt in, plus a full backup you control.", accent: "#d4a857" },
    ],
    stats: [
      { value: "6", label: "systems" },
      { value: "100%", label: "local first" },
      { value: "1", label: "AI that reads both" },
    ],
    mock: "app",
    cta: "Get the app",
    // mirrors the app site's own CTA, which scrolls to its download section
    ctaHref: "https://app.ovels.in/#download",
  },
];

export const PROJECTS: Project[] = RAW_PROJECTS.map(finalizeProject);

/**
 * Reserved slots rendered in "More coming" — raise RESERVED_SLOTS
 * (or replace one with a real RAW_PROJECTS entry) as the ecosystem grows.
 */
export const RESERVED_SLOTS = [
  { index: "03", hint: "Something new is compiling" },
  { index: "04", hint: "Reserved for a future tool" },
];
