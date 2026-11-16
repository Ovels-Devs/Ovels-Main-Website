import type { Metadata } from "next";
import { LegalShell } from "@/components/site/LegalShell";

export const metadata: Metadata = {
  alternates: { canonical: "/imprint" },
  title: "Imprint",
  description:
    "Who operates ovels.in: provider identification with the operator, location and contact details for the Ovels showcase site.",
};

const UPDATED = "17 November 2026";

export default function ImprintPage() {
  return (
    <LegalShell eyebrow="Legal" title="Imprint" updated={UPDATED}>
      <p>
        This is the provider identification page for <strong>ovels.in</strong>,
        the showcase site of the Ovels ecosystem. It states who operates the
        website and how to reach that person for anything formal.
      </p>

      <h2>Provider identification</h2>
      <p className="legal-block">
        <strong>Ishan Jaiswal</strong>
        <br />
        Sole developer and operator of ovels.in
        <br />
        Varanasi, Uttar Pradesh, India
        <br />
        Email: <a href="mailto:me@ishan.vip">me@ishan.vip</a>
      </p>

      <h2>Responsible for the content</h2>
      <p>
        Ishan Jaiswal, at the details above, is responsible for the content
        published on this website.
      </p>

      <h2>Jurisdiction</h2>
      <p>
        The law of India applies to this website and to any dispute connected
        with it. The competent courts at Varanasi, Uttar Pradesh, India have
        exclusive jurisdiction, and the full clause stands in the{" "}
        <a href="/terms">Terms of service</a>.
      </p>

      <h2>Liability for content and links</h2>
      <p>
        We are responsible for our own content on these pages under general
        applicable law. Links to destinations outside this site (including our
        product sites) lead to content for which the respective provider is
        responsible. At the time of linking, no obvious legal violations were
        identified, and we have no duty to keep checking linked content. Report
        problems to <a href="mailto:me@ishan.vip">me@ishan.vip</a> and we will
        remove the link promptly.
      </p>

      <h2>Note on affiliated services</h2>
      <p>
        <strong>bot.ovels.in</strong> and <strong>app.ovels.in</strong> are
        operated by the same person but are separate digital services with
        their own terms and privacy notices. Ovels is not affiliated with,
        endorsed by or sponsored by Discord Inc.
      </p>
    </LegalShell>
  );
}
