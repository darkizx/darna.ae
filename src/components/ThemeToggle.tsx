import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darna-theme");
    const isDark = saved === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("darna-theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="تبديل المظهر"
      className="flex items-center gap-1 hover:opacity-80 transition-opacity"
    >
      {dark ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
      {dark ? "فاتح" : "داكن"}
    </button>
  );
}
