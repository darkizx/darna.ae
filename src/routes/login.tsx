import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, Lock, ArrowLeft, Loader2 } from "lucide-react";
import { UaePassLogo } from "@/components/UaePassLogo";
import { useState } from "react";


export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "تسجيل الدخول · دارنا" },
      { name: "description", content: "تسجيل الدخول إلى منصة دارنا عبر الهوية الرقمية UAE PASS" },
    ],
  }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUaePass = () => {
    setLoading(true);
    // Simulated UAE PASS flow
    setTimeout(() => {
      try {
        localStorage.setItem(
          "darna_user",
          JSON.stringify({ name: "مواطن إماراتي", method: "UAE PASS", at: Date.now() })
        );
      } catch {}
      navigate({ to: "/dashboard" });
    }, 1400);
  };

  return (
    <div className="min-h-screen pt-40 pb-20 bg-gradient-to-b from-[oklch(0.98_0.01_85)] to-white" dir="rtl">
      <div className="max-w-md mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent mb-6">
          <ArrowLeft className="w-4 h-4" /> العودة للرئيسية
        </Link>

        <div className="gov-card rounded-sm p-8 shadow-lg">
          <div className="flex items-center gap-2 text-[11px] tracking-[0.2em] text-accent font-bold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" /> بوابة الدخول الرسمية
          </div>
          <h1 className="text-3xl font-black navy-text mb-2">تسجيل الدخول</h1>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            سجّل الدخول إلى منصة <span className="font-bold text-foreground">دارنا</span> باستخدام هويتك الرقمية المعتمدة من حكومة دولة الإمارات العربية المتحدة.
          </p>

          {/* Official UAE PASS button */}
          <button
            onClick={handleUaePass}
            disabled={loading}
            className="group w-full rounded-md border border-black/20 bg-white hover:border-black/50 hover:shadow-md transition-all h-14 px-5 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 text-black animate-spin" />
                <span className="text-sm font-bold text-black">جارٍ التحقق من الهوية...</span>
              </>
            ) : (
              <>
                <span className="text-sm font-bold text-black/85">Sign in with</span>
                <UaePassLogo className="h-9" />
              </>
            )}
          </button>


          <div className="flex items-center gap-3 my-6 text-[11px] text-muted-foreground">
            <div className="flex-1 h-px bg-border" />
            <span>أو</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <button className="w-full h-11 rounded-md border border-border bg-white hover:bg-muted text-sm font-medium flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" /> الدخول كموظف بلدية
          </button>

          <p className="text-[11px] text-muted-foreground text-center mt-6 leading-relaxed">
            بتسجيل الدخول، فإنك توافق على <a className="text-accent font-bold">شروط الاستخدام</a> و
            <a className="text-accent font-bold"> سياسة الخصوصية</a> الخاصة بحكومة الإمارات.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 text-[10px] text-muted-foreground tracking-wider">
          <span>· مؤمَّن بتشفير حكومي ·</span>
          <span>· UAE PASS Verified ·</span>
        </div>
      </div>
    </div>
  );
}
