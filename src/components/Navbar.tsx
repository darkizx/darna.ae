import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg gradient-neon-bg flex items-center justify-center animate-pulse-glow">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <div className="text-lg font-black neon-text leading-none">دارنا</div>
            <div className="text-[10px] text-muted-foreground tracking-widest">DARNA · UAE</div>
          </div>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <NavLink to="/">الرئيسية</NavLink>
          <NavLink to="/report">بلاغ جديد</NavLink>
          <NavLink to="/map">الخريطة</NavLink>
          <NavLink to="/assistant">المساعد</NavLink>
          <NavLink to="/dashboard">لوحة التحكم</NavLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="px-4 py-2 rounded-lg text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all"
      activeProps={{ className: "px-4 py-2 rounded-lg text-primary bg-primary/10 font-bold" }}
    >
      {children}
    </Link>
  );
}
