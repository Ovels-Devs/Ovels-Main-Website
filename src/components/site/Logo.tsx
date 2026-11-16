/**
 * Official Ovels mark — the exact logo served by bot.ovels.in
 * (bot.ovels.in/dist/img/ovels-logo.svg), ported to an inline SVG so it
 * renders crisp at any size with zero extra network requests (GDPR-safe:
 * nothing is fetched from a third-party origin).
 *
 * The same artwork also ships as /favicon.ico, src/app/icon.svg and
 * the apple-touch icon (src/app/apple-icon.png).
 *
 * Gradient/filter ids are document-scoped; every instance on a page
 * carries identical defs, so browsers' first-in-document resolution
 * yields identical rendering.
 */
export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      className={className}
      aria-hidden="true"
      role="presentation"
      focusable="false"
    >
      <defs>
        <linearGradient id="ovels-logo-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B3D2E" />
          <stop offset="100%" stopColor="#123C2E" />
        </linearGradient>
        <linearGradient id="ovels-logo-ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#39E39A" />
          <stop offset="100%" stopColor="#1FA971" />
        </linearGradient>
        <linearGradient id="ovels-logo-o" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7CFFC4" />
          <stop offset="55%" stopColor="#2ECC90" />
          <stop offset="100%" stopColor="#0F8F5C" />
        </linearGradient>
        <filter id="ovels-logo-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#04140D" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* rounded tile + subtle ring border */}
      <rect x="16" y="16" width="480" height="480" rx="120" fill="url(#ovels-logo-bg)" />
      <rect
        x="16"
        y="16"
        width="480"
        height="480"
        rx="120"
        fill="none"
        stroke="url(#ovels-logo-ring)"
        strokeWidth="6"
        opacity="0.55"
      />

      {/* the "O" orbit + satellite dot */}
      <g filter="url(#ovels-logo-shadow)">
        <circle cx="256" cy="256" r="128" fill="none" stroke="url(#ovels-logo-o)" strokeWidth="34" />
        <circle cx="256" cy="150" r="17" fill="#B9FFDF" />
      </g>

      {/* compass needle inside the orbit */}
      <path d="M256 210 L286 240 L256 270 L226 240 Z" fill="#04140D" opacity="0.85" />

      {/* corner stars */}
      <g opacity="0.9">
        <circle cx="120" cy="392" r="5" fill="#39E39A" />
        <circle cx="392" cy="392" r="5" fill="#39E39A" />
        <circle cx="392" cy="120" r="5" fill="#39E39A" />
      </g>
    </svg>
  );
}
