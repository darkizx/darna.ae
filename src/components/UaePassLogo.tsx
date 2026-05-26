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
      className={`group inline-flex items-center gap-2.5 rounded-full bg-white border border-black/15 shadow-sm transition-all px-4 h-11 hover:bg-[#00A777] hover:border-[#00A777] hover:shadow-[0_0_0_4px_rgba(0,167,119,0.18),0_8px_24px_rgba(0,167,119,0.35)] focus-visible:bg-[#00A777] focus-visible:border-[#00A777] focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_rgba(0,167,119,0.25)] disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
    >
      <img src={uaePassLogo} alt="UAE PASS" className="h-6 w-auto object-contain transition-all group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert" />
      <span className="text-[14px] font-semibold text-black tracking-tight transition-colors group-hover:text-white group-focus-visible:text-white">
        {loading ? "Signing in…" : "Sign in with UAE PASS"}
      </span>
    </button>
  );
}
