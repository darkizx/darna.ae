import { Link } from "@tanstack/react-router";
import { Building2 } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-strong">
      <div className="flag-bar" />
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <div className="text-lg font-black text-foreground">دارنا</div>
            <div className="text-[10px] text-muted-foreground tracking-[0.2em]">DARNA · UAE GOV</div>
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
      className="px-4 py-2 rounded-md text-foreground/75 hover:text-primary hover:bg-primary/5 transition-all font-medium"
      activeProps={{ className: "px-4 py-2 rounded-md text-primary bg-primary/10 font-bold" }}
    >
      {children}
    </Link>
  );
}
