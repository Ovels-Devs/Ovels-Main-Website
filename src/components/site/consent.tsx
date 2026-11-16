"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/**
 * ============================================================
 * OVELS CONSENT MANAGEMENT (ePrivacy Directive / GDPR Art. 7)
 * ------------------------------------------------------------
 * Non-essential storage and scripts are blocked by default. The
 * visitor's choice is stored in localStorage under
 * `ovels-consent-v1` — that record is strictly necessary storage
 * (it documents consent) and requires no consent itself.
 *
 * The store is an external system read with useSyncExternalStore:
 * every write dispatches a `ovels-consent` CustomEvent on window
 * with the full state, and cross-tab changes arrive via the
 * browser `storage` event. Any future script (analytics,
 * marketing) can simply listen:
 *
 *   window.addEventListener("ovels-consent", (e) => {
 *     if (e.detail.analytics) { /* init tracker *\/ }
 *   });
 *
 * Or gate content/scripts declaratively with <ConsentGate>:
 *
 *   <ConsentGate category="analytics">
 *     <Script src="https://plausible.io/js/script.js" />
 *   </ConsentGate>
 *
 * `useConsentEffect(category, callback)` runs the callback only
 * while the given category is granted, cleaning up on revoke.
 * ============================================================
 */

export type ConsentCategory = "analytics" | "marketing";

/**
 * Categories that genuinely need consent RIGHT NOW.
 * The site runs no optional tools, so this list is empty and no banner
 * is shown: the ePrivacy Directive (Art. 5(3)) only requires a
 * consent banner when non-essential storage or scripts exist.
 *
 * When you add an analytics or marketing tool, add its category here
 * (e.g. ["analytics"]) — the banner and the footer "Cookie settings"
 * entry appear automatically, and the tool stays blocked until opt-in.
 */
export const ACTIVE_CATEGORIES: ConsentCategory[] = [];

export const CONSENT_BANNER_REQUIRED = ACTIVE_CATEGORIES.length > 0;

export type ConsentState = {
  /** false until the visitor made an explicit accept/reject choice */
  decided: boolean;
  analytics: boolean;
  marketing: boolean;
  /** consent record version — bump when purposes change */
  version: number;
};

export const CONSENT_STORAGE_KEY = "ovels-consent-v1";
export const CONSENT_VERSION = 1;

const DEFAULT_STATE: ConsentState = {
  decided: false,
  analytics: false,
  marketing: false,
  version: CONSENT_VERSION,
};

function parseStored(raw: string): ConsentState {
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (parsed.version !== CONSENT_VERSION) return DEFAULT_STATE;
    return {
      decided: Boolean(parsed.decided),
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      version: CONSENT_VERSION,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

/* useSyncExternalStore requires a cached snapshot that only changes
   when the underlying storage changes — hence the fingerprint cache. */
let cachedSnapshot = DEFAULT_STATE;
let cachedFingerprint = "__server__";

function getSnapshot(): ConsentState {
  const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  const fingerprint = raw ?? "";
  if (fingerprint !== cachedFingerprint) {
    cachedFingerprint = fingerprint;
    cachedSnapshot = raw ? parseStored(raw) : DEFAULT_STATE;
  }
  return cachedSnapshot;
}

function getServerSnapshot(): ConsentState {
  return DEFAULT_STATE;
}

const subscribe = (onStoreChange: () => void) => {
  window.addEventListener("ovels-consent", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("ovels-consent", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
};

type ConsentContextValue = {
  consent: ConsentState;
  /** banner/settings panel visibility (auto-opens until decided, or via footer link) */
  isOpen: boolean;
  openBanner: () => void;
  closeBanner: () => void;
  acceptAll: () => void;
  rejectAll: () => void;
  saveChoices: (choices: { analytics: boolean; marketing: boolean }) => void;
  /** true when the given category is granted right now */
  has: (category: ConsentCategory) => boolean;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

function writeConsent(choices: {
  decided: boolean;
  analytics: boolean;
  marketing: boolean;
}): ConsentState {
  const next: ConsentState = { ...choices, version: CONSENT_VERSION };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable (e.g. private mode) — session-only consent
  }
  window.dispatchEvent(new CustomEvent("ovels-consent", { detail: next }));
  return next;
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  // consent lives in localStorage (external store) — no setState-in-effect
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [manualOpen, setManualOpen] = useState(false);

  const persist = useCallback(
    (choices: { analytics: boolean; marketing: boolean; decided?: boolean }) => {
      writeConsent({
        decided: choices.decided ?? true,
        analytics: choices.analytics,
        marketing: choices.marketing,
      });
      setManualOpen(false);
    },
    [],
  );

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      isOpen: manualOpen || (!consent.decided && CONSENT_BANNER_REQUIRED),
      openBanner: () => setManualOpen(true),
      closeBanner: () => setManualOpen(false),
      acceptAll: () => persist({ analytics: true, marketing: true }),
      rejectAll: () => persist({ analytics: false, marketing: false }),
      saveChoices: ({ analytics, marketing }) => persist({ analytics, marketing }),
      has: (category) => consent.decided && consent[category],
    }),
    [consent, manualOpen, persist],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used inside <ConsentProvider>");
  return ctx;
}

/** Runs `effect` only while `category` is consented; cleans up on revoke. */
export function useConsentEffect(
  category: ConsentCategory,
  effect: () => void | (() => void),
) {
  const { has } = useConsent();
  const granted = has(category);
  const effectRef = useRef(effect);

  // keep the latest callback available to the subscription effect
  // below without re-running it on every render
  useEffect(() => {
    effectRef.current = effect;
  }, [effect]);

  useEffect(() => {
    if (!granted) return undefined;
    const cleanup = effectRef.current();
    return () => {
      if (typeof cleanup === "function") cleanup();
    };
  }, [granted]);

  return granted;
}

/**
 * Blocks non-essential content/scripts until explicit opt-in for the
 * category. Use it to wrap e.g. analytics <Script> tags, embedded
 * videos, or marketing pixels — nothing inside renders before consent.
 */
export function ConsentGate({
  category,
  children,
  fallback = null,
}: {
  category: ConsentCategory;
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const granted = useConsentEffect(category, () => undefined);
  return <>{granted ? children : fallback}</>;
}
