import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ConsentProvider } from "@/components/site/consent";
import { CookieBanner } from "@/components/site/CookieBanner";
import { AUTHOR, CONTACT_EMAIL, GITHUB_URL, HOME_DESCRIPTION, HOME_TITLE, LAST_MODIFIED, SITE_NAME, SITE_URL } from "@/lib/site";

/* ============================================================
   FONT SYSTEM — 100% project-local (GDPR / German court rulings)
   The exact families used by bot.ovels.in + app.ovels.in, stored as
   variable WOFF2 files in src/fonts/ (latin subset) and served from
   this origin. No runtime request to Google or any other CDN ever
   leaves the server: nothing transfers a visitor's IP to a font host.
   - Manrope: display voice of bot.ovels.in (wordmark, figures)
   - Space Grotesk: display voice of app.ovels.in (section headings)
   - Inter: shared body font
   - JetBrains Mono: shared mono labels
   - Fraunces italic: serif emphasis, bot.ovels.in headline accent
   ============================================================ */
const manrope = localFont({
  src: [{ path: "../fonts/manrope-variable-latin.woff2", weight: "200 800", style: "normal" }],
  variable: "--font-manrope",
  display: "swap",
});

const heading = localFont({
  src: [{ path: "../fonts/space-grotesk-variable-latin.woff2", weight: "300 700", style: "normal" }],
  variable: "--font-heading",
  display: "swap",
});

const body = localFont({
  src: [{ path: "../fonts/inter-variable-latin.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-body",
  display: "swap",
});

const mono = localFont({
  src: [{ path: "../fonts/jetbrains-mono-variable-latin.woff2", weight: "100 800", style: "normal" }],
  variable: "--font-mono-jb",
  display: "swap",
});

const serif = localFont({
  src: [{ path: "../fonts/fraunces-italic-variable-latin.woff2", weight: "100 900", style: "italic" }],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: HOME_TITLE, template: `%s | ${SITE_NAME}` },
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Ovels",
    "Ovels bot",
    "Ovels app",
    "free Discord bot",
    "Discord moderation bot",
    "Discord ticket bot",
    "Discord music bot",
    "Discord giveaway bot",
    "AI fitness coach",
    "AI meal scanner",
    "indie software studio",
    "Ishan Jaiswal",
  ],
  authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
  creator: AUTHOR.name,
  publisher: SITE_NAME,
  category: "technology",
  alternates: {
    canonical: "/",
    // Markdown representation of the same content, for LLM crawlers and agents
    types: { "text/markdown": "/index.md" },
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#04130e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/* Structured data: one connected @graph (Organization + WebSite + Person +
   the two products). Everything here is visible on the page — no invented
   ratings, reviews or prices. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-preview.png`, width: 512, height: 512 },
      description: HOME_DESCRIPTION,
      founder: { "@id": `${AUTHOR.url}/#person` },
      email: CONTACT_EMAIL,
      sameAs: [GITHUB_URL, AUTHOR.url, "https://bot.ovels.in", "https://app.ovels.in"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: HOME_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Person",
      "@id": `${AUTHOR.url}/#person`,
      name: AUTHOR.name,
      url: AUTHOR.url,
      jobTitle: "Software developer",
      worksFor: { "@id": `${SITE_URL}/#organization` },
      sameAs: [GITHUB_URL],
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: HOME_TITLE,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      dateModified: LAST_MODIFIED,
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#ovels-bot`,
      name: "Ovels Bot",
      url: "https://bot.ovels.in",
      applicationCategory: "CommunicationApplication",
      operatingSystem: "Discord",
      description:
        "A free Discord bot covering moderation, automod, tickets, giveaways, music, leveling and minigames, configured from a web dashboard.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: { "@id": `${AUTHOR.url}/#person` },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#ovels-app`,
      name: "Ovels App",
      url: "https://app.ovels.in",
      applicationCategory: "HealthApplication",
      description:
        "A local-first AI training and nutrition coach with a meal scanner, workout log and an on-device AI coach. Coming soon to app stores.",
      author: { "@id": `${AUTHOR.url}/#person` },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${heading.variable} ${body.variable} ${mono.variable} ${serif.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          // "<" escaped so no string value can ever close the script tag
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }}
        />
        <ConsentProvider>
          <a
            href="#main-content"
            className="skip-link"
          >
            Skip to main content
          </a>
          {children}
          <CookieBanner />
        </ConsentProvider>
      </body>
    </html>
  );
}
