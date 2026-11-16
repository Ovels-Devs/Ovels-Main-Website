"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useConsent, CONSENT_BANNER_REQUIRED } from "./consent";

/**
 * GDPR / ePrivacy consent banner.
 * - Blocks all non-essential storage & scripts by default (see consent.tsx).
 * - "Accept all" and "Reject all" are equally prominent.
 * - "Customize" exposes per-category toggles (Necessary is always on).
 * - Reachable again anytime via the "Cookie settings" footer link.
 */
export function CookieBanner() {
  const { consent, isOpen, acceptAll, rejectAll, saveChoices, closeBanner } = useConsent();
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // client-only rendering without setState-in-effect
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  // Esc closes only after an explicit decision (Esc never implies refusal)
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && consent.decided) closeBanner();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, consent.decided, closeBanner]);

  if (!mounted || !isOpen || !CONSENT_BANNER_REQUIRED) return null;

  const openCustomize = () => {
    // seed the toggles from the stored consent at the moment the user opens
    // the panel (event handler, not an effect — no cascading render)
    setAnalytics(consent.analytics);
    setMarketing(consent.marketing);
    setExpanded(true);
  };

  const save = () => saveChoices({ analytics, marketing });

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className="consent-in fixed inset-x-3 bottom-3 z-[60] sm:inset-x-auto sm:bottom-5 sm:left-1/2 sm:w-[min(560px,calc(100vw-2rem))] sm:-translate-x-1/2"
    >
      <div className="rounded-2xl border border-[color:var(--line)] bg-[rgba(6,20,14,0.94)] shadow-[0_24px_60px_rgba(2,10,7,0.7)] backdrop-blur-xl sm:p-6 p-5">
        <div className="flex items-start gap-3">
          <span className="glass flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[color:var(--teal-light)]">
            <Cookie className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p id="cookie-title" className="font-heading text-base font-semibold text-white">
              Your privacy choices
            </p>
            <p id="cookie-desc" className="mt-1.5 text-[13px] leading-relaxed text-[color:var(--muted-foreground)]">
              This site only stores a strictly necessary record of the choice you
              make here. Analytics and marketing tools stay blocked until you
              opt in.{" "}
              <Link
                href="/privacy"
                className="font-semibold text-[color:var(--teal-light)] underline underline-offset-2 hover:text-[color:var(--mint)]"
              >
                Privacy policy
              </Link>
            </p>
          </div>
        </div>

        {/* category toggles */}
        {expanded && (
          <div className="mt-4 space-y-2.5 rounded-xl border border-[color:var(--line)] bg-[rgba(255,255,255,0.02)] p-3.5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--brand)]" aria-hidden="true" />
                <span className="text-[13px] font-semibold text-white">Strictly necessary</span>
              </div>
              <span className="label-mono !text-[0.55rem] text-[color:var(--muted-foreground)]">
                Always on
              </span>
            </div>
            <CategoryToggle
              label="Analytics"
              detail="Anonymous usage measurement, e.g. page views."
              checked={analytics}
              onChange={setAnalytics}
            />
            <CategoryToggle
              label="Marketing"
              detail="Personalised content or campaign measurement."
              checked={marketing}
              onChange={setMarketing}
            />
          </div>
        )}

        {/* actions — Reject and Accept are equally prominent */}
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          {expanded && (
            <button
              type="button"
              onClick={save}
              className="btn-primary order-1 rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              Save choices
            </button>
          )}
          <button
            type="button"
            onClick={rejectAll}
            className={`btn-ghost rounded-full px-5 py-2.5 text-sm font-semibold text-white ${expanded ? "order-2" : "order-1"}`}
          >
            Reject all
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className={`btn-primary rounded-full px-5 py-2.5 text-sm font-semibold ${expanded ? "order-3" : "order-2"}`}
          >
            Accept all
          </button>
          {!expanded && (
            <button
              type="button"
              onClick={openCustomize}
              aria-expanded={expanded}
              className="order-3 ml-auto rounded-full px-3 py-2 text-[13px] font-semibold text-[color:var(--teal-light)] underline-offset-2 hover:underline"
            >
              Customize
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CategoryToggle({
  label,
  detail,
  checked,
  onChange,
}: {
  label: string;
  detail: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-white">{label}</p>
        <p className="mt-0.5 text-xs text-[color:var(--muted-foreground)]">{detail}</p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        aria-label={`Allow ${label} cookies`}
        className="data-[state=checked]:bg-[color:var(--brand)]"
      />
    </div>
  );
}
