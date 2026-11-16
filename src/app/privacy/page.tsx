import type { Metadata } from "next";
import { LegalShell } from "@/components/site/LegalShell";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy Policy",
  description:
    "How ovels.in handles personal data under the GDPR: what is processed, on which legal basis, for how long, and the rights you have.",
};

const UPDATED = "17 November 2026";

export default function PrivacyPage() {
  return (
    <LegalShell eyebrow="Legal" title="Privacy Policy" updated={UPDATED}>
      <p>
        This policy explains what personal data <strong>ovels.in</strong> (the
        showcase hub for the Ovels ecosystem) processes when you visit it, on
        which legal basis, and the rights you have under the EU General Data
        Protection Regulation (GDPR). It applies to this website only. Our
        product sites <strong>bot.ovels.in</strong> and{" "}
        <strong>app.ovels.in</strong> are separate offerings with their own
        privacy notices. The GDPR rights below apply to visitors in the EU and
        the EEA, and every other section describes exactly what happens on
        this site for any visitor.
      </p>

      <h2>1. Who is responsible (the controller)</h2>
      <p>
        The controller within the meaning of Article 4(7) GDPR is:
      </p>
      <p className="legal-block">
        <strong>Ishan Jaiswal</strong> (sole developer and operator of ovels.in)
        <br />
        Varanasi, Uttar Pradesh, India
        <br />
        Email: <a href="mailto:me@ishan.vip">me@ishan.vip</a>
      </p>
      <p className="legal-note">
        The same details appear on the <a href="/imprint">Imprint</a> page.
      </p>

      <h2>2. What we process, and why</h2>
      <p>This website is deliberately light on data. We process:</p>
      <h3>2.1 Server log data (hosting)</h3>
      <p>
        When you open a page, our hosting provider automatically records
        technical request data: IP address, date and time, requested URL,
        referrer, user agent and response status. These logs are used only to
        deliver the site, ensure its security and stability, and investigate
        abuse. Legal basis: Art. 6(1)(f) GDPR (legitimate interest in the
        secure and economical operation of this website). You can prevent
        logging of your IP only by not visiting the site or by using
        anonymisation services, because the data itself is indispensable for the
        technical delivery you request.
      </p>
      <h3>2.2 Consent record (only if consent is ever required)</h3>
      <p>
        Right now this site runs no tools that require cookie consent, so no
        banner is shown and no consent record exists. Should we ever add an
        optional tool (for example privacy friendly analytics), you will see
        a consent banner before anything loads, and your choice will be
        stored locally in your browser (localStorage key{" "}
        <code>ovels-consent-v1</code>) so we do not have to ask again. That
        record contains only your category selections and a version number.
        No identifiers, no tracking. Storage basis in that case: strictly
        necessary storage under Art. 5(3) of the ePrivacy Directive, and
        Art. 6(1)(c)/(f) GDPR for documenting consent. You can delete it
        anytime via your browser
        settings or the “Cookie settings” footer link; the banner would
        simply ask again.
      </p>
      <h3>2.3 Emails you send us</h3>
      <p>
        This hub has no contact forms, no newsletter and no account
        registration. Nothing here is transmitted to us except the technical
        request data above. If you email us voluntarily, we process your
        message, your address and any data you include to answer you. Legal
        basis: Art. 6(1)(b)/(f) GDPR. Please do not send sensitive data you
        do not need to share.
      </p>

      <h2>3. Hosting and processors</h2>
      <p>
        The operator works from India, and the infrastructure needed to run
        this site may process or store data in other countries, so
        international transfers are part of the setup rather than an
        exception. The site itself is hosted on <strong>Vercel Inc.</strong>, 440 N Barranca
        Ave #4133, Covina, CA 91723, USA, acting as our processor under
        Art. 28 GDPR. Request data is processed in data centres that may be
        located outside the EU/EEA. For such transfers we rely on the EU
        Standard Contractual Clauses concluded with the provider and, where
        applicable, its certification under the Data Privacy Framework
        (please verify the provider’s current certification status at
        dataprivacyframework.gov before relying on it). Beyond hosting we use{" "}
        <strong>no</strong> external processors: no analytics, no advertising
        networks, no font CDNs, no embedded media from outside providers.
      </p>

      <h2>4. Cookies, local storage and outside assets</h2>
      <p>
        We set no cookies, and at the moment we use no analytics or marketing
        tools at all. There is nothing to consent to, which is why no cookie
        banner is displayed. Should that ever change, those tools stay{" "}
        <em>blocked by default</em> and load only after your explicit
        approval for each category in the banner (Art. 5(3) of the ePrivacy
        Directive), and you can change or withdraw your choice at any time. All
        fonts, icons and scripts are served from this website’s own origin.
        No connection to Google Fonts or any other outside server is
        made when you browse, so your IP address is not disclosed to font or
        CDN providers.
      </p>

      <h2>5. No profiling, no automated decisions</h2>
      <p>
        Nothing on this website is used to profile you or to make automated
        decisions within the meaning of Art. 22 GDPR.
      </p>

      <h2>6. How long we keep data</h2>
      <ul>
        <li>Server logs: kept for a short time per the hosting provider’s default retention cycle, and only for security and operation purposes.</li>
        <li>Consent record: until you clear it in your browser (or it becomes obsolete through a version change).</li>
        <li>Email correspondence: as long as the exchange requires, and beyond that only where statutory retention duties apply.</li>
      </ul>

      <h2>7. Your rights</h2>
      <p>
        Under the GDPR you have the right to access (Art. 15), rectification
        (Art. 16), erasure (Art. 17), restriction of processing (Art. 18),
        data portability (Art. 20) and objection (Art. 21). Where processing
        is based on consent, you may withdraw it at any time with effect for
        the future. For cookies, use the “Cookie settings” link in the
        footer. You also have the right to lodge a complaint with a
        supervisory authority, in particular in the EU member state of your
        habitual residence or the location of the controller. The European
        Data Protection Board maintains a list of all national supervisory
        authorities at{" "}
        <a href="https://www.edpb.europa.eu" target="_blank" rel="noopener noreferrer">
          edpb.europa.eu</a>. Wherever you live, you can also simply write to{" "}
        <a href="mailto:me@ishan.vip">me@ishan.vip</a> and we will handle
        access, correction or deletion by hand, since there is very little
        data to begin with.
      </p>

      <h2>8. Security</h2>
      <p>
        The site is served exclusively over TLS encryption. Because almost no
        data is collected, the amount of data at risk is minimal by design
        (data minimisation, Art. 5(1)(c) GDPR).
      </p>

      <h2>9. Changes to this policy</h2>
      <p>
        We may update this policy when the site or the law changes. The date
        at the top always reflects the current version; material changes will
        be announced on this page.
      </p>

      <h2>10. Which law applies</h2>
      <p>
        This policy is governed by and interpreted in accordance with the laws
        of India. Visitors in the EU and the EEA keep every GDPR right
        described above, and the governing law clause in the{" "}
        <a href="/terms">Terms of service</a> applies in full.
      </p>
    </LegalShell>
  );
}
