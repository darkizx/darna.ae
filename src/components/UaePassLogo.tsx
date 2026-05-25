// Official UAE PASS sign-in button — matches the standard lockup
// (pill, white, fingerprint with red/green flag accents, "Sign in with UAE PASS")
export function UaePassButton({
  onClick,
  loading,
  className = "",
}: {
  onClick?: () => void;
  loading?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      dir="ltr"
      aria-label="Sign in with UAE PASS"
      className={`inline-flex items-center gap-2 rounded-full bg-white border border-black/15 shadow-sm hover:shadow-md hover:border-black/30 transition-all px-4 h-10 disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
    >
      <UaePassMark className="w-5 h-5" />
      <span className="text-[14px] font-semibold text-black tracking-tight">
        {loading ? "Signing in…" : "Sign in with UAE PASS"}
      </span>
    </button>
  );
}

export function UaePassMark({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <g fill="none" stroke="#0a0a0a" strokeWidth="2.4" strokeLinecap="round">
        <path d="M10 26c0-7.7 6.3-14 14-14s14 6.3 14 14" />
        <path d="M15 30c0-5 4-9 9-9s9 4 9 9v3" />
        <path d="M20 34c0-2.5 1.8-4.3 4-4.3s4 1.8 4 4.3v5" />
        <path d="M24 25v17" />
        <path d="M13 36c.8 2.4 1.8 4.2 2.6 5.6" />
        <path d="M35 36c-.8 2.4-1.8 4.2-2.6 5.6" />
      </g>
      <circle cx="36" cy="14" r="2.2" fill="#ef3340" />
      <rect x="9" y="40" width="7" height="2" rx="1" fill="#00843d" />
    </svg>
  );
}
