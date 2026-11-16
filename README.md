# ovels.in

The source of [ovels.in](https://ovels.in), the hub page for everything I ship under the Ovels name. It is a small static Next.js site: one landing page, three legal pages, no database, no forms, no analytics.

Products linked from the page:

- Ovels Bot, a Discord bot with a web dashboard: https://bot.ovels.in
- Ovels App, an AI training and nutrition coach: https://app.ovels.in

Other repos live under https://github.com/Ovels-Devs.

## Running it

You need Node 20+ or Bun.

```bash
bun install
bun run dev      # http://localhost:3000
bun run lint
bun run build    # production build, also type checks
```

`npm install` and `npm run dev` work too, but the lockfile in the repo is `bun.lock`.

## Where things live

```
src/
  app/
    layout.tsx          fonts, <head> metadata, JSON-LD, page shell
    page.tsx            the homepage, just the order of the sections
    globals.css         colours, glass cards, buttons, every animation
    sitemap.ts          /sitemap.xml
    manifest.ts         web app manifest
    opengraph-image.png link preview image (1200x630), alt text next to it
    icon.svg, apple-icon.png
    privacy/ terms/ imprint/   legal pages, one page.tsx each
  components/site/
    Nav.tsx             top bar and mobile menu
    Hero.tsx            first screen
    About.tsx           "Who is Ovels", principles and the stat counters
    Projects.tsx        one big card per project
    ProjectMockups.tsx  the little UI drawings inside the project cards
    MoreComing.tsx      roadmap section with the reserved slots
    Footer.tsx          footer, also shown on the legal pages
    LegalShell.tsx      layout wrapper for the legal pages
    Logo.tsx            inline SVG logo
    Reveal.tsx, pointer.ts   scroll reveal and card tilt/spotlight
    consent.tsx, CookieBanner.tsx, CookieSettingsButton.tsx   see "Cookies"
  data/projects.ts      the list of projects
  lib/site.ts           site url, title, description, email, GitHub url
  fonts/                self-hosted woff2 files
public/
  robots.txt  llms.txt  index.md  sitemap.md   see "Search and AI files"
  favicon.ico  logo-preview.png
```

## Changing things

| I want to... | Edit |
| --- | --- |
| Change the contact email, GitHub link, site URL, page title or description | `src/lib/site.ts` |
| Add or change a project | `src/data/projects.ts` |
| Change the number of empty "reserved" slots | `RESERVED_SLOTS` at the bottom of `src/data/projects.ts` |
| Change the hero headline or intro text | `src/components/site/Hero.tsx` |
| Change the about text, the three principles or the counters | `src/components/site/About.tsx` (`PRINCIPLES` and `STATS` at the top) |
| Change the heading above the project cards | `src/components/site/Projects.tsx` |
| Change the roadmap section text | `src/components/site/MoreComing.tsx` |
| Add, remove or rename a nav link | `LINKS` at the top of `src/components/site/Nav.tsx` |
| Change footer links or text | `src/components/site/Footer.tsx` |
| Change colours | the `:root` block in `src/app/globals.css` |
| Change fonts | `src/app/layout.tsx` for loading, `src/fonts/` for the files |
| Change the legal text | `src/app/privacy/page.tsx`, `terms/page.tsx`, `imprint/page.tsx` (bump the `UPDATED` date at the top of each) |
| Draw a different mockup in a project card | `src/components/site/ProjectMockups.tsx`, then set `mock` on the project |

### Adding a project

Open `src/data/projects.ts` and add an object to `RAW_PROJECTS`. A name and a domain are enough, everything else gets a default:

```ts
{
  name: "Your Tool",
  domain: "yourtool.ovels.in",
  tagline: "One line that sells it.",
}
```

The card, the footer product list and the numbering all come from that array. Optional fields are `kind`, `status`, `description`, `features`, `stats`, `cta`, `ctaHref` and `mock` (`"bot"`, `"app"` or `"generic"`). The type definition at the top of the file lists them all.

After adding one, also update the search and AI files below, because those are plain text and do not read the array.

## Search and AI files

The page itself carries most of the SEO: title, description, canonical URL, Open Graph tags and a JSON-LD block, all generated in `src/app/layout.tsx` from the constants in `src/lib/site.ts`. The JSON-LD lists the two products by hand, so add new ones there too.

A few files exist so crawlers and language models can read the site without parsing the animated page:

| File | What it is |
| --- | --- |
| `public/robots.txt` | Allows search and AI crawlers, points to the sitemap |
| `src/app/sitemap.ts` | Generates `/sitemap.xml` |
| `public/llms.txt` | Short summary and link list for language models |
| `public/index.md` | The homepage as plain Markdown |
| `public/sitemap.md` | Page list in Markdown |

`index.md` and `llms.txt` are written by hand. When the homepage copy or the project list changes, update them in the same commit, and bump `LAST_MODIFIED` in `src/lib/site.ts` (it feeds the sitemap and the JSON-LD). `next.config.ts` sets the right content types for these files and a canonical header on `/index.md`.

To replace the link preview image, drop a new 1200x630 PNG over `src/app/opengraph-image.png`. Twitter/X uses the same file.

## Contact email

The address lives in `src/lib/site.ts` and is used by the nav, footer and JSON-LD. It is also written out by hand in the three legal pages, `MoreComing.tsx`, `public/index.md` and `public/llms.txt`. If it ever changes, search the repo for the old address.

## Cookies

The site sets no cookies and loads no third-party scripts, so there is no banner. The consent code is there for the day an analytics tool gets added:

- `ACTIVE_CATEGORIES` in `src/components/site/consent.tsx` is empty. Put a category in it (for example `["analytics"]`) and the banner and the footer "Cookie settings" link appear.
- Wrap anything that needs consent in `<ConsentGate category="analytics">`, or use `useConsentEffect`. Nothing should load before the visitor opts in.
- The privacy policy says no tracking happens. Update it before adding any.

If you will never add tracking, you can delete the three consent files, the `ConsentProvider` and `CookieBanner` lines in `layout.tsx`, the `CookieSettingsButton` in the footer, `src/components/ui/switch.tsx`, and the `@radix-ui/react-switch` dependency.

## Fonts and third-party requests

All fonts are bundled in `src/fonts/` and loaded with `next/font/local`, and the Content-Security-Policy in `next.config.ts` only allows the site's own origin. That is deliberate, since requests to Google Fonts are a GDPR problem in some EU courts. If you add an external script, image host or embed, you have to allow it in that CSP or the browser will block it.

## Deploying

The site is hosted on Vercel.

1. Import the GitHub repo as a new project. Next.js is detected, the defaults are fine, and there are no environment variables.
2. Under Project > Domains, add `ovels.in` and point DNS at Vercel (A record `76.76.21.21`, or a CNAME to `cname.vercel-dns.com`).
3. After the first deploy, add the site to Google Search Console and Bing Webmaster Tools and submit `https://ovels.in/sitemap.xml`.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, lucide-react. Animations are hand-written CSS and small IntersectionObserver hooks, there is no animation library.
