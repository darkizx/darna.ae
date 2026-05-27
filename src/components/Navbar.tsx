import { Link } from "@tanstack/react-router";
import { Phone, Globe, Accessibility, Search } from "lucide-react";
import { UaePassButton } from "@/components/UaePassLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import uaeEmblem from "@/assets/uae-emblem.png";

export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-border shadow-sm">
      {/* Utility bar */}
      <div className="bg-[oklch(0.62_0.14_80)] text-white text-[11px]">
        <div className="max-w-7xl mx-auto px-6 h-8 flex items-center justify-between">
          <div className="flex items-center gap-2 opacity-95">
            <span className="hidden sm:inline font-semibold">حكومة دولة الإمارات العربية المتحدة</span>
            <span className="hidden md:inline opacity-60">·</span>
            <span className="hidden md:inline">United Arab Emirates Government</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 hover:opacity-80"><Accessibility className="w-3 h-3" /> إمكانية الوصول</button>
            <ThemeToggle />
            <button className="flex items-center gap-1 hover:opacity-80"><Globe className="w-3 h-3" /> EN</button>
            <span className="hidden sm:flex items-center gap-1"><Phone className="w-3 h-3" /> 800-DARNA</span>
          </div>
        </div>
      </div>


      {/* Main bar */}
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={uaeEmblem} alt="شعار دولة الإمارات العربية المتحدة" className="h-14 w-auto object-contain" />
          <div className="leading-tight pr-3 mr-1">
            <div className="text-xl font-black navy-text">دارنا</div>
            <div className="text-[10px] text-muted-foreground tracking-[0.18em]">DARNA · SMART MUNICIPALITY</div>
          </div>
        </Link>


        <div className="hidden md:flex items-center gap-3 flex-1 max-w-md mx-4">
          <div className="flex items-center w-full border border-border rounded-md bg-muted/50 px-3 h-9">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input className="bg-transparent flex-1 px-2 text-sm outline-none" placeholder="ابحث في الخدمات البلدية..." />
          </div>
        </div>

        <Link to="/login" className="hidden sm:inline-flex">
          <UaePassButton />
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
