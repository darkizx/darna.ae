// Official-style UAE PASS lockup (fingerprint + الهوية الرقمية UAE PASS)
// Colors match the UAE PASS brand: black mark with red/green flag accents.
export function UaePassLogo({ className = "h-8" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} dir="ltr">
      <svg viewBox="0 0 64 64" className="h-full w-auto" aria-hidden>
        {/* Fingerprint - simplified concentric arcs */}
        <g fill="none" stroke="#0a0a0a" strokeWidth="3.2" strokeLinecap="round">
          <path d="M16 36c0-9 7-16 16-16s16 7 16 16" />
          <path d="M22 40c0-6 4.5-10 10-10s10 4 10 10v4" />
          <path d="M28 44c0-3 2-5 4-5s4 2 4 5v6" />
          <path d="M32 32v18" />
          <path d="M20 48c1 3 2 5 3 7" />
          <path d="M44 48c-1 3-2 5-3 7" />
        </g>
        {/* Red dot (UAE flag accent) */}
        <circle cx="48" cy="22" r="3" fill="#ef3340" />
        {/* Green accent bar */}
        <rect x="14" y="52" width="10" height="2.5" rx="1" fill="#00843d" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[9px] font-semibold text-black/80" style={{ fontFamily: "'Tajawal', sans-serif" }}>
          الهوية الرقمية
        </span>
        <span className="text-[13px] font-black tracking-wider text-black">UAE PASS</span>
      </span>
    </span>
  );
}
