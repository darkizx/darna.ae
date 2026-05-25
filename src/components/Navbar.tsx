import { Link } from "@tanstack/react-router";
import { Phone, Globe, Accessibility, Search, Fingerprint } from "lucide-react";

import logo from "@/assets/darna-logo.png";

export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-border shadow-sm">
      {/* Utility bar */}
      <div className="bg-[oklch(0.62_0.14_80)] text-white text-[11px]">
        <div className="max-w-7xl mx-auto px-6 h-8 flex items-center justify-between">
          <div className="flex items-center gap-4 opacity-90">
            <span className="hidden sm:inline">حكومة دولة الإمارات العربية المتحدة</span>
            <span className="hidden md:inline opacity-60">·</span>
            <span className="hidden md:inline">United Arab Emirates Government</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 hover:opacity-80"><Accessibility className="w-3 h-3" /> إمكانية الوصول</button>
            <button className="flex items-center gap-1 hover:opacity-80"><Globe className="w-3 h-3" /> EN</button>
            <span className="hidden sm:flex items-center gap-1"><Phone className="w-3 h-3" /> 800-DARNA</span>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="شعار دارنا" width={56} height={56} className="w-14 h-14 object-contain" />
          <div className="leading-tight border-r border-border pr-3">
            <div className="text-xl font-black navy-text">دارنا</div>
            <div className="text-[10px] text-muted-foreground tracking-[0.18em]">DARNA · SMART MUNICIPALITY</div>
          </div>
          <div className="hidden lg:block text-[11px] text-muted-foreground leading-tight max-w-[180px]">
            المنصة الرسمية للبلديات الذكية في دولة الإمارات العربية المتحدة
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-3 flex-1 max-w-md mx-4">
          <div className="flex items-center w-full border border-border rounded-md bg-muted/50 px-3 h-9">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input className="bg-transparent flex-1 px-2 text-sm outline-none" placeholder="ابحث في الخدمات البلدية..." />
          </div>
        </div>

        <Link
          to="/login"
          className="hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-md bg-[oklch(0.32_0.04_60)] hover:bg-[oklch(0.27_0.04_60)] text-white text-sm font-bold shadow-sm transition-colors"
        >
          <Fingerprint className="w-4 h-4" />
          <span>الدخول عبر UAE PASS</span>
        </Link>

      </div>

      {/* Nav strip */}
      <div className="border-t border-border bg-[oklch(0.98_0.003_90)]">
        <nav className="max-w-7xl mx-auto px-6 h-11 flex items-center gap-1 text-sm">
          <NavLink to="/">الرئيسية</NavLink>
          <NavLink to="/report">بلاغ جديد</NavLink>
          <NavLink to="/map">الخريطة التفاعلية</NavLink>
          <NavLink to="/assistant">المساعد الرسمي</NavLink>
          <NavLink to="/dashboard">لوحة التحكم</NavLink>
        </nav>
      </div>
      <div className="flag-bar" />
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="px-4 h-11 flex items-center text-foreground/75 hover:text-accent border-b-2 border-transparent hover:border-accent transition-colors font-medium"
      activeProps={{ className: "px-4 h-11 flex items-center text-accent border-b-2 border-accent font-bold" }}
    >
      {children}
    </Link>
  );
}
