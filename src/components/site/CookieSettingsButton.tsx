"use client";

import { Settings2 } from "lucide-react";
import { useConsent, CONSENT_BANNER_REQUIRED } from "./consent";

/**
 * Persistent entry point so users can withdraw or change their
 * cookie consent at any time (GDPR Art. 7(3), ePrivacy Directive).
 * Lives in the global footer of every page — but only renders while
 * consent is actually required (see ACTIVE_CATEGORIES in consent.tsx):
 * a site with no optional storage needs no settings entry either.
 */
export function CookieSettingsButton() {
  const { openBanner } = useConsent();

  if (!CONSENT_BANNER_REQUIRED) return null;

  return (
    <button
      type="button"
      onClick={openBanner}
      className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[color:var(--foreground)]/80 transition-colors hover:text-[color:var(--teal-light)]"
    >
      <Settings2
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-90"
        aria-hidden="true"
      />
      Cookie settings
    </button>
  );
}
