import type { Metadata } from "next";
import { LegalShell } from "@/components/site/LegalShell";

export const metadata: Metadata = {
  alternates: { canonical: "/terms" },
  title: "Terms of Service",
  description:
    "The terms under which ovels.in is provided: an informational showcase site with no accounts, no contracts and no purchases.",
};

const UPDATED = "17 November 2026";

export default function TermsPage() {
  return (
    <LegalShell eyebrow="Legal" title="Terms of Service" updated={UPDATED}>
      <p>
        These terms govern the use of <strong>ovels.in</strong>, the
        informational showcase website for the Ovels ecosystem. Please read
        them once, they are short because the site is deliberately
        simple: it shows you what we build and links to it. Nothing more.
      </p>

      <h2>1. What this website is</h2>
      <p>
        ovels.in presents information about our products and links to them.
        It has no accounts, no checkout, no payment flows and no
        content created by users. <strong>No contract is concluded, and no
        purchase takes place, on this website.</strong> Contracts for the
        products themselves (for example Discord server integrations or
        mobile app downloads) are concluded exclusively on the respective
        product sites or app stores, under their own terms.
      </p>

      <h2>2. Where consumer rights actually apply</h2>
      <p>
        Because nothing is sold on ovels.in, statutory consumer rights such
        as the 14 day right of withdrawal for distance contracts (Directive
        2011/83/EU as implemented in the EU member states) are not
        triggered here. If and when you acquire a paid offering through one
        of our product sites, the withdrawal terms, the pricing disclosures
        and the dispute mechanisms required by EU
        consumer law will be provided there, before checkout.
      </p>

      <h2>3. Intellectual property</h2>
      <p>
        All texts, graphics, the logo and the design of this site are the
        property of the operator named in the <a href="/imprint">Imprint</a>{" "}
        and may not be copied or reused commercially without permission. Short
        quotations with a link back are welcome.
      </p>

      <h2>4. Trademarks of others and links</h2>
      <p>
        “Discord” is a trademark of Discord Inc. Ovels is{" "}
        <strong>not affiliated with, endorsed by or sponsored by</strong>{" "}
        Discord Inc. Our site links to destinations outside this site (including our
        own product sites and, generically, Discord’s own onboarding pages).
        At the time of linking we checked those destinations for obvious legal
        violations; we have no duty to keep checking linked content over and
        over and are not liable for changes made after linking. If you find
        unlawful content behind a link, tell us at{" "}
        <a href="mailto:me@ishan.vip">me@ishan.vip</a> and we will remove
        it promptly.
      </p>

      <h2>5. Availability and warranty</h2>
      <p>
        This website is provided “as is”. We work hard to keep it accurate and
        online, but we do not warrant that it will be uninterrupted, free of
        errors, or that every statement stays current, because product
        features evolve. To
        the extent permitted by applicable law, our liability for damages
        arising from the use of this website is limited to cases of intent
        and gross negligence, and to injury to life, body or health.
      </p>

      <h2>6. Acceptable use</h2>
      <p>
        Do not attempt to disrupt, overload or reverse engineer the service,
        scrape it in ways that impair its operation, or use it for unlawful
        purposes. Automated access for search engine indexing is welcome.
      </p>

      <h2>7. Reports and contact</h2>
      <p>
        Illegal content, trademark concerns or misuse can be reported at any
        time to <a href="mailto:me@ishan.vip">me@ishan.vip</a> (see the{" "}
        <a href="/imprint">Imprint</a> for the legally required contact
        details). Because this site hosts no content created by users, the
        notice and action mechanisms of Regulation (EU) 2022/2065 (Digital
        Services Act) are not applicable to it; we handle reports as ordinary
        contact under the rules above.
      </p>

      <h2>8. Governing law and dispute resolution</h2>
      <p>
        These terms are governed by and construed in accordance with the laws
        of India, without regard to conflict of law principles. Any dispute,
        claim or controversy arising out of or relating to this website or
        these terms is subject to the exclusive jurisdiction of the competent
        courts at Varanasi, Uttar Pradesh, India. This clause does not remove
        mandatory consumer protection rights you hold under the law of your
        country of residence.
      </p>

      <h2>9. Changes to these terms</h2>
      <p>
        We may adapt these terms to legal or product changes. The version
        dated at the top of this page applies to your visit.
      </p>
    </LegalShell>
  );
}
