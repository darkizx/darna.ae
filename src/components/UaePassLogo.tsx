import uaePassLogo from "@/assets/uae-pass-logo.png";

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
      className={`inline-flex items-center gap-2.5 rounded-full bg-white border border-black/15 shadow-sm hover:shadow-md hover:border-black/30 transition-all px-4 h-11 disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
    >
      <img src={uaePassLogo} alt="UAE PASS" className="h-6 w-auto object-contain" />
      <span className="text-[14px] font-semibold text-black tracking-tight">
        {loading ? "Signing in…" : "Sign in with UAE PASS"}
      </span>
    </button>
  );
}
